export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string
}