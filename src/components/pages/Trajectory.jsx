import React, { Component } from "react";
import { TrajectoryStimulation } from "../stimulations/TrajectoryStimulation";
import DiscreteSlider from "./Slider";
import PageHeader from "./PageHeader";
import "./Page.css";
import Refresh from "./Refresh";
import Description from "./Description";
import { PROJECTILE_MOTION } from "./data";

function getWindowDimensions() {
  var { innerWidth: width, innerHeight: height } = window;
  if (width > 600) width = (width / 12) * 7;
  else {
    width = (9 * width) / 10;
  }
  return {
    width,
    height,
  };
}

class Trajectory extends Component {
  state = { gravity: 0.001, frictionAir: 0, refresh: 0 };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleGravity = (e, g) => {
    this.setState({ gravity: g / 1000 });
  };

  handleFrictionAir = (e, f) => {
    this.setState({ frictionAir: f / 100 });
  };

  handleRefresh = () => {
    var refresh = 1 - this.state.refresh;
    this.setState({ refresh: refresh });
  };

  render() {
    return (
      <div className="pageContainer">
        <PageHeader title="Projectile Motion" />
        <div className="stimulationContainer">
          <div className="left">
            <TrajectoryStimulation
              gravity={this.state.gravity}
              frictionAir={this.state.frictionAir}
              width={getWindowDimensions().width}
              height={500}
              refresh={this.state.refresh}
            />
          </div>
          <div className="refresh">
            <Refresh handleRefresh={this.handleRefresh} />
          </div>
          <div className="right">
            <DiscreteSlider
              handleChange={this.handleGravity}
              default={1}
              min={0}
              max={9}
              title="Gravity"
              val={this.state.gravity}
            />
            <DiscreteSlider
              handleChange={this.handleFrictionAir}
              default={0}
              min={0}
              max={9}
              title="Air Friction"
              val={this.state.frictionAir}
            />
          </div>
        </div>
        <Description
          width={getWindowDimensions().width}
          height={(getWindowDimensions().width * 9) / 16}
          src="https://www.youtube.com/embed/Cuj_o-JMpdo"
          data={PROJECTILE_MOTION}
        />
      </div>
    );
  }
}

export default Trajectory;
