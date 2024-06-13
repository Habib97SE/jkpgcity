import React from "react";
import NavItem from "./NavItem";
import ProfileItem from "./ProfileItem";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const iconStyle = {
    fontSize: "1.3rem",
    color: "#fff",
    marginRight: "2vw",
    cursor: "pointer"
}

function NavBar() {
    const menuItems = [
        { href: "/", text: "Home" },
        { href: "/venues", text: "Venues" },
        { href: "/news", text: "News" },
        { href: "/about", text: "About" },
        { href: "/contact", text: "Contact" },
    ];

    const handleSearchClick = () => {
        alert("Search is not implemented yet.");
    }

    const navItems = menuItems.map((item, index) => {
        return (
            <NavItem
                key={index}
                href={item.href}
                children={item.text}
            />
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ minHeight: "10vh" }}>
            <div className="container-fluid mx-5" style={{ marginRight: "2rem" }}>
                {/* Logo */}
                <a className="navbar-brand" href="/" style={{ fontSize: "1.5rem" }}>JKPG City.</a>

                {/* Navbar Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className="collapse navbar-collapse justify-content-center"
                    style={{ color: "#fff", fontSize: "1.2rem" }} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {navItems}
                    </ul>
                </div>



                <FaSearch style={iconStyle} onClick={handleSearchClick} /> {/* Search Icon */}
                <IoIosNotifications style={iconStyle} /> {/* Notifications Icon */}
                <ProfileItem />

            </div>
        </nav>
    );
}

export default NavBar;