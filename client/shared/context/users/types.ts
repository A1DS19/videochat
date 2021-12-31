export type User = {
  id: number;
  email: string;
  created_at: Date;
};

export type UsersContextState = {
  currentUser: User | null;
  addUser: (user: User) => void;
  logout: () => void;
  isAuth: boolean;
};
