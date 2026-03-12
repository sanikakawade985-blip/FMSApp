const BASE_URL = "http://98.70.36.167:801/API/api";

/**
 * Technician Login – Request OTP
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
    throw new Error("Network error while requesting OTP");
  }

  if (data?.Code !== "200") {
    throw new Error(data?.Message || "Login failed");
  }

  return data;
};