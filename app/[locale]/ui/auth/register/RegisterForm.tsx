'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Step1RegisterForm from './RegisterFormSteps/Step1RegisterForm';
import Step2RegisterForm from './RegisterFormSteps/Step2RegisterForm';
import Step3RegisterForm from './RegisterFormSteps/Step3RegisterForm';
import Step4RegisterForm from './RegisterFormSteps/Step4RegisterForm';
import { Card } from '@/components/ui/card';
import { RegisterRequest, UserPlace } from '../../../types/sharedTypes';
import { useRegister } from '../../../hooks/customer/auth/useAuth';
import { RegisterRequestInput } from '@/generatedGraphql';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaCheck } from 'react-icons/fa6';
import VerificationCode from '../VerificationCode/VerificationCode';
import ValidationMessage from '../ValidationMessage/ValidationMessage';
import { useLocale } from 'next-intl';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import AuthTitle from '../AuthTitle/AuthTitle';
import Link from 'next/link';

const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Define the Zod schema for Viewport
const ViewportSchema = z.object({
  northeast: LocationSchema,
  southwest: LocationSchema,
});

const UserPlaceSchema = z
  .object({
    PlaceId: z.string(),
    Address: z.string(),
    Location: LocationSchema,
    Viewport: ViewportSchema,
  })
  .nullable()
  .nullable()
  .refine((data) => data !== null, {
    message: 'Please enter your address.',
    // You can add custom logic to check the properties of UserPlace if needed
  });

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z
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
    confirmPassword: z.string(),
    name: z.string().min(2, { message: 'Please enter your name.' }),
    phoneNumber: z
      .string()
      .min(9, { message: 'Invalid phone number.' })
      .regex(/^\+\d{9,14}$/, {
        message: 'Phone number must include country code.',
      }),
    userPlace: UserPlaceSchema,
    companyName: z
      .string()
      .min(2, { message: 'Please enter your company name.' }),
    companyType: z.string().min(1, { message: 'Company Type is required.' }),
    companySize: z.string().min(1, { message: 'Company Size is required.' }),
    referralSource: z.string(),
    companyPriority: z
      .string()
      .min(1, { message: 'Please select an option above.' }),
    marketingPreference: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'], // This shows where the error occurred
  });

const transformRegisterRequest = (
  request: RegisterRequest,
): RegisterRequestInput => {
  return {
    email: request.email,
    password: request.password,
    name: request.name,
    phoneNumber: request.phoneNumber,
    place: {
      address: request.userPlace?.Address ?? '',
      placeId: request.userPlace?.PlaceId ?? '',
      location: {
        lat: request.userPlace?.Location.lat,
        lng: request.userPlace?.Location.lng,
      },
      viewport: {
        northeast: request.userPlace?.Viewport.northeast ?? { lat: 0, lng: 0 },
        southwest: request.userPlace?.Viewport.southwest ?? { lat: 0, lng: 0 },
      },
    },
    companyName: request.companyName,
    companyType: request.companyType,
    companySize: request.companySize,
    referralSource: request.referralSource,
    companyPriority: request.companyPriority,
    marketingPreference: request.marketingPreference,
  };
};

const RegisterForm = () => {
  const { register, registerResponse, registerError } = useRegister();
  const [hasRegisteredSuccessfully, setHasRegisteredSuccessfully] =
    useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const TOTAL_STEPS = 4;
  const locale = useLocale();
  const user = useSelector((state: RootState) => state.user.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneNumber: '',
      userPlace: null,
      companyName: '',
      companyType: '',
      companySize: '',
      referralSource: '',
      companyPriority: '',
      marketingPreference: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const registerRequest = transformRegisterRequest(values);
    register(registerRequest);
  };

  const onContinue = async () => {
    if (currentStep < TOTAL_STEPS) {
      if (currentStep === 1) {
        const step1IsValid = await form.trigger([
          'email',
          'password',
          'confirmPassword',
        ]);
        if (step1IsValid) setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 2) {
        const step2IsValid = await form.trigger([
          'name',
          'phoneNumber',
          'userPlace',
        ]);
        if (step2IsValid) setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 3) {
        const step3IsValid = await form.trigger([
          'companyName',
          'companyType',
          'companySize',
        ]);
        if (step3IsValid) setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePlaceSelected = (place: UserPlace | null) => {
    form.setValue('userPlace', place);
  };

  const renderStep = (step: number) => {
    if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
        return <Step1RegisterForm control={form.control} />;
      case 2:
        return (
          <Step2RegisterForm
            control={form.control}
            onPlaceSelected={handlePlaceSelected}
          />
        );
      case 3:
        return <Step3RegisterForm control={form.control} />;
      case 4:
        return <Step4RegisterForm control={form.control} />;
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (
      registerResponse?.httpStatusCode === 'OK' &&
      !registerResponse?.userConfirmed
    ) {
      setHasRegisteredSuccessfully(true);
    }
  }, [registerResponse]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background p-4 font-roboto'>
        <div className='w-full max-w-md space-y-4'>
          <Card className='w-full max-w-md space-y-4 bg-white p-6 shadow-md'>
            <AuthTitle
              goBack={goBack}
              currentStep={currentStep}
              name='Register'
            />

            <ProgressBar totalSteps={TOTAL_STEPS} currentStep={currentStep} />
            {!hasRegisteredSuccessfully ? (
              <>
                <Form {...form}>
                  <form className='space-y-5'>
                    {renderStep(currentStep)}
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
                          onClick={form.handleSubmit(onSubmit)}
                          className='mt-4 w-full'
                        >
                          Register
                        </Button>
                        <ValidationMessage validationMessage={registerError} />
                      </>
                    )}
                  </form>
                </Form>
              </>
            ) : (
              <>
                <Alert>
                  <FaCheck className='h-4 w-4 text-secondary' />
                  <AlertTitle>
                    Congratulation account successfully created!
                  </AlertTitle>
                  <AlertDescription>
                    Please enter the verification code below.
                  </AlertDescription>
                </Alert>
                <VerificationCode
                  email={form.getValues('email')}
                  password={form.getValues('password')}
                />
              </>
            )}
            <div className='text-center'>
              <span>Already have an account? </span>
              <Link
                href={'login'}
                passHref
                locale={locale}
                className='ml-4 text-xs underline hover:text-accent'
              >
                Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default RegisterForm;
