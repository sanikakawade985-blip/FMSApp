import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

/**
 * =========================
 * TASK LIST (MAIN API)
 * =========================
 */
export const getTasksApi = async (
  token: string,
  userId: number,
  params: {
    searchparam?: string;
    TaskStatusID?: number;
    TaskTypeID?: number;
    pageIndex?: number;
    TaskMonth: number;
    TaskYear: number;
    CustomerDetailsId?: number;
  }
) => {
  const query =
    `?UserId=${userId}` +
    `&searchparam=${params.searchparam || ""}` +
    `&TaskStatusID=${params.TaskStatusID || 0}` +
    `&TaskTypeID=${params.TaskTypeID || 1}` +
    `&pageIndex=${params.pageIndex || 1}` +
    `&TaskMonth=${params.TaskMonth}` +
    `&TaskYear=${params.TaskYear}` +
    `&CustomerDetailsId=${params.CustomerDetailsId || 0}`;

  const response = await fetch(
    `${BASE_URL}/Task/CRMGetTaskListSearchByParam${query}`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * TASK TAGS
 * =========================
 */
export const getTaskTagsApi = async (
  token: string,
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/GetTaskTagList?UserId=${userId}`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * TASK STATUS LIST
 * =========================
 */
export const getTaskStatusApi = async (
  token: string,
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/GetTaskStatusList`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * UPDATE TASK STATUS
 * =========================
 */
export const updateTaskStatusApi = async (
  token: string,
  userId: number,
  payload: {
    TaskId: number;
    StatusId: number;
    Remarks?: string;
  }
) => {
  const response = await fetch(
    `${BASE_URL}/Task/UpdateTaskStatus`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * UPDATE TASK DETAILS
 * =========================
 */
export const updateTaskApi = async (
  token: string,
  userId: number,
  payload: any
) => {
  const response = await fetch(
    `${BASE_URL}/Task/UpdateTaskDetailsByTaskID`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * ADD TASK
 * =========================
 */
export const addTaskApi = async (
  token: string,
  userId: number,
  payload: any
) => {
  const response = await fetch(
    `${BASE_URL}/TaskList/AddTaskDetails`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * GET TASK BY ID
 * =========================
 */
export const getTaskByIdApi = async (
  token: string,
  userId: number,
  taskId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/TaskListByTaskId?TaskId=${taskId}`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * ACTIVATE / DEACTIVATE TASK
 * =========================
 */
export const deactivateTaskApi = async (
  token: string,
  userId: number,
  taskId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/DeActivatTaskByTaskID?Id=${taskId}`,
    {
      method: "DELETE",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

export const activateTaskApi = async (
  token: string,
  userId: number,
  taskId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/ActivatTaskByTaskID?Id=${taskId}`,
    {
      method: "DELETE",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * REASSIGN TASK
 * =========================
 */
export const reassignTaskApi = async (
  token: string,
  userId: number,
  payload: {
    TaskId: number;
    AssignTo: number;
  }
) => {
  const response = await fetch(
    `${BASE_URL}/Task/ReassignTask`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * VALIDATE TASK
 * =========================
 */
export const validateTaskApi = async (
  token: string,
  userId: number,
  params: {
    Userid: number;
    TaskId: number;
    NewTaskId: string;
  }
) => {
  const query =
    `?Userid=${params.Userid}` +
    `&TaskId=${params.TaskId}` +
    `&NewTaskId=${params.NewTaskId}`;

  const response = await fetch(
    `${BASE_URL}/Task/ValidateTaskDetails${query}`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * LIVE LOCATION
 * =========================
 */
export const addLiveLocationApi = async (
  token: string,
  userId: number,
  payload: {
    UserId: number;
    Latitude: number;
    Longitude: number;
  }
) => {
  const response = await fetch(
    `${BASE_URL}/Task/AddLiveLocation`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

export const getLiveLocationApi = async (
  token: string,
  userId: number,
  targetUserId: number
) => {
  const response = await fetch(
    `${BASE_URL}/Task/GetLiveLocation?UserId=${targetUserId}`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * TASK CLOSURE
 * =========================
 */
export const addTaskClosureApi = async (
  token: string,
  userId: number,
  payload: any
) => {
  const response = await fetch(
    `${BASE_URL}/Task/AddTaskClosureDetails`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};

/**
 * =========================
 * ON HOLD TASK
 * =========================
 */
export const onHoldTaskApi = async (
  token: string,
  userId: number,
  payload: any
) => {
  const response = await fetch(
    `${BASE_URL}/Task/OnHoldTaskDetails`,
    {
      method: "POST",
      headers: buildHeaders(token, userId),
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(response);
};