import { createContext } from "react";

// Default user context with null values
export interface UserContextType {
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  } | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
}); 