const BASE_URL = 'http://98.70.36.167:801/API/api';

//
// STEP 1 – Send OTP
//
export const sendOtpApi = async (mobile: string) => {
  const response = await fetch(`${BASE_URL}/Login/UserLoginMobile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UserName: mobile,
      Password: '',
      AndroidID: 'mobile-app',
      UserID: 0,
      UserPreferredLanguage: 'en',
      PortalDeviceId: 'mobile',
    }),
  });

  const text = await response.text();
  console.log('LOGIN RAW RESPONSE:', text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid server response');
  }

  console.log('LOGIN PARSED DATA:', data);
  console.log('USER ID:', data?.ResultData?.UserID);
  console.log('TOKEN:', data?.ResultData?.Token);
  console.log('ROLE:', data?.ResultData?.UserGroupName);
  console.log('REQUEST BODY:', {
    UserName: mobile,
    Password: '',
  });

  if (!response.ok || data.Code != 200) {
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