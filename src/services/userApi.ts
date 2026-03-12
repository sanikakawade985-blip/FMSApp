const BASE_URL = "http://98.70.36.167:801/API/api";

export type ProfileResponse = {
  Code: string;
  Message: string;
  ResultData: {
    FirstName?: string;
    LastName?: string;
    ContactNo?: string;
    CountryCode?: string;
    Photo?: string;
    CompanyName?: string;
    Email?: string;
  };
};

export const getProfileApi = async (
  token: string,
  userId: number
): Promise<ProfileResponse> => {
  const url = `${BASE_URL}/Users/GetProfileDetails?UserId=${userId}&IsOnlyUserProgress=false`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Message || "Failed to fetch profile");
  }

  return data;
};