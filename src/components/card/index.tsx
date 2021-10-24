import React from "react";
import "./index.scss";

const Card = ({ children, className }: any) => {
    return (
        <div className={`card ${className}`}>{children}</div>
    );
};

export default Card;
