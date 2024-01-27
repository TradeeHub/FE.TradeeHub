'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaApple, FaWindows } from 'react-icons/fa';
import { useLogin } from '../hooks/customer/auth/useAuth';
import { useLocale } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';
import { RootState } from '@/lib/store';
import authenticatedVar from '../constants/authenticated';
import VerificationCode from '../ui/auth/VerificationCode/VerificationCode';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import Step1LoginForm from '../ui/auth/login/LoginFormSteps/Step1LoginForm';
import Step2LoginForm from '../ui/auth/login/LoginFormSteps/Step2LoginForm';
import ValidationMessage from '../ui/auth/ValidationMessage/ValidationMessage';
import ProgressBar from '../ui/auth/ProgressBar/ProgressBar';
import AuthTitle from '../ui/auth/AuthTitle/AuthTitle';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
  password: z.string().min(1, { message: 'Password must be provided' }),
});

const Login = () => {
  const { login, loginResponse, loginError } = useLogin();
  const [requiresVerification, setRequiresVerification] =
    useState<boolean>(false); // 1 for email, 2 for password

  const router = useRouter();
  const locale = useLocale();
  const TOTAL_STEPS = 2;
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1); // 1 for email, 2 for password
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = () => {
    const emailValue = form.getValues('email');
    const password = form.getValues('password');
    login(emailValue, password);
  };


  const renderStep = (step: number) => {
    if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
        return (
          <Step1LoginForm control={form.control} onEnterPress={onContinue} />
        );
      case 2:
        return (
          <Step2LoginForm control={form.control} onEnterPress={handleLogin} />
        );
      case 3:
        return (
          <VerificationCode
            email={form.getValues('email')}
            password={form.getValues('password')}
          />
        );
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onContinue = async () => {
    if (currentStep < TOTAL_STEPS) {
      if (currentStep === 1) {
        const step1IsValid = await form.trigger(['email']);
        if (step1IsValid) setCurrentStep((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (
      loginResponse &&
      loginResponse?.isConfirmed &&
      loginResponse?.isSuccess &&
      loginResponse?.user
    ) {
      dispatch(setUser(loginResponse?.user)); // Dispatch the setUser action
      router.replace(`/${locale}/dashboard`);
      authenticatedVar(true);
    }

    if (
      loginResponse &&
      !loginResponse?.isConfirmed &&
      loginResponse?.isSuccess &&
      !loginResponse?.user
    ) {
      setRequiresVerification(true);
    }
  }, [loginResponse]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (
    isClient &&
    (!loginResponse?.isSuccess || !loginResponse?.isConfirmed) &&
    !user
  ) {
    return (
      <>
        <div className='flex min-h-screen items-center justify-center bg-background p-4 font-roboto'>
          <div className='w-full max-w-md space-y-4'>
            <Card className='w-full max-w-md space-y-4 bg-white p-6 shadow-md'>
              <AuthTitle
                goBack={goBack}
                currentStep={currentStep}
                name='Login'
              />
              {!requiresVerification ? (
                <>
                  <ProgressBar
                    totalSteps={TOTAL_STEPS}
                    currentStep={currentStep}
                  />

                  <Form {...form}>
                    <form className='space-y-5'>
                      {renderStep(currentStep)}
                      <ValidationMessage validationMessage={loginError} />

                      {currentStep < TOTAL_STEPS ? (
                        <Button
                          type='button'
                          variant='default'
                          className='mt-4 w-full'
                          onClick={onContinue}
                        >
                          Continue
                        </Button>
                      ) : (
                        <>
                          <Button
                            type='button'
                            onClick={form.handleSubmit(handleLogin)}
                            className='mt-4 w-full'
                          >
                            Login
                          </Button>
                        </>
                      )}
                    </form>
                  </Form>
                  <div
                    className='text-right underline hover:text-accent'
                    style={{ marginTop: 8 }}
                  >
                    <Link href={'reset-password'} passHref locale={locale}>
                      Forgot your password?
                    </Link>
                  </div>
                  <div className='text-center'>
                    <span>Don't have an account? </span>
                    <Link
                      href={'register'}
                      passHref
                      locale={locale}
                      className='ml-4 text-xs underline hover:text-accent'
                    >
                      Sign Up Here
                    </Link>
                    {/* <Button variant='link' size='sm' onClick={handleSignUp}>
                      Sign Up Here
                    </Button> */}
                  </div>
                </>
              ) : (
                <VerificationCode
                  email={form.getValues('email')}
                  password={form.getValues('password')}
                />
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
