import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <strong className="strongColor">{props.title}</strong>
      {" = " + props.val}
      <Slider
        defaultValue={props.default}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={props.min}
        max={props.max}
        onChangeCommitted={props.handleChange}
      />
    </div>
  );
}
