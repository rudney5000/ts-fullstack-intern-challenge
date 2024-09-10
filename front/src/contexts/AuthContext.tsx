import {
    createContext,
    useState,
    ReactNode,
    useContext,
    useEffect,
} from "react";
import { createUser, getUser } from "../api/userApi";
import UserType from "../types/UserType";
import { UserResponse } from "../types/Response";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: UserType | null;
    displayLogin: boolean;
    isAuthorized: boolean;
    onLogin: (login: string, password: string) => Promise<UserResponse>;
    onLogout: () => void;
    setDisplayLogin: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [displayLogin, setDisplayLogin] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(
        !!localStorage.getItem("auth_token")
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserExists() {
            const { user, error }: UserResponse = await getUser();
            error && onLogout();

            if (user) {
                setUser(user);
                setIsAuthorized(true);
            }
        }

        checkUserExists();
    }, []);

    async function onLogin(
        login: string,
        password: string
    ): Promise<UserResponse> {
        const response: UserResponse = await createUser(login, password);
        if (response.user) {
            setUser(user);
            setIsAuthorized(true);
        }
        return response;
    }

    function onLogout() {
        setUser(null);
        setIsAuthorized(false);
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_token");
        navigate("/");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                displayLogin,
                isAuthorized,
                onLogin,
                onLogout,
                setDisplayLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth должен использоваться в AuthProvider");
    }
    return context;
};

