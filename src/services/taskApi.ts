import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

// Common request function (same as Android logic)
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
  } catch {
    return { statusCode, message, resultData: null };
  }

  // Match Android response handling
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
 * Task APIs
 */
export const taskApi = {
  // 1. Get All Tasks (NEW)
  getAllTasks: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/TaskList/AllTasksListByUserId${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 2. Validate Task
  validateTask: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/ValidateTaskDetails`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 3. Add Pre Device Info (Before Task)
  addPreDeviceInfo: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/AddPreDeviceInfoDetails`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 4. CRM Task List (Search)
  getCRMTaskList: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/CRMGetTaskListSearchByParam${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 5. On Hold Task
  onHoldTask: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/OnHoldTaskDetails`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 6. Get Task Tag List
  getTaskTags: (
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/GetTaskTagList`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 7. Update Reissued Items
  updateReissuedItems: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/UpdateReIssuedItems`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 8. Upload Post Task Docs
  uploadPostTaskDocs: (
    data: any,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/TaskList/UploadPostTaskDocs`,
      "POST",
      data,
      token,
      androidId,
      userId
    ),

  // 9. Get Post Task Docs
  getPostTaskDocs: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/TaskList/GetPostTaskDocs${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 10. Get Task Images (TaskId wise)
  getTaskImages: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/Task/GetAllTaskListTaskIdWise${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),

  // 11. Get Before/After/OnHold Images
  getBeforeAfterOnHoldImages: (
    query: string,
    token: string,
    androidId: string,
    userId: number
  ) =>
    request(
      `${BASE_URL}/TaskList/GetBeforeAfterAndHoldTaskFiles${query}`,
      "GET",
      undefined,
      token,
      androidId,
      userId
    ),
};