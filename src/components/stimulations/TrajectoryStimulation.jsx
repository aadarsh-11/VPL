import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

export const TrajectoryStimulation = (props) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  var width = props.width;
  var height = 500;

  const { gravity, frictionAir, refresh } = props;

  useEffect(() => {
    let { Engine, Runner, Render, Composite, Vector, Mouse, MouseConstraint } =
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

    const ballPosition = Vector.create(width / 4, (3 * height) / 4);
    const ballOptions = {
      frictionAir: frictionAir,
    };

    var ball = Matter.Bodies.circle(
      ballPosition.x,
      ballPosition.y,
      10,
      ballOptions
    );
    let firing = false;

    var firedball = Matter.Bodies.circle(
      ballPosition.x,
      ballPosition.y,
      0,
      ballOptions
    );

    var sling = Matter.Constraint.create({
      pointA: { x: ballPosition.x, y: ballPosition.y },
      bodyB: ball,
      stiffness: 0.01,
      render: {
        type: "line",
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

    Composite.add(engine.world, [sling, ball, mouseConstraint]);

    var trail = [];

    Matter.Events.on(render, "afterRender", function () {
      trail.unshift({
        position: Vector.clone(firedball.position),
        speed: firedball.speed,
      });

      Render.startViewTransform(render);
      render.context.globalAlpha = 0.7;

      for (var i = 0; i < trail.length; i += 1) {
        var point = trail[i].position,
          speed = trail[i].speed;

        var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
        render.context.fillStyle = "hsl(" + hue + ", 100%, 55%)";
        render.context.fillRect(point.x, point.y, 2, 2);
      }

      render.context.globalAlpha = 1;
      Render.endViewTransform(render);

      if (trail.length > 1000) {
        trail.pop();
      }
    });

    Matter.Events.on(mouseConstraint, "enddrag", function (e) {
      if (e.body === ball) firing = true;
    });

    Matter.Events.on(engine, "afterUpdate", function () {
      if (
        firing &&
        Math.abs(ball.position.x - ballPosition.x) < 20 &&
        Math.abs(ball.position.y - ballPosition.y) < 20
      ) {
        firedball = ball;
        firing = false;

        ball = Matter.Bodies.circle(
          ballPosition.x,
          ballPosition.y,
          10,
          ballOptions
        );
        sling.bodyB = ball;

        setTimeout(() => {
          Composite.add(engine.world, ball);
        }, 300);
      }
    });

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
  }, [gravity, frictionAir, height, width, refresh]);

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
