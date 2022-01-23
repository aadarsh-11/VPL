import React, { Component } from "react";
import { FrictionStimulation } from "../stimulations/FrictionStimulation";
import DiscreteSlider from "./Slider";
import PageHeader from "./PageHeader";
import "./Page.css";
import Refresh from "./Refresh";
import Description from "./Description";
import { FRICTION } from "./data";

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

class Friction extends Component {
  state = {
    gravity: 0.001,
    friction: 0.001,
    Afriction: 0.001,
    Bfriction: 0.002,
    AfrictionS: 60,
    BfrictionS: 0,
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

  handleAFriction = (e, fa) => {
    this.setState({ Afriction: fa / 1000 });
  };

  handleBFriction = (e, fb) => {
    this.setState({ Bfriction: fb / 1000 });
  };

  handleAFrictionS = (e, fas) => {
    this.setState({ AfrictionS: fas * 30 });
  };

  handleBFrictionS = (e, fbs) => {
    this.setState({ BfrictionS: fbs * 30 });
  };

  handleRefresh = () => {
    var refresh = 1 - this.state.refresh;
    this.setState({ refresh: refresh });
  };

  render() {
    return (
      <div className="pageContainer">
        <PageHeader title="Friction" />
        <div className="stimulationContainer">
          <div className="left">
            <FrictionStimulation
              gravity={this.state.gravity}
              frictionAir={this.state.friction}
              Afriction={this.state.Afriction}
              Bfriction={this.state.Bfriction}
              AfrictionS={this.state.AfrictionS}
              BfrictionS={this.state.BfrictionS}
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
              handleChange={this.handleAirFriction}
              default={0}
              min={0}
              max={10}
              title="Air Friction"
              val={this.state.friction}
            />
            <DiscreteSlider
              handleChange={this.handleAFriction}
              default={1}
              min={0}
              max={10}
              title="Friction for body A"
              val={this.state.Afriction}
            />
            <DiscreteSlider
              handleChange={this.handleBFriction}
              default={2}
              min={0}
              max={10}
              title="Friction for body B"
              val={this.state.Bfriction}
            />
            <DiscreteSlider
              handleChange={this.handleAFrictionS}
              default={2}
              min={0}
              max={10}
              title="Static Friction for body A"
              val={this.state.AfrictionS}
            />
            <DiscreteSlider
              handleChange={this.handleBFrictionS}
              default={0}
              min={0}
              max={10}
              title="Static Friction for body B"
              val={this.state.BfrictionS}
            />
          </div>
        </div>
        <Description
          width={getWindowDimensions().width}
          height={(getWindowDimensions().width * 9) / 16}
          src="https://www.youtube.com/embed/n2gQs1mcZHA"
          data={FRICTION}
        />
      </div>
    );
  }
}

export default Friction;
