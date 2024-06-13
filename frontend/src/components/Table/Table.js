import React from "react";

function Table({columns, data, tableClassName = "table-striped"}) {
    return (
        <table className={`table ${tableClassName}`}>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;