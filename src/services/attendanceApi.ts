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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Id: 0,
      UserId: userId,
      AttendanceDate: new Date().toISOString(),
      AttendanceTypeId: 1,
      CreatedBy: userId,
      UpdatedBy: userId,
      IsSuccessful: true,
      IsModelError: false,
      AttendanceMarkedPlace: 'Mobile App',
      Latitude: latitude,
      Longitude: longitude,
      CheckOutPlace: '',
    }),
  });

  const data = await handleResponse(response);

  if (data?.ResultData?.IsModelError) {
    throw new Error('Attendance validation failed');
  }

  return data;
};

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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Id: 0,
      UserId: userId,
      AttendanceDate: new Date().toISOString(),
      AttendanceTypeId: 2,
      CreatedBy: userId,
      UpdatedBy: userId,
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

export const getAttendanceTechMonthlyApi = async (
  token: string,
  userId: number
) => {
  const today = new Date();

  const startDate =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate();

  const response = await fetch(
    `${BASE_URL}/Attendance/GetAttendanceTechMonthly?UserId=${userId}&StartDate=${startDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return handleResponse(response);
};

export const getTodayAttendanceExistsApi = async (
  token: string,
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Attendance/GetTodayAttandanceIsExist?UserId=${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return handleResponse(response);
};

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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return handleResponse(response);
};