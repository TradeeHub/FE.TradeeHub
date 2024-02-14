import { LoginState } from '@/app/[locale]/types/sharedTypes';
import {
  ChangedForgottenPasswordRequestInput,
  RegisterRequestInput,
  UserEntity,
  useChangePasswordMutation,
  useConfirmAccountMutation,
  useForgotPasswordMutation,
  useLoggedInUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendVerificationCodeMutation,
} from '@/generatedGraphql';

const useLogin = () => {
  const [loginMutation, { data, loading, error }] = useLoginMutation();

  const login = async (
    username: string,
    password: string,
    rememberMe: boolean = false,
  ) => {
    try {
      await loginMutation({
        variables: {
          username,
          password,
          rememberMe,
        },
      });
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return {
    login,
    loginResponse: data?.login as LoginState,
    loginLoading: loading,
    loginError: error,
  };
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

const useGetLoggedInUser = () => {
  const { data, loading, error } = useLoggedInUserQuery();

  return {
    loggedInUser: data?.loggedInUser as UserEntity | undefined,
    loggedInUserLoading: loading,
    loggedInUserError: error,
  };
};

const useChangePassword = () => {
  const [changePasswordMutation, { data, loading, error }] =
    useChangePasswordMutation();

  const changePassword = async (
    input: ChangedForgottenPasswordRequestInput,
  ) => {
    try {
      await changePasswordMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Change Password error:', e);
    }
  };

  return {
    changePassword,
    changePasswordResponse: data,
    changePasswordLoading: loading,
    changePasswordError: error,
  };
};

const useForgotPassword = () => {
  const [forgotPasswordMutation, { data, loading, error }] =
    useForgotPasswordMutation();

  const requestChangePasswordResetCode = async (email: string) => {
    try {
      await forgotPasswordMutation({
        variables: {
          email,
        },
      });
    } catch (e) {
      console.error('Request reset password change error:', e);
    }
  };

  return {
    requestChangePasswordResetCode,
    requestChangePasswordResponse: data,
    requestChangePasswordLoading: loading,
    requestChangePasswordError: error,
  };
};

export {
  useLogin,
  useLogout,
  useConfirmAccount,
  useResendVerificationCode,
  useRegister,
  useGetLoggedInUser,
  useChangePassword,
  useForgotPassword,
};
