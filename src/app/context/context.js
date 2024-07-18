'use client'
import { createContext, useContext, useState } from "react";

// Create a context to manage user-related states
export const UserContext = createContext();

// UserProvider component manages state related to user information
function UserProvider({ children }) {
    // State variables to manage user, info, and userinfo
    const [user, setUser] = useState(null); // Manages current user data
    const [info, setInfo] = useState(null); // Manages additional information related to user
    const [userinfo, setuserinfo] = useState(null); // Manages user information details

    return (
        <UserContext.Provider value={{ user, setUser, info, setInfo, userinfo, setuserinfo }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to access the user context
export function UserState() {
    return useContext(UserContext);
}

export default UserProvider;
