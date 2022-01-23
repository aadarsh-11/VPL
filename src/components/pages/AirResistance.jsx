import React, { Component } from "react";
import { AirResistanceStimulation } from "../stimulations/AirResistanceStimulation";
import DiscreteSlider from "./Slider";
import PageHeader from "./PageHeader";
import Refresh from "./Refresh";
import Description from "./Description";
import { AIR_RESISTANCE } from "./data";

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

class AirResistance extends Component {
  state = {
    gravity: 0.001,
    frictionAir1: 0.001,
    frictionAir2: 0.05,
    frictionAir3: 0.1,
    refresh: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleGravity = (e, g) => {
    this.setState({ gravity: g / 1000 });
  };

  handleAirFriction1 = (e, f1) => {
    this.setState({ frictionAir1: f1 / 1000 });
  };

  handleAirFriction2 = (e, f2) => {
    this.setState({ frictionAir2: f2 / 100 });
  };

  handleAirFriction3 = (e, f3) => {
    this.setState({ frictionAir3: f3 / 10 });
  };

  handleRefresh = () => {
    var refresh = 1 - this.state.refresh;
    this.setState({ refresh: refresh });
  };

  render() {
    return (
      <div className="pageContainer">
        <PageHeader title="Air Resistance" />
        <div className="stimulationContainer">
          <div className="left">
            <AirResistanceStimulation
              gravity={this.state.gravity}
              frictionAir1={this.state.frictionAir1}
              frictionAir2={this.state.frictionAir2}
              frictionAir3={this.state.frictionAir3}
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
              max={4}
              title="Gravity"
              val={this.state.gravity}
            />
            <DiscreteSlider
              handleChange={this.handleAirFriction1}
              default={1}
              min={0}
              max={10}
              title="Air Friction for A"
              val={this.state.frictionAir1}
            />
            <DiscreteSlider
              handleChange={this.handleAirFriction2}
              default={5}
              min={0}
              max={10}
              title="Air Friction for B (10x than A)"
              val={this.state.frictionAir2}
            />
            <DiscreteSlider
              handleChange={this.handleAirFriction3}
              default={1}
              min={0}
              max={10}
              title="Air Friction for C (10x than B)"
              val={this.state.frictionAir3}
            />
          </div>
        </div>
        <Description
          width={getWindowDimensions().width}
          height={(getWindowDimensions().width * 9) / 16}
          src="https://www.youtube.com/embed/Z0eJBtAnUxY"
          data={AIR_RESISTANCE}
        />
      </div>
    );
  }
}

export default AirResistance;
