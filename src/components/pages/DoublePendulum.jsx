import React, { Component } from "react";
import { DoublePendulumStimulation } from "../stimulations/DoublePendulumStimulation";
import DiscreteSlider from "./Slider";
import PageHeader from "./PageHeader";
import "./Page.css";
import Refresh from "./Refresh";
import Description from "./Description";
import { DOUBLE_PENDULUM } from "./data";

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

class DoublePendulum extends Component {
  state = {
    gravity: 0.001,
    friction: 0.001,
    nop: 1,
    refresh: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleGravity = (e, g) => {
    this.setState({ gravity: g / 1000 });
  };

  handleAirFriction = (e, f) => {
    this.setState({ friction: f / 1000 });
  };

  handleNop = (e, n) => {
    this.setState({ nop: n });
  };

  handleRefresh = () => {
    var refresh = 1 - this.state.refresh;
    this.setState({ refresh: refresh });
  };

  render() {
    return (
      <div className="pageContainer">
        <PageHeader title="Double Pendulum" />
        <div className="stimulationContainer">
          <div className="left">
            <DoublePendulumStimulation
              gravity={this.state.gravity}
              frictionAir={this.state.friction}
              nop={this.state.nop}
              damping={this.state.damping}
              restitution={this.state.restitution}
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
              handleChange={this.handleAirFriction}
              default={0}
              min={0}
              max={10}
              title="Air Friction"
              val={this.state.friction}
            />
            <DiscreteSlider
              handleChange={this.handleNop}
              default={1}
              min={0}
              max={5}
              title="No: of pendulum"
              val={this.state.nop}
            />
          </div>
        </div>
        <Description
          width={getWindowDimensions().width}
          height={(getWindowDimensions().width * 9) / 16}
          src="https://www.youtube.com/embed/4xViPStT5II"
          data={DOUBLE_PENDULUM}
        />
      </div>
    );
  }
}

export default DoublePendulum;
