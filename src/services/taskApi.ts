import { TaskListResponse } from '../types/task.types';

const BASE_URL = 'http://98.70.36.167:801/API/api';

const headers = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/**
 * Fetch technician task list
 */
export const getTasksApi = async (
  token: string,
  userId: number,
  searchparam = '',
  taskStatusId = 0,
  pageIndex = 1,
  taskMonth = new Date().getMonth() + 1,
  taskYear = new Date().getFullYear(),
  taskTag = 1,
): Promise<TaskListResponse> => {

  const url =
    `${BASE_URL}/Task/CRMGetTaskListSearchByParam` +
    `?UserId=${userId}` +
    `&searchparam=${searchparam}` +
    `&TaskStatusID=${taskStatusId}` +
    `&TaskTypeID=1` +
    `&pageIndex=${pageIndex}` +
    `&TaskMonth=${taskMonth}` +
    `&TaskYear=${taskYear}` +
    `&TaskTagId=${taskTag}` +
    `&CustomerDetailsId=0`;

  const response = await fetch(url, {
    method: 'GET',
    headers: headers(token),
  });

  const data = await response.json();

  if (!response.ok || data.Code !== '200') {
    throw new Error(data?.Message || 'Task fetch failed');
  }

  return data;
};

/**
 * Fetch Task Tags
 */
export const getTaskTagsApi = async (
  token: string,
  userId: number
) => {

  const response = await fetch(
    `${BASE_URL}/Task/GetTaskTagList?UserId=${userId}`,
    {
      method: 'GET',
      headers: headers(token),
    }
  );

  const data = await response.json();

  if (!response.ok || data?.Code !== '200') {
    throw new Error(data?.Message || 'Task tag fetch failed');
  }

  return data?.ResultData || [];
};

/**
 * Fetch Task Status List
 */
export const getTaskStatusApi = async (token: string) => {

  const response = await fetch(
    `${BASE_URL}/Task/GetTaskStatusList`,
    {
      method: 'GET',
      headers: headers(token),
    }
  );

  const data = await response.json();

  if (!response.ok || data?.Code !== '200') {
    throw new Error(data?.Message || 'Task status fetch failed');
  }

  return data?.ResultData || [];
};

/**
 * Update Task Status
 * Used for Start / End / Reject actions
 */
export const updateTaskStatusApi = async (
  token: string,
  payload: any
) => {

  const response = await fetch(
    `${BASE_URL}/Task/UpdateTaskStatus`,
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok || data?.Code !== '200') {
    throw new Error(data?.Message || 'Task status update failed');
  }

  return data;
};