const BASE_URL = 'http://98.70.36.167:801/API/api';

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Message || 'Network request failed');
  }

  if (data?.Code && data.Code !== '200') {
    throw new Error(data?.Message || 'API request failed');
  }

  return data;
};

/**
 * Technician Check-In
 */
export const addAttendanceApi = async (
  token: string,
  userId: number,
  latitude: string,
  longitude: string
) => {
  const response = await fetch(`${BASE_URL}/Attendance/AddAttendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      Id: 0,
      UserId: userId,
      AttendanceDate: new Date().toISOString(),
      AttendanceTypeId: 1,
      CreatedBy: userId,
      UpdatedBy: String(userId),
      IsSuccessful: true,
      IsModelError: false,
      AttendanceMarkedPlace: 'Mobile App',
      Latitude: latitude,
      Longitude: longitude,
      CheckOutPlace: '',
    }),
  });

  return handleResponse(response);
};

/**
 * Technician Check-Out
 */
export const checkoutAttendanceApi = async (
  token: string,
  userId: number,
  latitude: string,
  longitude: string
) => {
  const response = await fetch(`${BASE_URL}/Attendance/CheckOutAttendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      Id: 0,
      UserId: userId,
      AttendanceDate: new Date().toISOString(),
      AttendanceTypeId: 2,
      CreatedBy: userId,
      UpdatedBy: String(userId),
      IsSuccessful: true,
      IsModelError: false,
      AttendanceMarkedPlace: 'Mobile App',
      Latitude: latitude,
      Longitude: longitude,
      CheckOutPlace: 'Mobile App',
    }),
  });

  return handleResponse(response);
};

/**
 * Check if today's attendance exists
 */
export const getTodayAttendanceExistsApi = async (
  token: string,
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Attendance/GetTodayAttandanceIsExist?UserId=${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    }
  );

  return handleResponse(response);
};

/**
 * Monthly attendance for technician
 */
export const getAttendanceMonthlyApi = async (
  token: string,
  userId: number,
  currentDate: string,
) => {
  const today = new Date().toISOString().split('T')[0];

  const response = await fetch(
    `${BASE_URL}/Attendance/GetAttendanceMonthlyForTechnicians?UserId=${userId}&Dates=${today}`,
    {
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    }
  );

  return handleResponse(response);
};

/**
 * Attendance history records
 */
export const getAttendanceRecordsApi = async (
  token: string,
  userId: number,
  startDate: string
) => {
  const response = await fetch(
    `${BASE_URL}/Attendance/GetAttendanceRecords?UserId=${userId}&StartDate=${startDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    }
  );

  return handleResponse(response);
};