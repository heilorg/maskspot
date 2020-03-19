import * as React from "react";
import ColorPoint from "./ColorPoint";

const colorBoxStyle: React.CSSProperties = {
    width: 160,
    height: 120,
    padding: 10,
    backgroundColor: "white",
    border: "2px solid #5d5d5d",
    borderRadius: 10,
    position: "fixed",
    right: 20,
    bottom: 20
};

const colorBoxItemStyle: React.CSSProperties = {
    width: "100%",
    height: "25%",
    display: "flex",
    alignItems: "center"
};

const ColorBox: React.FC = () => {
    return (
        <div style={colorBoxStyle}>
            <div style={colorBoxItemStyle}>
                <ColorPoint color="green" />
                100개 이상
            </div>
            <div style={colorBoxItemStyle}>
                <ColorPoint color="yellow" />
                30 ~ 99개
            </div>
            <div style={colorBoxItemStyle}>
                <ColorPoint color="red" />2 ~ 29개
            </div>
            <div style={colorBoxItemStyle}>
                <ColorPoint color="gray" />0 ~ 1개
            </div>
        </div>
    );
};

export default ColorBox;
