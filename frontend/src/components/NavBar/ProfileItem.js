import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Helper from "../../utils/Helper";
import { logoutUser } from "../../utils/userSlice";
import { persistor } from "../../store"; // Import persistor

function ProfileItem() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    let userAvatar = ""

    if (user.isAuthenticated) {
        userAvatar = Helper.getAvatarUrl(user.userData.firstName + " " + user.userData.lastName)
    } else {
        userAvatar = Helper.getAvatarUrl("Guest")
    }


    const handleLogoutClick = () => {
        dispatch(logoutUser());
        persistor.purge(); // Clear persisted state on logout
        // remove access_token cookie
        document.cookie = "access_token" + '=; Max-Age=0';
        window.location.href = "/";
    }



    return (
        <li className="nav-item dropdown" style={{ listStyle: "none" }}>
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img
                    src={userAvatar}
                    alt="Profile"
                    style={{
                        width: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "2vw",
                        cursor: "pointer"
                    }}
                />
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {user.isAuthenticated ? (
                    <>
                        <li className="dropdown-item fw-bold">Welcome {user.userData.firstName}</li>
                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogoutClick} >Logout</a></li>
                    </>
                ) : (
                    <>
                        <li><a className="dropdown-item" href="/login">Login</a></li>
                        <li><a className="dropdown-item" href="/register">Register</a></li>
                    </>
                )}
            </ul>
        </li>
    );
}

export default ProfileItem;
