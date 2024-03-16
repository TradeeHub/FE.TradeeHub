import { Button } from '@/components/ui/button';
import VerificationCodeInput from '../../general/AddressAutocomplete/VerificationCode';
import {
  useConfirmAccount,
  useLogin,
  useResendVerificationCode
} from '@/app/[locale]/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import ValidationMessage from '../ValidationMessage/ValidationMessage';
import { ConfirmAccountMutation } from '@/generatedGraphql';
import authenticatedVar from '@/app/[locale]/constants/authenticated';
import { setUser } from '@/lib/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

interface VerificationCodeProps {
  email: string;
  password: string;
}

const VerificationCode = (data: VerificationCodeProps) => {
  const { login, loginResponse } = useLogin();
  const { confirmAccount, verificationResponse, verificationError } =
    useConfirmAccount();
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { resendVerificationCode, resendVerificationResponse } =
    useResendVerificationCode();

  const handleVerificationSubmit = (code: string) => {
    confirmAccount(code, data.email);
  };

  const handleRequestNewCode = () => {
    resendVerificationCode(data.email);
  };

  useEffect(() => {
    if (verificationError) {
      setShowError(true);
    }
  }, [verificationError]);

  useEffect(() => {
    const confirmResult =
      (verificationResponse as ConfirmAccountMutation) || null;
    if (
      !verificationError &&
      confirmResult?.confirmAccount?.isConfirmationSuccess
    ) {
      login(data.email, data.password);
    }
  }, [verificationResponse]);

  useEffect(() => {
    if (resendVerificationResponse) {
      setShowError(false);
    }
  }, [resendVerificationResponse]);

  useEffect(() => {
    if (
      loginResponse &&
      loginResponse?.isConfirmed &&
      loginResponse?.isSuccess &&
      loginResponse?.user
    ) {
      authenticatedVar(true);
      dispatch(setUser(loginResponse.user)); // Dispatch the setUser action
      router.push(`/${locale}/dashboard`);
    }
  }, [loginResponse]);

  return (
    <>
      <VerificationCodeInput length={6} onComplete={handleVerificationSubmit} />
      {showError && <ValidationMessage validationMessage={verificationError} />}

      <Button
        disabled={!verificationError}
        type='button'
        onClick={handleRequestNewCode}
        className='mt-4 w-full'
      >
        Send New Verification Code
      </Button>
    </>
  );
};

export default VerificationCode;
