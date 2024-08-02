export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export type PartialUser = Partial<User>;
