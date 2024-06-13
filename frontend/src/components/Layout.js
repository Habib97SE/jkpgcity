import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SettingsController from "../controller/SettingsController";

function Layout() {





    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Layout;