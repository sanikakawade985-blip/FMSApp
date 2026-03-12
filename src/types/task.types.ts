export interface Task {
  Id: number;
  Name: string;
  Description?: string;

  TaskStatus: string;
  TaskStatusId: number;
  TaskState?: number;

  TaskTypeId?: number;
  TaskType?: string;

  TaskDate: string;

  CustomerDetailsid?: number;
  CustomerName: string;
  CustomerEmailId?: string;
  ContactNo?: string;

  TaskTime?: string;

  AssignedTo?: string;
  UserId?: number;

  LocationId?: number;
  LocationName?: string;
  Zipcode?: string;
  LocationDesc?: string;

  Latitude?: string;
  Longitude?: string;

  CreatedBy?: number;
  CreatedDate?: string;
  UpdatedBy?: number;
  UpdatedDate?: string;

  WagesPerHours?: number;
  IsActive?: boolean;

  ItemId?: number;
  ItemName?: string;

  Photo?: string;

  OwnerId?: number;

  TechLatitude?: string;
  TechLongitude?: string;

  StartDate?: number;
  EndDate?: number;

  PaymentNotReceived?: boolean;

  FullAddress?: string;

  Quantity?: number;

  EarningAmount?: number;

  TechContactNo?: string;

  PaymentMode?: string;
  PaymentModeId?: number;

  DateTimeStr?: string;

  TaskClosureStatus?: boolean;

  FirstNameLastName?: string;

  Task_TagId?: number;
  Task_TagName?: string;

  CityName?: string;
  State?: string;
  PinCode?: string;

  CountryName?: string;

  TaskStartDate?: string;
  TaskStartTime?: string;
  TaskEndDate?: string;
  TaskEndTime?: string;
}

export interface TaskListResponse {
  Code: string;
  Message: string;
  PageIndex: number;
  PageSize: number;
  RecordCount: number;
  ResultData: Task[];
}

export interface TaskTag {
  TaskTagId: number;
  TaskTagName: string;
  TaskTagDescription?: string;
  IsActive: boolean;
  UserId?: number;
}

export interface TaskStatus {
  TaskStatusId: number;
  TaskStatus: string;
  IsActive: boolean;
}