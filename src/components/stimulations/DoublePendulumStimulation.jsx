import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

export const DoublePendulumStimulation = (props) => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  // const [scene, setScene] = useState();
  var width = props.width;
  var height = 500;
  const { gravity, frictionAir, restitution, nop, damping, refresh } = props;

  useEffect(() => {
    let {
      Engine,
      Runner,
      Render,
      Composites,
      Composite,
      Constraint,
      Bodies,
      Body,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    let engine = Engine.create({});
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: width,
        height: height,
        // background: "rgba(255, 0, 0, 0.5)",
        wireframes: false,
      },
    });

    Render.run(render);

    var group = Body.nextGroup(true),
      plength = 200,
      pwidth = 25;

    for (var i = 0; i < nop; i++) {
      var pendulum = Composites.stack(
        width / 2,
        100,
        2,
        1,
        -20,
        0,
        function (x, y) {
          return Bodies.rectangle(x, y, plength, pwidth, {
            collisionFilter: { group: group, mask: 0 },
            frictionAir: frictionAir,
            chamfer: 5,
            render: {
              //   fillStyle: "transparent",
              lineWidth: 1,
            },
          });
        }
      );

      let circle = Bodies.circle(0, 0, 0.01);
      Body.setMass(circle, 0.0000000001);
      Composite.add(pendulum, circle);

      Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
        stiffness: 0.9,
        length: 0,
        angularStiffness: 0.7,
        render: {
          strokeStyle: "#4a485b",
        },
      });

      Composite.add(
        pendulum,
        Constraint.create({
          bodyB: pendulum.bodies[0],
          pointB: { x: -plength * 0.42, y: 0 },
          pointA: {
            x: pendulum.bodies[0].position.x - plength * 0.42,
            y: pendulum.bodies[0].position.y,
          },
          stiffness: 0.9,
          length: 0,
          render: {
            strokeStyle: "#4a485b",
          },
        })
      );

      var lowerArm = pendulum.bodies[1];

      Body.rotate(lowerArm, -Math.PI * 0.3, {
        x: lowerArm.position.x - Math.random() * 700,
        y: lowerArm.position.y,
      });

      Composite.add(engine.world, pendulum);

      let trail = [];

      Events.on(render, "afterRender", function () {
        trail.unshift({
          position: {
            x: circle.position.x,
            y: circle.position.y,
          },
          speed: circle.speed,
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var j = 0; j < trail.length; j += 1) {
          var point = trail[j].position,
            speed = trail[j].speed;

          var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
          render.context.fillStyle = "hsl(" + hue + ", 100%, 55%)";
          render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 2000) {
          trail.pop();
        }
      });

      //   alltrail.push(trail);

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
      render.mouse = mouse;
    }
    Runner.run(engine);
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
