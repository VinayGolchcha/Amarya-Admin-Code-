import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
  const [user, setUser] = useState(() =>
    safeJSONParse(Cookies.get("app1_auth_token"), null)
  );
  const [profilePhoto, setProfilePhoto] = useState(() => {
    // Retrieve the profileUrl from localStorage when the component mounts
    return localStorage.getItem('profilePhoto') || '';
  });

  const [encryptionKey , setEncriptionKey] = useState(() => {
    return localStorage.getItem('encryptionKey') || '';
  });

  const [email, setEmail] = useState(() => {
    // setting the email for the ghost login
    return localStorage.getItem('email') || '';
  });
  const [password, setPassword] = useState(() => {
    // setting the password for the ghost login
    return localStorage.getItem('password') || '';
  });

  const [activeItem, setActiveItem] = useState("dashboard");

  useEffect(() => {
    if (user) {
      Cookies.set("app1_auth_token", JSON.stringify(user), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        expires: 7,
        path: '/',
      });
    } else {
      Cookies.remove("app1_auth_token");
    }
  }, [user]);

  const login = (userData , authKey) => {
    if (userData) {
      const { user_id, token, profile_picture, user_name, role } = userData;
      const userDetails = { user_id, token, profile_picture, user_name, role };
      setUser(userDetails);
      setProfilePhoto(userDetails?.profile_picture);
      setEncriptionKey(authKey);
      localStorage.setItem('profilePhoto', userDetails?.profile_picture);
      Cookies.set("app1_auth_token", JSON.stringify(userDetails), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        expires: 7,
        path: '/',
      });
    } else {
      console.error("Login failed: Invalid response format");
    }
  };

  const logout = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/logout/${user.user_id}`, {
          headers : {
            "x-encryption-key" : encryptionKey
          }
        }
      );

      if (response.status === 200) {
        setUser(null);
        localStorage.setItem('profilePhoto', '');
        Cookies.remove("app1_auth_token");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setProfilePhoto,
        profilePhoto,
        activeItem,
        setActiveItem,
        encryptionKey,
        email,
        password
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};