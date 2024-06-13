import React from "react";

function Sidebar({items}) {
    const listItems = items.map((item, index) =>
        <a href={item.url} className={"list-group-item list-group-item-action"} key={index}>{item.title}</a>
    );
    return (
        <div className={"list-group"}>
            {listItems}
        </div>
    );
}

export default Sidebar;