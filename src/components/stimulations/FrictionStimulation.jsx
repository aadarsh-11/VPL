import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

export const FrictionStimulation = (props) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  var width = props.width;
  var height = 500;

  const {
    gravity,
    frictionAir,
    Afriction,
    Bfriction,
    AfrictionS,
    BfrictionS,
    refresh,
  } = props;

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
      // walls
      Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }),
      Bodies.rectangle(width / 2, 500, width, 50, { isStatic: true }),
      Bodies.rectangle(width, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);
    var box = Bodies.rectangle(width / 3, 70, 40, 40, {
      friction: Afriction,
      frictionAir: frictionAir,
      frictionStatic: AfrictionS,
    });
    Composite.add(world, [
      Bodies.rectangle(100, 140, width, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: "silver" },
      }),
      box,
    ]);

    Composite.add(world, [
      Bodies.rectangle(100, 320, width, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: "silver" },
      }),
      Bodies.rectangle(width / 3, 250, 40, 40, {
        friction: Bfriction,
        frictionAir: frictionAir,
        frictionStatic: BfrictionS,
      }),
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
    frictionAir,
    Afriction,
    Bfriction,
    AfrictionS,
    BfrictionS,
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
