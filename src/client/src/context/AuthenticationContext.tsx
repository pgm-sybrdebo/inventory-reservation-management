import React, { useContext, createContext, useState, useEffect } from "react";
import { TokenInfo } from "../interfaces";
import jwt_decode from "jwt-decode";

const UserContext = createContext<"" | TokenInfo | null>(null);

const UserProvider: React.FC = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<"" | TokenInfo | null>(null);
  const token = localStorage.getItem("token");
  const decodedToken = token && jwt_decode<TokenInfo>(token);
  useEffect(() => {
    setJwtToken(decodedToken);
  }, [token]);

  return (
    <UserContext.Provider value={jwtToken}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export { UserProvider, useUser };
