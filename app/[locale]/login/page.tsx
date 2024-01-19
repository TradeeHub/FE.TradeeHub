'use client';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {
  FaKey,
  FaGoogle,
  FaApple,
  FaWindows,
  FaLock,
  FaEnvelope,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  useLogin,
  useConfirmAccount,
  useResendVerificationCode,
} from '../hooks/customer/auth/useAuth';
import { ConfirmAccountMutation, UserDbObject } from '@/generatedGraphql';
import { useLocale } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';
import { RootState } from '@/lib/store';
import authenticatedVar from '../constants/authenticated';

const isEmailValid = (email: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

const ValidationMessage = ({
  validationMessage,
}: {
  validationMessage: string;
}) => {
  return (
    <>
      <span className='text-center'>
        <p
          className='text-sm text-secondary'
          style={{ marginTop: '2px', marginBottom: '0px' }}
        >
          {validationMessage}
        </p>
      </span>
    </>
  );
};

const Login = () => {
  const { login, data: loginData } = useLogin();
  const { confirmAccount, data: confirmData } = useConfirmAccount();
  const { resendConfirmationCode, data: resendConfirmationData } =
    useResendVerificationCode();
  const router = useRouter();
  const locale = useLocale();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 1 for email, 2 for password
  const [loginError, setLoginError] = useState<boolean>(false);
  const [newConfirmationCodeSent, setNewConfirmationCodeSent] =
    useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState('');
  const confirmationCodeRef = useRef(null);
  const userIsConfirmedRef = useRef(false);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const handleEmailSubmit = () => {
    const emailValue = emailRef.current.value as string;
    if (isEmailValid(emailValue)) {
      setLoginError(false);
      setEmail(emailValue);
      setStep(2);
    } else {
      setLoginError(true);
      setValidationMessage(
        'The email address you entered is not in a valid format.',
      );
    }
  };

  const handlePasswordSubmit = () => {
    const passwordValue = passwordRef.current.value as string;

    if (passwordValue.length > 0) {
      setLoginError(false);
      setPassword(passwordValue);
      login(email, passwordValue);
    } else {
      setLoginError(true);
      setValidationMessage('Password must be provided cannot be empty.');
    }
  };

  const handleAccountVerification = () => {
    const confirmationCode = confirmationCodeRef.current.value as string;

    if (confirmationCode.length > 0) {
      setNewConfirmationCodeSent(false);
      setLoginError(false);
      confirmAccount(confirmationCode, email);
    } else {
      setLoginError(true);
      setValidationMessage(
        'Confirmation code must be provided cannot be empty.',
      );
    }
  };

  const handleRequestNewCode = () => {
    resendConfirmationCode(email);
  };

  useEffect(() => {
    if (confirmData) {
      const confirmResult = confirmData as ConfirmAccountMutation;
      if (confirmResult.confirmAccount.isConfirmationSuccess) {
        login(email, password);
      } else {
        setLoginError(true);
        setValidationMessage(confirmResult.confirmAccount.message as string);
      }
    }
  }, [confirmData]);

  useEffect(() => {
    if (loginData) {
      const accountConfirmed = loginData?.login.isConfirmed;
      const loginSuccess = loginData?.login.isSuccess;
      userIsConfirmedRef.current = accountConfirmed;
      console.log('my logged in data', loginData);
      if (!accountConfirmed && loginSuccess) {
        setLoginError(false);
        setStep(3);
      } else if (!accountConfirmed && !loginSuccess) {
        setLoginError(true);
        setValidationMessage(
          'Incorrect username or password. Please try again.',
        );
      } else {
        const user = loginData?.login?.user as UserDbObject;
        authenticatedVar(true);
        dispatch(setUser(user)); // Dispatch the setUser action
        router.push(`/${locale}/dashboard`);
      }
    }
  }, [loginData]);

  useEffect(() => {
    if (!loginData && user) {
      console.log(
        'user changed in loged but didnt login go to dashboard',
        user,
      );
      router.push(`/${locale}/dashboard`);
    }
  }, [user]);

  useEffect(() => {
    if (
      resendConfirmationData &&
      resendConfirmationData.resendVerificationCode.httpStatusCode.toLowerCase() ==
        'ok'
    ) {
      setNewConfirmationCodeSent(true);
    }
  }, [resendConfirmationData]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!loginData?.login.isSuccess && !user) {
    return (
      <>
        <div className='flex min-h-screen items-center justify-center bg-background p-4 font-roboto'>
          <div className='w-full max-w-md space-y-4'>
            <Card className='w-full max-w-md space-y-4 bg-white p-6 shadow-md'>
              <div className='pl-2 text-center text-3xl font-bold'>
                <span className='text-primary dark:text-accent'>Tradee</span>
                <span className='text-secondary'>Hub</span>
              </div>
              {isClient && step === 1 && (
                <>
                  <div className='relative flex-grow text-primary'>
                    <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 transform text-border' />
                    <Input
                      placeholder='Email Address'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEmailSubmit();
                        }
                      }}
                      autoFocus
                      ref={emailRef}
                      className={`w-full py-2 pl-10 pr-3 ${
                        loginError ? 'border-secondary' : 'border'
                      }`}
                    />
                  </div>
                  {loginError && (
                    <ValidationMessage validationMessage={validationMessage} />
                  )}
                  <Button
                    variant='default'
                    className='mt-4 w-full'
                    onClick={handleEmailSubmit}
                  >
                    Continue
                  </Button>
                </>
              )}

              {isClient && step === 2 && (
                <>
                  <div className='relative flex-grow text-primary'>
                    <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 transform text-border' />
                    <Input
                      type='password'
                      placeholder='Password'
                      ref={passwordRef}
                      className='w-full pl-10'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handlePasswordSubmit();
                        }
                      }}
                      autoFocus
                    />
                  </div>
                  {loginError && (
                    <ValidationMessage validationMessage={validationMessage} />
                  )}
                  <Button
                    variant='default'
                    className='mt-4 w-full'
                    onClick={handlePasswordSubmit}
                  >
                    Continue
                  </Button>
                </>
              )}

              {isClient && step === 3 && (
                <>
                  <div className='relative flex-grow text-primary'>
                    <FaKey className='absolute left-3 top-1/2 -translate-y-1/2 transform text-border' />
                    <Input
                      type='text'
                      placeholder='Verification Code'
                      ref={confirmationCodeRef}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAccountVerification();
                        }
                      }}
                      autoFocus
                      className='w-full pl-10'
                      // You might want to add some validation for the confirmation code here
                    />
                  </div>
                  {loginError && (
                    <ValidationMessage validationMessage={validationMessage} />
                  )}
                  <Button
                    variant='default'
                    className='mt-4 w-full'
                    onClick={handleAccountVerification}
                  >
                    Continue
                  </Button>
                  <div className='mt-4 text-center'>
                    <span className=''>{"Didn't receive a code?"}</span>
                    <Button
                      variant='link'
                      size='sm'
                      onClick={() => handleRequestNewCode()}
                    >
                      Send a new code
                    </Button>
                    {isClient && newConfirmationCodeSent && (
                      <div className='mt-2 text-center'>
                        <p className='text-sm font-semibold text-green-600'>
                          <FaCheckCircle className='mr-2 inline text-lg' />A new
                          verification code has been sent to your email.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {isClient && step !== 3 && (
                <div className='text-center'>
                  <span>Don't have an account? </span>
                  <Button
                    variant='link'
                    size='sm'
                    onClick={() => alert('Go to sign up page')}
                  >
                    Sign up
                  </Button>
                </div>
              )}
              <div className='flex items-center justify-between pt-4'>
                <hr className='w-full' />
                <p className='px-3'>OR</p>
                <hr className='w-full' />
              </div>
              <div className='flex flex-col space-y-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full items-center justify-center'
                >
                  <FaGoogle className='mr-2' /> Continue with Google
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full items-center justify-center'
                >
                  <FaWindows className='mr-2' /> Continue with Microsoft
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full items-center justify-center'
                >
                  <FaApple className='mr-2' /> Continue with Apple
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Login;
