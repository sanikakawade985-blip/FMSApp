import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

/**
 * Common request (LOGIN / SIGNUP / OTP)
 * NOTE: No AndroidID / UserID required
 */
async function request(
  url: string,
  method: string,
  data?: any
) {
  const headers: any = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  const statusCode = res.status;
  const message = res.statusText;

  let json = null;
  try {
    json = await res.json();
  } catch {
    return { statusCode, message, resultData: null };
  }

  // Android error handling
  if (json?.Code === "999" || json?.Code === "401" || json?.Code === "888") {
    return {
      statusCode: Number(json.Code),
      message: json.Message,
      resultData: null,
    };
  }

  return {
    statusCode,
    message,
    resultData: json,
  };
}

/**
 * AUTH APIs
 */
export const authApi = {

  /**
   * 1. LOGIN (Mobile)
   * URL: Login/UserLoginMobile
   */
  login: (data: any) =>
    request(
      `${BASE_URL}/Login/UserLoginMobile`,
      "POST",
      data
    ),

  /**
   * 2. SEND OTP
   * URL: SignUp/TechOrOwnerSignUpOtp
   */
  sendOtp: (data: any) =>
    request(
      `${BASE_URL}/SignUp/TechOrOwnerSignUpOtp`,
      "POST",
      data
    ),

  /**
   * 3. REGISTER TECHNICIAN
   * URL: Login/RegisterUser
   */
  registerTechnician: (data: any) =>
    request(
      `${BASE_URL}/Login/RegisterUser`,
      "POST",
      data
    ),

  /**
   * 4. REGISTER OWNER
   * URL: Login/RegisterOwner
   */
  registerOwner: (data: any) =>
    request(
      `${BASE_URL}/Login/RegisterOwner`,
      "POST",
      data
    ),
};