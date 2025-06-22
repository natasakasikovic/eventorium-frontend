import { Role } from "../../auth/model/user-role.model";

export interface UpgradeAccountRequest {
  role: Role;
  address: string;
  phoneNumber: string;
}