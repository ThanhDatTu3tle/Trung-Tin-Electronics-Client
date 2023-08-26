import { createContext } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  search: string | null;
  setSearch: (search: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  search:null,
  setSearch:() => {}
});
