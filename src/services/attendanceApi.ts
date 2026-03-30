import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

// Common request handler (matches URLConnectionRequest logic)
async function request(
  url: string,
  method: string,
  data?: any,
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
  } catch (e) {
    return { statusCode, message, resultData: null };
  }

  // Match Android parsing logic
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
 * Attendance APIs
 */
export const attendanceApi = {
  // 1. Add Attendance (POST)
  addAttendance: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Attendance/AddAttendance`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 2. Get Technician Monthly Attendance (GET)
  getTechMonthly: (
    query: string, // pass ?UserId=...&Month=... etc
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Attendance/GetAttendanceRecords${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 3. Get Owner Monthly Attendance (GET)
  getOwnerMonthly: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Attendance/GetAttendanceMonthlyForAdmin${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 4. Check Today Attendance Exists (GET)
  checkAttendance: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Attendance/GetTodayAttandanceIsExist${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 5. Checkout Attendance (GET)
  checkOut: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Attendance/CheckOutAttendance`,
      "POST",
      undefined,
      token,
      androidId,
      userId
    ),
};