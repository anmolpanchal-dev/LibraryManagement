import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );


  const login = (userData, tokenData) => {

    localStorage.setItem(
      "token",
      tokenData
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
  };


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };


  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    const savedToken =
      localStorage.getItem("token");


    if(savedUser && savedToken){
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setIsAuthenticated(true);
    }

  }, []);



  return (

    <AuthContext.Provider

      value={{
        user,
        setUser,

        token,
        setToken,

        isAuthenticated,
        setIsAuthenticated,

        login,
        logout
      }}

    >

      {children}

    </AuthContext.Provider>

  );
};


export default AuthProvider;