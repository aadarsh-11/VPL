import React, { Component } from "react";
import { NewtonsCradleStimulation } from "../stimulations/NewtonsCradleStimulation";
import DiscreteSlider from "./Slider";
import PageHeader from "./PageHeader";
import "./Page.css";
import Refresh from "./Refresh";
import Description from "./Description";
import { NEWTONS_CRADLE } from "./data";

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

class NewtonsCradle extends Component {
  state = {
    gravity: 0.001,
    friction: 0.001,
    nop: 5,
    damping: 0,
    restitution: 1,
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

  handleDamping = (e, d) => {
    this.setState({ damping: d / 10 });
  };

  handleRestitution = (e, r) => {
    this.setState({ restitution: r / 10 });
  };

  handleRefresh = () => {
    var refresh = 1 - this.state.refresh;
    this.setState({ refresh: refresh });
  };

  render() {
    return (
      <div className="pageContainer">
        <PageHeader title="Newtons Cradle" />
        <div className="stimulationContainer">
          <div className="left">
            <NewtonsCradleStimulation
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
              default={5}
              min={1}
              max={10}
              title="No: of pendulum"
              val={this.state.nop}
            />
            <DiscreteSlider
              handleChange={this.handleRestitution}
              default={10}
              min={0}
              max={20}
              title="Restitution"
              val={this.state.restitution}
            />
            <DiscreteSlider
              handleChange={this.handleDamping}
              default={0}
              min={0}
              max={10}
              title="Damping"
              val={this.state.damping}
            />
          </div>
        </div>
        <Description
          width={getWindowDimensions().width}
          height={(getWindowDimensions().width * 9) / 16}
          src="https://www.youtube.com/embed/DMRulHySH3c"
          data={NEWTONS_CRADLE}
        />
      </div>
    );
  }
}

export default NewtonsCradle;
