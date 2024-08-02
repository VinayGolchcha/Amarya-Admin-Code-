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
  const [profilePhoto, setProfilePhoto] = useState("");
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

  const login = (userData) => {
    if (userData) {
      const { user_id, token, profile_picture, user_name, role } = userData;
      const userDetails = { user_id, token, profile_picture, user_name, role };
      setUser(userDetails);
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
        `https://amarya-admin-backend-code.onrender.com/api/v1/user/logout/${user.user_id}`
      );

      if (response.status === 200) {
        setUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie"; // Import js-cookie for handling cookies

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const safeJSONParse = (value, defaultValue) => {
//   try {
//     return value ? JSON.parse(value) : defaultValue;
//   } catch (e) {
//     console.error("Error parsing JSON:", e);
//     return defaultValue;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() =>
//     safeJSONParse(Cookies.get("app1_auth_token"), null)
//   );
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [activeItem, setActiveItem] = useState("Dashboard");

//   useEffect(() => {
//     Cookies.set("app1_auth_token", JSON.stringify(user), {
//       secure: true,
//       // sameSite: "strict",
//       sameSite: "lax", // Change this line
//     });
//   }, [user]);

//   const login = (userData) => {
//     if (userData) {
//       const { user_id, token, profile_picture, user_name, role } = userData;
//       const userDetails = { user_id, token, profile_picture, user_name, role };
//       setUser(userDetails);
//       Cookies.set("app1_auth_token", JSON.stringify(userDetails), {
//         secure: true,
//         sameSite: "strict",
//       });
//     } else {
//       console.error("Login failed: Invalid response format");
//     }
//   };

//   const logout = async () => {
//     if (!user) return;

//     try {
//       const response = await axios.get(
//         `https://amarya-admin-backend-code.onrender.com/api/v1/user/logout/${user.user_id}`
//       );

//       if (response.status === 200) {
//         setUser(null);
//         Cookies.remove("app1_auth_token");
//         console.log("Logout successful");
//       } else {
//         console.error("Failed to logout:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error occurred while logging out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         setProfilePhoto,
//         profilePhoto,
//         activeItem,
//         setActiveItem,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
