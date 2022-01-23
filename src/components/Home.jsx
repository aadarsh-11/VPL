import React, { Component } from "react";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import frictionImg from "../images/friction.png";
import DoublePendulumImg from "../images/doublependulum.png";
import NewtonsCradleImg from "../images/newtonscradle.png";
import TrajectoryImg from "../images/trajectory.png";
import AirResistance from "../images/airresistance.png";
import StimulationCard from "./StimulationCard";
import Header from "./Header";

class Home extends Component {
  render() {
    return (
      <>
        <div className="Home">
          <Header />
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
          >
            <StimulationCard
              image={frictionImg}
              modal="Friction"
              path="/friction"
            />
            <StimulationCard
              image={DoublePendulumImg}
              modal="Double Pendulum"
              path="/doublependulum"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
          >
            <StimulationCard
              image={NewtonsCradleImg}
              modal="Newtons Cradle"
              path="/newtonscradle"
            />
            <StimulationCard
              image={TrajectoryImg}
              modal="Projectile Motion"
              path="/trajectory"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
          >
            <StimulationCard
              image={AirResistance}
              modal="Air Resistance"
              path="/airresistance"
            />
          </Grid>
        </div>
      </>
    );
  }
}

export default Home;
