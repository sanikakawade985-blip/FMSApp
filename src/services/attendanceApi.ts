import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

export const addAttendanceApi = async (
  token: string,
  userId: number,
  latitude: string,
  longitude: string
) => {
  const response = await fetch(`${BASE_URL}/Attendance/AddAttendance`, {
    method: "POST",
    headers: buildHeaders(token, userId),
    body: JSON.stringify({
      Id: 0,
      UserId: userId,
      AttendanceDate: new Date().toISOString(),
      AttendanceTypeId: 1,
      CreatedBy: userId,
      UpdatedBy: String(userId),
      IsSuccessful: true,
      IsModelError: false,
      AttendanceMarkedPlace: "Mobile App",
      Latitude: latitude,
      Longitude: longitude,
    }),
  });

  return handleResponse(response);
};