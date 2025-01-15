import { Status } from "../../category/model/status-enum-ts";

export interface UpdateReportRequest {
    status: Status;
}