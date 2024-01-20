'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Step1RegisterForm from './RegisterFormSteps/Step1RegisterForm';
import Step2RegisterForm from './RegisterFormSteps/Step2RegisterForm';
import Step3RegisterForm from './RegisterFormSteps/Step3RegisterForm';
import Step4RegisterForm from './RegisterFormSteps/Step4RegisterForm';

// Define the schema for all steps
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
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
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match.',
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
    console.log(values)
  }

  const onContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // onSubmit();
    }
  };

  const renderStep = (step: number) => {
    if (!isClient) return null; // Render nothing on server-side

    switch (step) {
      case 1:
         return (<Step1RegisterForm control={form.control}/>);
      case 2:
         return (<Step2RegisterForm control={form.control}/>);
      case 3:
         return (<Step3RegisterForm control={form.control}/>);
      case 4:
         return (<Step4RegisterForm control={form.control}/>);
    }
  };

  
  useEffect(() => {
    // This effect runs only on the client side
    setIsClient(true);
  }, []);
  
  return (
    <div className='space-y-8'>
      {/* <ProgressBar currentStep={currentStep} totalSteps={totalSteps} /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {renderStep(currentStep)}
          <Button type='button' onClick={onContinue}>
            {currentStep < totalSteps ? 'Next' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;