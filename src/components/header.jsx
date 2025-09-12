import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="screen-header">
      <img className="screen-logo"
        src={logo} 
        alt="SmartParking Logo" 
      />
    </header>
  );
}
