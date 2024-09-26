import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const safeJSONParse = (value, defaultValue) => {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeJSONParse(localStorage.getItem("user"), null));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    if (userData) {
      const { user_id, token, profile_picture, user_name , role } = userData;
      const userDetails = { user_id, token, profile_picture, user_name , role};
      setUser(userDetails);
      localStorage.setItem("user", JSON.stringify(userDetails));
    } else {
      console.error("Login failed: Invalid response format");
    }
  };

  const logout = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `https://amarya-admin-backend-code.onrender.com/api/v1/user/logout/${user.user_id}`
      );

      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        console.log("Logout successful");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
