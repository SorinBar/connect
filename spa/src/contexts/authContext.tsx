import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextData {
    id: string | null;
    token: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextData>({
    id: null,
    token: null,
    setId: () => {},
    setToken: () => {},
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    const contextValue: AuthContextData = {
        id,
        token,
        setId,
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
