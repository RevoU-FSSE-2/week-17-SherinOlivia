import { ReactNode, createContext, useState } from "react";

interface Profile {
    name: string;
    email: string;
}

interface Context {
    user?: Profile
    setUser?: React.Dispatch<React.SetStateAction<Profile | undefined>>
}

const defaultValue: Context = {
    user: undefined,
    setUser: undefined
}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext(defaultValue);


const AppProvider = ({children}: Props) => {
    const [user, setUser] = useState<Profile>();

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AppProvider