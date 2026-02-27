import { TaskListResponse } from '../types/task.types';

const BASE_URL = 'http://98.70.36.167:801/API/api';

const headers = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getTasksApi = async (
  token: string,
  userId: number,
  searchparam = '',
  taskStatusId = 0,
  taskTagId = 0,
  pageIndex = 1,
  pageSize = 10
): Promise<TaskListResponse> => {
  const url = `${BASE_URL}/TaskList/AllTasksListByUserIdOptimised?UserId=${userId}&Searchparam=${searchparam}&TaskStatusID=${taskStatusId}&TaskTagId=${taskTagId}&PageIndex=${pageIndex}&PageSize=${pageSize}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: headers(token),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.Message);

  return data;
};

export const getTaskTagsApi = async (
  token: string,
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/GetTaskTagList?UserId=${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  const data = await response.json();

  return data?.ResultData?.filter(
    (tag: any) => tag.IsActive === true
  ) || [];
};

export const getTaskStatusApi = async (token: string) => {
  const response = await fetch(
    `${BASE_URL}/Task/GetTaskStatusList`,
    { headers: headers(token) }
  );
  const data = await response.json();
  return data?.ResultData || [];
};

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
  if (!response.ok) throw new Error(data?.Message);

  return data;
};