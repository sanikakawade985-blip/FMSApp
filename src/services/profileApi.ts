import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

/**
 * Common request handler (same as Android URLConnectionRequest)
 */
async function request(
  url: string,
  method: string,
  token?: string,
  androidId?: string,
  userId?: number
) {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (androidId) headers["AndroidID"] = androidId;
  if (userId) headers["UserID"] = String(userId);
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
  });

  const statusCode = res.status;
  const message = res.statusText;

  let json = null;
  try {
    json = await res.json();
  } catch {
    return { statusCode, message, resultData: null };
  }

  // Match Android error handling
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
 * PROFILE APIs
 */
export const profileApi = {

  /**
   * 1. Get User Profile Details
   * URL: User/GetUserDetails
   */
  getUserDetails: (
    token: string,
    userId: number,
    androidId?: string
  ) =>
    request(
      `${BASE_URL}/User/GetUserDetails?UserId=${userId}`,
      "GET",
      token,
      androidId,
      userId
    ),

};