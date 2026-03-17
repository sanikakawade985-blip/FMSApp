const BASE_URL = "http://98.70.36.167:801/API/api";

export interface Profile {
  Id: number
  UserID: number
  FirstName: string
  LastName: string
  ContactNo: string
  Email: string
  Address: string
  Photo?: string
  DOB?: string
  AadharCardNo?: string

  EmployeeDocumentBase64?: string
  EmployeeDocumentName?: string
  EmployeeDocumentFileType?: string

  OwnerFirstName?: string
  OwnerLastName?: string
}

/**
 * Get Technician Profile
 */
export const getProfileDetails = async (
  userId: number,
  token: string
) => {
  const response = await fetch(
    `${BASE_URL}/Users/GetProfileDetails?UserId=${userId}&IsOnlyUserProgress=false`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  if (data?.Code !== "200") {
    throw new Error(data?.Message || "Profile fetch failed");
  }

  return data;
};


/**
 * Update Technician Profile
 */
export const updateUserProfile = async (
  profile: Partial<Profile>,
  token: string
) => {

  const payload = {
    UserId: profile.UserID ?? profile.Id,
    FirstName: profile.FirstName,
    LastName: profile.LastName,
    Email: profile.Email,
    ContactNo: profile.ContactNo,
    Address: profile.Address,
    DOB: profile.DOB,
    AadharCardNo: profile.AadharCardNo,
    UpdatedBy: profile.UserID ?? profile.Id,
    EmployeeDocumentBase64: profile.EmployeeDocumentBase64,
    EmployeeDocumentName: profile.EmployeeDocumentName,
    EmployeeDocumentFileType: profile.EmployeeDocumentFileType,
  };

  const response = await fetch(`${BASE_URL}/Users/UpdateUserProfile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Profile update failed");
  }

  if (data?.Code !== "200") {
    throw new Error(data?.Message || "Profile update failed");
  }

  return data;
};


/**
 * Validate Mobile Update
 */
export const validateMobileForUpdate = async (
  mobile: string,
  userId: number,
  token: string
) => {

  const response = await fetch(
    `${BASE_URL}/Users/IsMobileNoExistForUpdateProfile?MobileNo=${mobile}&UserId=${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Mobile validation failed");
  }

  return data;
};