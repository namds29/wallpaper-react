import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import userService from "../../services/user-service";

type Decode_Token = {
  id: number,
  loginName: string;
  role: number;
};

export const AuthContext = createContext({
  token: "",
  userID: 0
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>("");
  const [userID, setUserID] = useState<number>(0)
  const navigate = useNavigate();
  const location = useLocation();
  const checkLogin = useCallback(() => {
    const storedToken = localStorage.getItem("token") ?? "";
    if (userService.isLoggedIn()) {
      try {
        const decode_token = jwtDecode<Decode_Token>(storedToken);
        setUserID(decode_token.id);
        setToken(decode_token.loginName);
      } catch (error) {
        navigate("/");
        localStorage.removeItem("token");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin, location.pathname]);

  return (
    <AuthContext.Provider value={{ token, userID }}>{children}</AuthContext.Provider>
  );
};
