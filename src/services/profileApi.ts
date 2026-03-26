import { BASE_URL, buildHeaders, handleResponse } from "../services/apiClient";

export const getProfileDetails = async (
  userId: number,
  token: string
) => {
  const response = await fetch(
    `${BASE_URL}/Users/GetProfileDetails?UserId=${userId}&IsOnlyUserProgress=false`,
    {
      method: "GET",
      headers: buildHeaders(token, userId),
    }
  );

  return handleResponse(response);
};