import React from "react";
import "./Button.css";

const Button = ({ text, clickfunction, disabled }) => {
  return (
    <button className="myBtn" onClick={clickfunction} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
