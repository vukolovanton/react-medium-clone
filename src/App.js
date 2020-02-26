import React from "react";
import Routes from "./pages/routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";
import CurrentUserChecker from './components/currentUserChecker';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <TopBar></TopBar>
            <Routes />
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
