import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.module.scss";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
