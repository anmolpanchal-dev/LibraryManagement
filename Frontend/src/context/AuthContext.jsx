import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);


  // app start hote hi session restore
  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");


    if(savedToken && savedUser){

      setToken(savedToken);

      setUser(
        JSON.parse(savedUser)
      );

      setIsAuthenticated(true);

    }


    setLoading(false);

  }, []);



  const login = (
    userData,
    tokenData
  ) => {


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



  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        isAuthenticated,

        loading,

        login,

        logout,

        setUser,

        setToken,

        setIsAuthenticated

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};


export default AuthProvider;