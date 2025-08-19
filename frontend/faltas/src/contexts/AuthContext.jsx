import React,
{
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Falha ao analisar dados do usuário no localStorage", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = useCallback((userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user, login, logout]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);