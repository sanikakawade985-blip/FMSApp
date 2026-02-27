export interface Task {
  Id: number;
  TaskId: string;
  TaskName: string;
  TaskTagId: number;
  TaskTagName: string;
  TaskStatusId: number;
  TaskStatus: string;
  CustomerId: number;
  CustomerName: string;
  CustomerTagId: number;
  CustomerTag: string;
  FieldworkerId: number;
  FieldworkerName: string;
  TaskDate: string;
  TaskStartDate: string;
  TaskStartTime: string;
  TaskEndDate: string;
  TaskEndTime: string;
  TimeConsumedInTask: string;
  CreatedById: number;
  CreatedByName: string;
  RolesId: number;
  DesignationId: number;
  CreatedByDesignation: string;
  CreatedByUserGroup: string;
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
  TaskTagDescription: string;
  IsActive: boolean;
  UserId: number;
}

export interface TaskStatus {
  Id: number;
  Name: string;
  IsActive: boolean;
}