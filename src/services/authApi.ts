import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

export const checkMobileExistsApi = async (mobile: string) => {
  const response = await fetch(
    `${BASE_URL}/Users/IsMobileNoExist?MobileNo=${mobile}`,
    {
      method: "GET",
      headers: buildHeaders(), // no token, no userId
    }
  );

  return handleResponse(response);
};

export const sendOtpApi = async (mobile: string) => {
  const response = await fetch(`${BASE_URL}/Login/Login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      UserName: mobile,
      Password: "",
      AndroidID: "ANDROID",
      UserID: 0,
      UserPreferredLanguage: "en",
      PortalDeviceId: "mobile",
    }),
  });

  return handleResponse(response);
};