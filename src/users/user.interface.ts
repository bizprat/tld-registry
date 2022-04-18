export interface UserInterface {
  readonly id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  phone: Array<number>;
  countryId: number;
  stateId: number;
  cityId: number;
  postalCode: number;
  isActive: boolean;
}
