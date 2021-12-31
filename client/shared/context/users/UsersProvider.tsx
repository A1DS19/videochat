import React from 'react';
import { User, UsersContextState } from './types';

const contextDefaultValues: UsersContextState = {
  currentUser: null,
  addUser: () => {},
  isAuth: false,
  logout: () => {},
};

export const UsersContext = React.createContext<UsersContextState>(contextDefaultValues);

export const UsersProvider: React.FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const addUser = (user: User) => setCurrentUser(user);
  const isAuth = !!currentUser;
  const logout = () => setCurrentUser(null);

  return (
    <UsersContext.Provider
      value={{
        currentUser,
        addUser,
        isAuth,
        logout,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
