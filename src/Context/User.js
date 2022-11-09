const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):"");

  const values = {
    user,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
