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

// Define the schema for all steps
const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z
      .string()
          .min(8, { message: 'Password must be at least 8 characters.' })
          .regex(/[0-9]/, { message: 'Password must contain at least 1 number.' })
          .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least 1 special character.' })
          .regex(/[A-Z]/, { message: 'Password must contain at least 1 uppercase letter.' })
          .regex(/[a-z]/, { message: 'Password must contain at least 1 lowercase letter.' }),
    confirmPassword: z.string(),
    name: z.string().min(2, { message: 'Please enter your name.' }),
    phoneNumber: z.string().min(10, { message: 'Invalid phone number.' }),
    address: z.string().min(5, { message: 'Please enter your address.' }),
    companyName: z
      .string()
      .min(2, { message: 'Please enter your company name.' }),
    companyPriority: z.string(),
    companySize: z.string(),
    companyType: z.string(),
    marketingPreference: z.string(),
    annualRevenue: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'], // This shows where the error occurred
  });

const RegisterForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneNumber: '',
      address: '',
      companyName: '',
      companyPriority: '',
      companySize: '',
      companyType: '',
      marketingPreference: '',
      annualRevenue: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const onContinue = async () => {
    if (currentStep < totalSteps) {
      if (currentStep === 1) {
        const step1IsValid =
          (await form.trigger('email')) &&
          (await form.trigger('password')) &&
          (await form.trigger('confirmPassword'));
        if (step1IsValid) setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 2) {
        const step2IsValid =
          (await form.trigger('name')) &&
          (await form.trigger('phoneNumber')) &&
          (await form.trigger('address'));
        if (step2IsValid) setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleLogin = () => {
    // router.push('/register');
  };

  const renderStep = (step: number) => {
    if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
        return <Step1RegisterForm control={form.control} />;
      case 2:
        return <Step2RegisterForm control={form.control} />;
      case 3:
        return <Step3RegisterForm control={form.control} />;
      case 4:
        return <Step4RegisterForm control={form.control} />;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4 font-roboto'>
      <div className='w-full max-w-md space-y-4'>
        <Card className='w-full max-w-md space-y-4 bg-white p-6 shadow-md'>
          <div className='pl-2 text-center text-3xl font-bold'>
            <span className='text-primary dark:text-accent'>Tradee</span>
            <span className='text-secondary'>Hub</span>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              {renderStep(currentStep)}
              <Button
                variant='default'
                className='mt-4 w-full'
                onClick={onContinue}
              >
                {currentStep < totalSteps ? 'Continue' : 'Register'}
              </Button>

              {/* <Button type='submit'>Submit</Button> */}
            </form>
          </Form>
          <div className='text-center'>
            <span>Already have an account? </span>
            <Button variant='link' size='sm' onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
