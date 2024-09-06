import React from "react";
import { loadFull } from "tsparticles";
import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
const LoginBg = ({ children }) => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      //await loadBasic(engine);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: true },
      background: {
        image:
          "linear-gradient(to bottom, #121e27, #101c24, #0f1a22, #0d171f, #0a151d, #0b141b, #0b121a, #0b1118, #0e1016, #0f1014, #101012, #101010)",
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#2D3B6D", "#2D3B6D", "#2D3B6D"],
          gradient: {
            angle: 45,
            type: "linear",
          },
        },
        links: {
          color: {
            value: ["#2D3B6D", "#2D3B6D", "#2D3B6D"],
            gradient: {
              angle: 45,
              type: "linear",
            },
          },
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      {children}
    </>
  );
};

export default LoginBg;
