import React, { useState } from "react";
import Helper from "../utils/Helper";
import {
    FaCog,
    FaEnvelope,
    FaGlobeAsia,
    FaHome,
    FaMapMarkedAlt,
    FaRegNewspaper,
    FaTachometerAlt,
    FaUsers
} from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NavItem = ({ key, href, children }) => {
    return (
        <li key={key} className="nav-item">
            <a className="nav-link active" aria-current="page" href={href}>{children}</a>
        </li>
    );
}


const Sidebar = () => {
    const sidebarItems = [
        { href: "/", icon: <FaHome />, text: "View site" },
        { href: "/admin", icon: <FaTachometerAlt />, text: "Dashboard" },
        { href: "/admin/venues", icon: <FaMapMarkedAlt />, text: "Venues" },
        { href: "/admin/news", icon: <FaRegNewspaper />, text: "News" },
        { href: "/admin/users", icon: <FaUsers />, text: "Users" },
        { href: "/admin/calendar", icon: <FaUsers />, text: "Calendar" },
        { href: "/admin/settings", icon: <FaCog />, text: "Settings" },
    ]

    const sidebarItemsList = sidebarItems.map((item, index) => {
        return (
            <li className="nav-item" key={index}>
                <a className="nav-link" href={item.href}>
                    {item.icon} {item.text}
                </a>
            </li>
        );
    });

    return (
        <nav className="col-md-3 d-md-block bg-light sidebar admin-sidebar">
            <div className="position-sticky">
                <ul className="nav flex-column text-center">
                    {sidebarItemsList}
                </ul>
            </div>
        </nav>
    );
};


const NotificationItem = ({ number }) => {
    return (
        <span style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
        }}>
            {number}
        </span>
    );
}

function AdminLayout({ children }) {
    const [unreadMessages, setUnreadMessages] = useState(true); // false means there are unread message that should be shown
    const [unreadNotifications, setUnreadNotifications] = useState(true); // false means there are unread notifications that should be shown
    const navItems = [
        { href: "/admin/profile", children: "Profile" },
    ]

    const navItemsList = navItems.map((item, index) => {
        return (
            <NavItem
                key={index}
                href={item.href}
                children={item.children}
            />
        );
    });

    const user = useSelector(state => state.user.userData);

    // handle the unread notifications, when a usr clicks on the item, then the notification should be disappeared
    const handleUnreadNotifications = () => {
        setUnreadNotifications(false);
    }

    const handleUnreadMessages = () => {
        setUnreadMessages(false);
    }

    return (
        <>
            <div className={""}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <nav className="navbar navbar-expand-lg bg-body-tertiary"
                            style={{
                                borderBottom: "1px solid #ccc",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                paddingRight: "5vw",
                            }}
                        >

                            <div className="container-fluid px-5">
                                <h1>Welcome Habib</h1>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">

                                    <ul className="navbar-nav ms-auto" style={{
                                        marginRight: "2vw",
                                    }}> {/* ms-auto will align the items to the right */}
                                        <li className={"nav-item dropdown"}>
                                            <a className={"nav-link dropdown-toggle"} href={"#"}
                                                id={"navbarDropdown"}
                                                role={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}>
                                                <div
                                                    style={{ position: 'relative' }}
                                                    onClick={handleUnreadNotifications}
                                                >
                                                    <FaGlobeAsia style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }} />
                                                    {unreadNotifications && <NotificationItem number={3} />}
                                                </div>
                                            </a>
                                            <div className={"dropdown-menu mx-3"}
                                                aria-labelledby={"navbarDropdown"}>
                                                <a className={"dropdown-item"} href={"/"}>Notification 1</a>
                                                <a className={"dropdown-item"} href={"/"}>Notification 2</a>
                                                <a className={"dropdown-item"} href={"/"}>Notification 3</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div
                                                    style={{ position: 'relative' }}
                                                    onClick={() => setUnreadMessages(false)}
                                                >
                                                    <FaEnvelope style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }} />
                                                    {unreadMessages && <NotificationItem number={2} />}
                                                </div>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li
                                                    style={{ padding: '10px' }}
                                                    className={"col-6"}
                                                ><a className="dropdown-item" href="/">View site</a></li>

                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#"
                                                id="navbarDropdownMenuLink"
                                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img
                                                    src={Helper.getAvatarUrl(user.firstName + " " + user.lastName)}
                                                    alt="Profile"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <span className={"mx-1"}>{user.firstName + " " + user.lastName}</span>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                                                <li><a className="dropdown-item" href="/settings">Settings</a></li>
                                                <li><a className="dropdown-item" href="/logout">Logout</a></li>

                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid my-2">
                <div className="row">
                    <Sidebar />

                    <div className="col-md-9 ms-sm-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-12"}>
                    <footer className={"bg-dark text-white text-center p-3"}>
                        <p>
                            &copy; {new Date().getFullYear()} Jönköping City. All rights reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    )
        ;
}

export default AdminLayout;