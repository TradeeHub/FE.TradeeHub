import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPriority, setCompanyPriority] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [marketingPreference, setMarketingPreference] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleRegister = () => {
    // Handle registration logic here
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <div className='w-full max-w-xl rounded-lg bg-white p-8 shadow'>
        <h2 className='mb-6 text-center text-2xl font-bold text-primary'>
          Step {step}: Register Your Account
        </h2>
        {step === 1 && (
          <>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </>
        )}
        {step === 3 && (
          <>
            <Input
              type='text'
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Company Priority'
              value={companyPriority}
              onChange={(e) => setCompanyPriority(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Company Size'
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Company Type'
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            />
          </>
        )}
        {step === 4 && (
          <>
            <Input
              type='text'
              placeholder='Marketing Preference'
              value={marketingPreference}
              onChange={(e) => setMarketingPreference(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Annual Revenue'
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(e.target.value)}
            />
          </>
        )}
        <div className='flex justify-between mt-8'>
          {step > 1 && (
            <Button onClick={handlePreviousStep}>Previous</Button>
          )}
          {step < 4 ? (
            <Button onClick={handleNextStep}>Next</Button>
          ) : (
            <Button onClick={handleRegister}>Register</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
