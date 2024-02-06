'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import ValidationMessage from '../ValidationMessage/ValidationMessage';
import { Form, FormLabel } from '@/components/ui/form';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step1ResetPasswordForm from './ResetFormSteps/Step1ResetPasswordForm';
import { Card } from '@/components/ui/card';
import {
  useChangePassword,
  useForgotPassword,
} from '@/app/[locale]/hooks/auth/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Step2ResetPasswordForm from './ResetFormSteps/Step2ResetPasswordForm';
import VerificationCodeInput from '../../general/AddressAutocomplete/VerificationCode';
import AuthTitle from '../AuthTitle/AuthTitle';
import { ChangedForgottenPasswordRequestInput } from '@/generatedGraphql';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FaCheck } from 'react-icons/fa6';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[0-9]/, { message: 'Password must contain at least 1 number.' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least 1 special character.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least 1 uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least 1 lowercase letter.',
    }),
  resetConfirmationCode: z
    .string()
    .min(6, { message: 'Reset code must best 6 digits.' }),
});

const ResetPassword = () => {
  const {
    changePassword,
    changePasswordResponse,
    changePasswordLoading,
    changePasswordError,
  } = useChangePassword();
  const {
    requestChangePasswordResetCode,
    requestChangePasswordResponse,
    requestChangePasswordLoading,
    requestChangePasswordError,
  } = useForgotPassword();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 2;
  const user = useSelector((state: RootState) => state.user.data);
  const locale = useLocale();
  const [hasChangedPassword, setHasChangedPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      newPassword: '',
      resetConfirmationCode: '',
    },
  });

  const onContinue = async () => {
    if (currentStep < TOTAL_STEPS) {
      if (currentStep === 1) {
        const step1IsValid = await form.trigger(['email']);
        if (step1IsValid) {
          requestChangePasswordResetCode(form.getValues('email'));
        }
      }
    }
  };

  const renderStep = (step: number) => {
    // if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
        return (
          <Step1ResetPasswordForm
            control={form.control}
            onEnterPress={onContinue}
          />
        );
      case 2:
        return (
          <>
            <Step2ResetPasswordForm control={form.control} />
            <div className='mt-4'>
              <FormLabel
                htmlFor='passwordResetCode'
                className='ml-3 block text-xs font-medium leading-tight text-primary'
              >
                Password Reset Code
              </FormLabel>
              <VerificationCodeInput
                length={6}
                onComplete={setResetPasswordCode}
              />
            </div>
          </>
        );
    }
  };

  const handleResetPassword: SubmitHandler<
    ChangedForgottenPasswordRequestInput
  > = async ({ email, newPassword, resetConfirmationCode }) => {
    await changePassword({
      email,
      newPassword,
      resetConfirmationCode,
    });
  };

  const setResetPasswordCode = (code: string) => {
    form.setValue('resetConfirmationCode', code);
  };

  useEffect(() => {
    if (
      requestChangePasswordResponse &&
      !requestChangePasswordLoading &&
      !requestChangePasswordError &&
      requestChangePasswordResponse.forgotPassword.httpStatusCode === 'OK'
    ) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [requestChangePasswordResponse]);

  useEffect(() => {
    if (
      changePasswordResponse &&
      !changePasswordLoading &&
      !changePasswordError &&
      changePasswordResponse.changePassword.httpStatusCode === 'OK'
    ) {
      setHasChangedPassword(true);
    }
  }, [changePasswordResponse]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient && !user) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 font-roboto'>
        <div className='w-full max-w-md space-y-4'>
          <Card className='space-y-4 rounded-lg bg-white p-6 shadow-lg'>
            <AuthTitle currentStep={currentStep} name='Reset Password' />
            {hasChangedPassword ? (
              <Alert>
                <FaCheck className='h-4 w-4 text-secondary' />
                <AlertTitle>
                  Your password has been successfully changed.
                </AlertTitle>
                <AlertDescription>
                  Please go back to login and use new password.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <ProgressBar
                  totalSteps={TOTAL_STEPS}
                  currentStep={currentStep}
                />
                <Form {...form}>
                  <form className='space-y-6'>
                    {renderStep(currentStep)}
                    {requestChangePasswordError && (
                      <ValidationMessage
                        validationMessage={requestChangePasswordError}
                      />
                    )}
                    {changePasswordError && (
                      <ValidationMessage
                        validationMessage={changePasswordError}
                      />
                    )}

                    <div className='flex flex-col items-center'>
                      {currentStep < TOTAL_STEPS ? (
                        <Button
                          type='button'
                          variant='default'
                          className='w-full'
                          onClick={onContinue}
                        >
                          Send Password Reset Code
                        </Button>
                      ) : (
                        <Button
                          type='button'
                          variant='default'
                          className='w-full'
                          onClick={form.handleSubmit(handleResetPassword)}
                        >
                          Set New Password
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>{' '}
              </>
            )}
            <div
              className='text-right underline hover:text-accent'
              style={{ marginTop: 8 }}
            >
              <Link href={'login'} passHref locale={locale}>
                Go back to login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ResetPassword;
