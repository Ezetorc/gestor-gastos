export interface UserT {
  email: string;
  id: number;
  image: string;
  name: string;
  password: string;
}
export type Credentials = {
  email: string;
  password: string;
};

export type ApiResponse = {
  value: {
    token: string;
    user: UserT;
  };
};
