import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (response) => {
    // Check if response is successful and contains data
    if (
      response &&
      response.success &&
      response.data &&
      response.data.length > 0
    ) {
      // Extract user ID and token from the response data
      const { user_id, token, profile_picture, username } = response.data[0];
      // Store user data in the state
      setUserData({ user_id, token, profile_picture, username });
      console.log(user_id);
    } else {
      console.error("Login failed: Invalid response format");
    }
  };

  const logout = async () => {
    // Clear user data upon logout

    // Call logout API
    try {
      if (userData && userData.user_id) {
        const response = await axios.get(
          `https://blushing-teal-clothes.cyclic.app/api/v1/user/logout/${userData.user_id}`,
          {
            // Include any headers if needed
          }
        );

        // Check if logout request was successful
        if (response.status === 200) {
          console.log("Logged out successfully");
          setUserData(null);
          console.log(userData.user_id);
        } else {
          console.error("Failed to logout:", response.statusText);
        }
      } else {
        console.error("User data is missing.");
      }
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
