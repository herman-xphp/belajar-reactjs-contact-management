import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/Users/UserRegister";
import UserLogin from "./components/Users/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserProfile from "./components/Users/UserProfile";
import UserLogout from "./components/Users/UserLogout";
import ContactCreate from "./components/Contact/ContactCreate";
import ContactList from "./components/Contact/ContactList";
import ContactEdit from "./components/Contact/ContactEdit";
import ContactDetail from "./components/Contact/ContactDetail";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactCreate />} />
            <Route path=":id" element={<ContactDetail />} />
            <Route path=":id/edit" element={<ContactEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
