import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Header() {
  const history = useHistory();

  return (
    <header id="main-header" onClick={() => history.push("/")}>
      XGEN - DIGITAL EXPERIENCE
    </header>
  );
}
