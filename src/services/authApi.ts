export type SendOtpPayload = {
  countryCode: string;
  mobile: string;
};

export type SendOtpResponse = {
  success: boolean;
  message?: string;
};

/**
 * TEMPORARY OTP sender
 * --------------------
 * This simulates a backend API.
 * Replace with real API call later.
 */
export const sendOtp = async (
  payload: SendOtpPayload
): Promise<SendOtpResponse> => {
  console.log('[AUTH API] sendOtp called with:', payload);

  // Simulate network latency
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));

  // TEMP: always succeed
  return {
    success: true,
    message: 'OTP sent successfully',
  };
};

export type VerifyOtpPayload = {
  countryCode: string;
  mobile: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  token?: string;
};

export const verifyOtp = async (payload: any) => {
  if (payload.otp !== '1234') {
    return { success: false };
  }
  return { success: true, token: 'real-token' };
};

