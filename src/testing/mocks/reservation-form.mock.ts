import { ReservationRequest } from "../../app/service/model/reservation-request.model"
import { InvalidTestCase } from "../util/form-validation.utils"

export const mockValidReservationForm = {
    startingTime: '12:00 PM',
    endingTime: '03:00 PM'
}

export const mockInvalidReservationForm = {
    startingTime: '',
    endingTime: ''
}

export const invalidReservationTestCases: InvalidTestCase[] = [
  { field: 'startingTime', invalidValue: '', expectedError: 'required' },
  { field: 'endingTime', invalidValue: '', expectedError: 'required'}
]

export const validReservationRequest: ReservationRequest = {
  startingTime: '08:00 AM',
  endingTime: "11:00 AM",
  plannedAmount: 120
}