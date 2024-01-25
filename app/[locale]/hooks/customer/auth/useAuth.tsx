import { LoginState } from '@/app/[locale]/types/sharedTypes';
import {
  RegisterRequestInput,
  useConfirmAccountMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendVerificationCodeMutation,
} from '@/generatedGraphql';
import { ApolloError, ServerError } from '@apollo/client';

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

const useLogout = () => {
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return { logout };
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

  const resendVerificationCode = async (email: string) => {
    try {
      await resendVerificationCodeMutation({
        variables: {
          email,
        },
      });
    } catch (e) {
      console.error('Resend verification code error:', e);
    }
  };

  return {
    resendVerificationCode,
    resendVerificationResponse: data,
    resendVerificationLoading: loading,
    resendVerificationError: error,
  };
};

const useRegister = () => {
  const [registerMutation, { data, loading, error }] = useRegisterMutation();

  const register = async (input: RegisterRequestInput) => {
    try {
      await registerMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Register error:', e);
    }
  };

  return {
    register,
    registerResponse: data?.register,
    registerLoading: loading,
    registerError: error,
  };
};

export {
  useLogin,
  useLogout,
  useConfirmAccount,
  useResendVerificationCode,
  useRegister,
};
