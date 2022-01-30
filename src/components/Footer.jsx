import React from "react";
import "./Footer.css";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p>
        Made with ❤ by <strong className="strongColor">Aadarsh Goyal</strong> |
        <a href="https://github.com/aadarsh-11/VPL">
          <IconButton aria-label="Take Me There ...">
            <GitHubIcon color="secondary" />
          </IconButton>
        </a>
      </p>
      <p></p>
    </div>
  );
};

export default Footer;
