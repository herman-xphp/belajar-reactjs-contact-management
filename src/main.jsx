import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./components/Home/Home";
import Layout from "./components/Layouts/Layout";
import UserLogin from "./components/Users/UserLogin";
import UserLogout from "./components/Users/UserLogout";
import UserProfile from "./components/Users/UserProfile";
import UserRegister from "./components/Users/UserRegister";
import ContactList from "./components/Contacts/ContactList";
import ContactEdit from "./components/Contacts/ContactEdit";
import AddressEdit from "./components/Addresses/AddressEdit";
import ContactCreate from "./components/Contacts/ContactCreate";
import ContactDetail from "./components/Contacts/ContactDetail";
import AddressCreate from "./components/Addresses/AddressCreate";
import DashboardLayout from "./components/Layouts/DashboardLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
            <Route path=":id">
              <Route index element={<ContactDetail />} />
              <Route path="edit" element={<ContactEdit />} />

              <Route path="addresses">
                <Route path="create" element={<AddressCreate />} />
                <Route path=":addressId/edit" element={<AddressEdit />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
