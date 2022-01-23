import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import React from "react";

const PageHeader = (props) => {
  return (
    <div className="pageHeader">
      <div className="backButton ">
        <Link className="noDecoration" to="/#allStimulations">
          <IconButton color="primary">
            <ArrowBackIosIcon />
            Back
          </IconButton>
        </Link>
      </div>
      <h1 className="strongColor pageh1">{props.title}</h1>
    </div>
  );
};

export default PageHeader;
