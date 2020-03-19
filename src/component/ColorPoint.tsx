import * as React from "react";

type colorProps = {
    color: string;
};

const ColotPoint: React.FC<colorProps> = ({ color }) => {
    const colorPointStyle: React.CSSProperties = {
        width: 30,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
    const colorPointItemStyle: React.CSSProperties = {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: color
    };
    return (
        <div style={colorPointStyle}>
            <div style={colorPointItemStyle}></div>
        </div>
    );
};

export default ColotPoint;
