import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/create-account/CreateAccount";
import Accounts from "./pages/accounts/Accounts";
import Users from "./pages/users/Users";
import MoneyAddRemove from "./pages/moneyAddRemove/MoneyAddRemove";
import UserEdit from "./pages/user-edit/EditUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="container">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
        {isLoggedIn && (
          <>
            <Route path="/users/create" element={<UserEdit />} />
            <Route path="/users/:id" element={<UserEdit />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/account" element={<Accounts />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/moneyAdd/:id"
              element={<MoneyAddRemove action="add" />}
            />
            <Route
              path="/moneyRemove/:id"
              element={<MoneyAddRemove action="remove" />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
