import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

export const AirResistanceStimulation = (props) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  var width = props.width;
  var height = 500;

  const { gravity, frictionAir1, frictionAir2, frictionAir3, refresh } = props;

  useEffect(() => {
    let { Engine, Runner, Render, Composite, Bodies, Mouse, MouseConstraint } =
      Matter;

    let engine = Engine.create({});
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
      },
    });
    var world = engine.world;
    engine.gravity.scale = gravity;

    Composite.add(world, [
      // falling blocks
      Bodies.rectangle(width / 4, 100, 60, 60, { frictionAir: frictionAir1 }),
      Bodies.rectangle(width / 2, 100, 60, 60, { frictionAir: frictionAir2 }),
      Bodies.rectangle((3 * width) / 4, 100, 60, 60, {
        frictionAir: frictionAir3,
      }),

      // walls
      Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }),
      Bodies.rectangle(width / 2, 500, width, 50, {
        isStatic: true,
        render: { fillStyle: "grey" },
      }),
      Bodies.rectangle(width, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Runner.run(engine);
    Render.run(render);
    // setScene(render);

    return function cleanup() {
      Composite.clear(engine.world);
      Engine.clear(engine);
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [
    gravity,
    frictionAir1,
    frictionAir2,
    frictionAir3,
    height,
    width,
    refresh,
  ]);

  return (
    <div
      ref={boxRef}
      style={{
        width: { width },
        height: { height },
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
