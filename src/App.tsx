import { Routes, Route, NavLink } from "react-router-dom";
import StudyPage from "./pages/StudyPage";
import QuizPage from "./pages/QuizPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      
      {/* HEADER */}
      <header className="header">
        <div>
          <div className="header-title">
            <span className="header-jp">日本語</span>
            Apprentissage du Japonais — Kana
          </div>

          <div className="header-subtitle">
            Hiragana & Katakana · Gojūon 五十音
          </div>
        </div>

        {/* Navbar ici  */}
        <nav className="nav">

          <NavLink
            to="/study"
            className={({ isActive }) =>
              `nav-btn ${isActive ? "active" : ""}`
            }
          >
            Étude
          </NavLink>

          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `nav-btn ${isActive ? "active" : ""}`
            }
          >
            Quiz
          </NavLink>

        </nav>
      </header>

      {/* Parite important study quiz  */}
      <main className="main">
          
        <Routes>

          <Route
            path="/study"
            element={<StudyPage />}
          />

          <Route
            path="/quiz"
            element={<QuizPage />}
          />

          {/* default route */}
          <Route
            path="*"
            element={<StudyPage />}
          />

        </Routes>

      </main>
    </div>
  );
}

export default App;