import { useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import style from "./App.module.scss";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import AuthWindow from "./components/AuthWindow/AuthWindow";
import { useAuth } from "./contexts/AuthContext";
import AuthChecker from "./components/AuthChecker/AuthChecker";

function App() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { displayLogin } = useAuth();

    return (
        <section className={style.app} ref={scrollRef}>
            <Header />
            {displayLogin && <AuthWindow />}

            <Routes>
                <Route path="/" element={<Navigate to="/cats" />} />
                <Route
                    path="/cats"
                    element={<Gallery type={"all"} scrollRef={scrollRef} />}
                />
                <Route path="/likes" element={<AuthChecker scrollRef={scrollRef} />} />
            </Routes>
        </section>
    );
}

export default App;
