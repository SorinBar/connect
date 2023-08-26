import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextData {
    _id: string | null;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextData>({
    _id: null,
    token: null,
    setToken: () => {},
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    const contextValue: AuthContextData = {
        _id: null,
        token,
        setToken,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    return useContext(AuthContext);
}
