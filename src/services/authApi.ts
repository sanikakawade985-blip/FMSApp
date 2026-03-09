const BASE_URL = 'http://98.70.36.167:801/API/api';

//
// STEP 1 – Send OTP
//
export const sendOtpApi = async (mobile: string) => {
  const payload = {
    UserName: mobile,
    Password: '',
    AndroidID: 'mobile-app',
    UserID: 0,
    UserPreferredLanguage: 'en',
    PortalDeviceId: 'mobile',
  };

  const response = await fetch(`${BASE_URL}/Login/UserLoginMobile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;

  try {
    data = await response.json();
  } catch (err) {
    console.log('LOGIN PARSE ERROR:', err);
    throw new Error('Invalid server response');
  }

  console.log('LOGIN RESPONSE:', {
    code: data?.Code,
    message: data?.Message,
    userId: data?.ResultData?.UserID,
    role: data?.ResultData?.UserGroupName,
  });

  if (!response.ok) {
    throw new Error('Network error while requesting OTP');
  }

  if (data?.Code !== '200') {
    throw new Error(data?.Message || 'Login failed');
  }

  return data;
};

//
// STEP 2 – Verify OTP (⚠️ replace endpoint if different)
//
export const verifyOtpApi = async (
  mobile: string,
  otp: string
) => {
  const response = await fetch(
    `${BASE_URL}/Login/UserLoginMobile`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserName: mobile,
        Password: otp,   // OTP goes here
        AndroidID: 'mobile-app',
        UserID: 0,
        UserPreferredLanguage: 'en',
        PortalDeviceId: 'mobile',
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || data.Code != 200) {
    throw new Error(data?.Message || 'Invalid OTP');
  }

  return data;
};

export const signupMobileApi = async (mobile: string) => {
  try {
    const response = await fetch(`${BASE_URL}/SignUp/RegisterOwner`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserName: mobile,
        Password: '',
        AndroidID: 'android',
        UserID: 0,
        UserPreferredLanguage: 'en',
        PortalDeviceId: 'android',
      }),
    });

    const data = await response.json();

    console.log('Signup API response:', data);

    console.log('STATUS:', response.status);
    console.log('DATA:', data);

    if (response.status !== 200) {
      throw new Error(data?.Message || 'Server error');
    }

    return data;
    } catch (error: any) {
      console.log('FETCH ERROR:', error);
      throw error;
    }
};