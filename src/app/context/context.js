'use client'
import {createContext,useContext, useState } from "react"
export const UserContext = createContext()
function UserProvider({children}) {
    const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{user,setUser}}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider

export function UserState(){return useContext(UserContext)}