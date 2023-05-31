import {User} from "@/types";
import React, {useMemo, useState} from "react";
import {useQueryClient} from "react-query";

export interface AuthProps {
}


export interface IAuthContext {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    login: (auth: User) => void;
    logout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProps> = ({children}: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("")
    const queryClient = useQueryClient();
    const login = async (user: User) => {
        setUser(user);
        // await queryClient.resetQueries('articles')
        await queryClient.resetQueries(['user'])
    }
    const logout = async () => {
        await queryClient.resetQueries(['user'])
        setUser(null)
        setToken("")
        return Promise.resolve()
    }


    const authCtx = useMemo<IAuthContext>(():IAuthContext => ({
        user,
        token,
        setToken,
        login,
        logout,
    }), [user,token]);

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);