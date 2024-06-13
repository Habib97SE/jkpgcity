import React from "react";

function NavItem({href, children})
{
    return (
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href={href}>{children}</a>
        </li>
    );
}

export default NavItem;