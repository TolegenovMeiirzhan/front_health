import './App.css';
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './i18n';
import WelcomePage from "./Pages/WelcomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import axios from 'axios'
import MainPage from "./Pages/MainPage";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user:user, setUser: setUser}}>
        <Routes>
          <Route path='/welcome' element={<WelcomePage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/' element={<MainPage/>}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
