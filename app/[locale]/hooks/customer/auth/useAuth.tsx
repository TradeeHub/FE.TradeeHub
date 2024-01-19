import { LoginState } from '@/app/[locale]/types/sharedTypes';
import {
  useConfirmAccountMutation,
  useLoginMutation,
  useResendVerificationCodeMutation,
} from '@/generatedGraphql';

const useLogin = () => {
  const [loginMutation, { data, loading, error }] = useLoginMutation();

  const login = async (username: string, password: string) => {
    try {
      await loginMutation({
        variables: {
          username,
          password,
        },
      });
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  const loginResponse = data?.login as LoginState;

  return { login, loginResponse, loading, error };
};

const useConfirmAccount = () => {
  const [confirmAccountMutation, { data, loading, error }] =
    useConfirmAccountMutation();

  const confirmAccount = async (confirmationCode: string, email: string) => {
    try {
      await confirmAccountMutation({
        variables: {
          confirmationCode,
          email,
        },
      });
    } catch (e) {
      console.error('Account confirmation error:', e);
    }
  };

  return {
    confirmAccount,
    verificationResponse: data,
    verificationLoading: loading,
    verificationError: error,
  };
};

const useResendVerificationCode = () => {
  const [resendVerificationCodeMutation, { data, loading, error }] =
    useResendVerificationCodeMutation();

  const resendConfirmationCode = async (email: string) => {
    try {
      await resendVerificationCodeMutation({
        variables: {
          email,
        },
      });
    } catch (e) {
      console.error('Account verification error:', e);
    }
  };

  return { resendConfirmationCode, data, loading, error };
};

export { useLogin, useConfirmAccount, useResendVerificationCode };
