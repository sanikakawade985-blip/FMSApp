const BASE_URL = "http://98.70.36.167:801/API/api";

/**
 * Build headers (matches RequestBuilder.java)
 */
export const buildHeaders = (
  token?: string,
  userId?: number,
  androidId?: string
) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (androidId) headers["AndroidID"] = androidId;
  if (userId) headers["UserID"] = String(userId);
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return headers;
};

/**
 * Handle response (matches URLConnectionResponse.java)
 */
export const handleResponse = async (response: Response) => {
  const statusCode = response.status;
  const message = response.statusText;

  let json = null;

  try {
    json = await response.json();
  } catch {
    return {
      statusCode,
      message,
      resultData: null,
    };
  }

  /**
   * 🔴 Android-specific error codes
   */
  if (
    json?.Code === "999" ||
    json?.Code === "401" ||
    json?.Code === "888"
  ) {
    return {
      statusCode: Number(json.Code),
      message: json.Message,
      resultData: null,
    };
  }

  /**
   * ✅ Success case (DO NOT extract ResultData here)
   * Android returns full object
   */
  return {
    statusCode,
    message,
    resultData: json,
  };
};

export { BASE_URL };