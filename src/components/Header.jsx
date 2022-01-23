import React from "react";
import Button from "@material-ui/core/Button";
import { NewtonsCradleStimulation } from "./stimulations/NewtonsCradleStimulation";
import "./Header.css";
import { Link } from "react-router-dom";
import Svg from "../images/logo.svg";

const Header = () => {
  return (
    <div className="header">
      <h1>
        Learn your Physics with
        <br />
        <div className="subhead">
          <img className="logo" src={Svg} alt="logo" />
          <strong className="strongColor">Virtual Physics Lab!</strong>
        </div>
      </h1>
      <h6>
        Learn Physics by Visualizing - the easiest, fastest and the <br /> most
        retainable way to learn.
      </h6>
      <div className="btn-container">
        <div className="btn-container2">
          <Link className="noDecoration" to="/newtonscradle">
            <Button className="home-btn" variant="contained" color="primary">
              Try Now
            </Button>
          </Link>
        </div>
        <div className="btn-container2">
          <Button
            href="#allStimulations"
            className="home-btn"
            variant="contained"
            color="secondary"
          >
            View all
          </Button>
        </div>
      </div>
      <NewtonsCradleStimulation
        gravity={0.002}
        frictionAir={0.001}
        nop={window.innerWidth / 300}
        damping={0}
        restitution={1}
        height={400}
        width={(window.innerWidth / 4) * 3}
      />
      <h1 id="allStimulations">
        <strong className="strongColor">All Simulations</strong>
      </h1>
    </div>
  );
};

export default Header;
