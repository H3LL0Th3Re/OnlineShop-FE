export interface Users {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone_number: string;
  role_id: Roles;
}

export interface Roles {
  id: string;
  name: string;
}
