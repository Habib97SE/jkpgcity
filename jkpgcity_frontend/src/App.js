import React from "react";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
// pages for client side
import { Newsletter, Contact, About, Home, News, SingleNews, Login, Register, Venues, Profile, SingleVenue } from "./pages";
// pages for admin side
import {
    Dashboard, CalendarPage, ShowUsers, NewUser, EditUser, ShowVenues, NewVenue, EditVenue, NewVenueCategory,
    EditVenueCategory, ShowVenueCategories, NewsPage, NewNews, EditNews, ShowSettings
} from "./pages/admin";

import CookieBar from "./components/CookieBar/CookieBar";

import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="news" element={<News />} />
                    <Route path="news/:id" element={<SingleNews />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="venues" element={<Venues />} />
                    <Route path="venues/:id" element={<SingleVenue />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="newsletter" element={<Newsletter />} />
                </Route>
                {/* End of Client Routes */}

                {/* Admin Routes */}
                <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="calendar" element={<CalendarPage />} />
                        <Route path="users" element={<ShowUsers />} />
                        <Route path="users/new" element={<NewUser />} />
                        <Route path="users/:id" element={<EditUser />} />
                        <Route path="venues" element={<ShowVenues />} />
                        <Route path="venues/new" element={<NewVenue />} />
                        <Route path="venues/:id" element={<EditVenue />} />
                        <Route path="venues/categories/new" element={<NewVenueCategory />} />
                        <Route path="venues/categories/:id" element={<EditVenueCategory />} />
                        <Route path="venues/categories" element={<ShowVenueCategories />} />
                        <Route path="news" element={<NewsPage />} />
                        <Route path="news/new" element={<NewNews />} />
                        <Route path="news/:id" element={<EditNews />} />
                        <Route path="settings" element={<ShowSettings />} />
                    </Route>
                </Route>
                {/* End of Admin Routes */}

                {/* 404 page */}
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <CookieBar />
        </Router>
    );
}

export default App;
