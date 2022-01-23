import React from "react";
import "./Page.css";

const Description = (props) => {
  return (
    <div className="pageHeader">
      <h1 className="strongColor pageh1">Some Useful References</h1>
      <div className="data">
        <p style={{ textAlign: "left", padding: "0 20px" }}>{props.data}</p>
        <p className="strongColor">
          Please watch the video below to have a more thorough understanging of
          the topic. Happy Learning!
        </p>
      </div>
      <iframe
        width={props.width}
        height={props.height}
        src={props.src}
        title="YouTube video player"
        frameborder="10"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Description;
