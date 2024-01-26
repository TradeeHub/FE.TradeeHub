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
import Step1LoginForm from '../ui/auth/login/Step1LoginForm/Step1LoginForm';
import Step2LoginForm from '../ui/auth/login/Step2LoginForm/Step2LoginForm';
import ValidationMessage from '../ui/auth/ValidationMessage/ValidationMessage';
import ProgressBar from '../ui/auth/ProgressBar/ProgressBar';
import { IoArrowBack } from 'react-icons/io5';

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

  const handleSignUp = () => {
    router.push(`/${locale}/register`);
  };

  const renderStep = (step: number) => {
    if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
        return <Step1LoginForm control={form.control} onEnterPress={onContinue} />;
      case 2:
        return <Step2LoginForm control={form.control} onEnterPress={handleLogin} />;
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
      authenticatedVar(true);
      dispatch(setUser(loginResponse?.user)); // Dispatch the setUser action
      router.replace(`/${locale}/dashboard`);
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

  if ( isClient && (!loginResponse?.isSuccess || !loginResponse?.isConfirmed) && !user) {
    return (
      <>
        <div className='flex min-h-screen items-center justify-center bg-background p-4 font-roboto'>
          <div className='w-full max-w-md space-y-4'>
            <Card className='w-full max-w-md space-y-4 bg-white p-6 shadow-md'>
              <div className='flex items-center justify-between'>
                {/* Render back arrow if currentStep > 1, otherwise render a placeholder to keep the title centered */}
                {currentStep > 1 ? (
                  <Button
                    onClick={goBack}
                    variant='ghost'
                    className='text-primary focus:outline-none dark:text-accent'
                    aria-label='Go back'
                  >
                    <IoArrowBack size={24} />
                  </Button>
                ) : (
                  // This empty div acts as a placeholder with the same size as the IoArrowBack icon
                  <div className='h-8 w-8'></div>
                )}
                {/* Title */}
                <div className='text-3xl font-bold'>
                  <span className='text-primary dark:text-accent'>Tradee</span>
                  <span className='text-secondary'>Hub</span>
                </div>

                {/* Invisible placeholder to ensure the title remains centered */}
                <div className='h-8 w-8'></div>
              </div>
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

                  <div className='text-center'>
                    <span>Don't have an account? </span>
                    <Button variant='link' size='sm' onClick={handleSignUp}>
                      Sign Up Here
                    </Button>
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
