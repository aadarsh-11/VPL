import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import NearMeIcon from "@material-ui/icons/NearMe";
import "./StimulationCard.css";
import { Link } from "react-router-dom";

export default function StimulationCard(props) {
  return (
    <Grid item sm={12} md={6} lg={6}>
      <Grid container justify="center">
        <div className="container">
          <Link to={props.path}>
            <img
              className="image"
              src={props.image}
              alt={props.modal + " Image"}
              height="230px"
              width="auto"
            />
            <div className="overlay">
              <div className="text">{props.modal}</div>
              <IconButton
                className="btn noDecoration"
                aria-label="Take Me There ..."
              >
                <NearMeIcon color="primary" />
              </IconButton>
            </div>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
