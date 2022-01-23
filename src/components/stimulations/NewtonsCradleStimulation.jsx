import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const newtonsCradle = (
  xx,
  yy,
  number,
  size,
  length,
  cradleOptions,
  damping
) => {
  var Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies;

  var newtonsCradle = Composite.create({ label: "Newtons Cradle" });

  for (var i = 0; i < number; i++) {
    var separation = 1.9,
      circle = Bodies.circle(
        xx + i * (size * separation),
        yy + length,
        size,
        cradleOptions
      ),
      constraint = Constraint.create({
        pointA: { x: xx + i * (size * separation), y: yy },
        bodyB: circle,
      });

    constraint.damping = damping;
    Composite.addBody(newtonsCradle, circle);
    Composite.addConstraint(newtonsCradle, constraint);
  }

  return newtonsCradle;
};

export const NewtonsCradleStimulation = (props) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  var width = props.width;
  var height = props.height;

  const { gravity, frictionAir, restitution, nop, damping, refresh } = props;

  useEffect(() => {
    let { Engine, Runner, Render, Composite, Body, Mouse, MouseConstraint } =
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

    var cradleStart = (width - nop * 20 * 1.9) / 2;
    var cradleOptions = {
      inertia: Infinity,
      restitution: restitution,
      friction: 0,
      frictionAir: frictionAir,
      slop: 1,
    };
    var cradle = newtonsCradle(
      cradleStart,
      height / 4,
      nop,
      25,
      200,
      cradleOptions,
      damping
    );
    Composite.add(engine.world, cradle);
    Body.translate(cradle.bodies[0], { x: -200, y: -200 });
    engine.gravity.scale = gravity;

    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.05,
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
    Composite.add(engine.world, [mouseConstraint]);

    Runner.run(engine);
    Render.run(render);

    return function cleanup() {
      Composite.clear(engine.world);
      Engine.clear(engine);
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [gravity, frictionAir, nop, restitution, damping, height, width, refresh]);

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
