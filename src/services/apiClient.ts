const BASE_URL = "http://98.70.36.167:801/API/api";

export const buildHeaders = (token?: string, userId?: number) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
  ...(userId && { UserID: String(userId) }),
  AndroidID: "ANDROID",
});

export const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Message || "Network error");
  }

  // 🔥 Backend-specific handling (from Android code)
  if (data?.Code === "401") {
    throw new Error("Unauthorized");
  }

  if (data?.Code && data.Code !== "200") {
    throw new Error(data?.Message || "API error");
  }

  return data?.Data ?? data;
};

export { BASE_URL };