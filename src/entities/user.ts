export type UserLoginData = {
  email: string;
  password: string;
};

export type UserNoId = UserLoginData & {
  firstName: string;
  lastName: string;
};

export type UserWithId = {
  id: string;
};

export type User = UserNoId & UserWithId;
