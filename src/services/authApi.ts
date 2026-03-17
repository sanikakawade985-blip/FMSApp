const BASE_URL = "http://98.70.36.167:801/API/api";

/**
 * Step 1 — Check if technician mobile exists
 */
export const checkMobileExistsApi = async (mobile: string, token?: string) => {

  const url = `${BASE_URL}/Users/IsMobileNoExist?MobileNo=${mobile}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: token } : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Network error while checking mobile number");
  }

  if (data?.Code !== "200") {
    throw new Error(data?.Message || "Mobile number not registered");
  }

  return data;
};


/**
 * Step 2 — Technician Login (Send OTP / Authenticate)
 */
export const sendOtpApi = async (mobile: string) => {

  const payload = {
    UserName: mobile,
    Password: "",
    AndroidID: "mobile-app",
    UserID: 0,
    UserPreferredLanguage: "en",
    PortalDeviceId: "mobile",
  };

  const response = await fetch(`${BASE_URL}/Login/UserLoginMobile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Network error during login");
  }

  if (data?.Code !== "200") {
    throw new Error(data?.Message || "Login failed");
  }

  return data;
};