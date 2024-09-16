/*
export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      y: 0,
      x: 0,

      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

*/

export const fadeIn = (direction = "up", delay = 0) => {
  let x = 0;
  let y = 0;

  // Adjust initial position based on direction
  if (direction === "left") {
    x = -100; // Start off-screen to the left
  } else if (direction === "right") {
    x = 100; // Start off-screen to the right
  } else if (direction === "up") {
    y = 20; // Start slightly below
  } else if (direction === "down") {
    y = -20; // Start slightly above
  }

  return {
    hidden: {
      opacity: 0,
      x: x,
      y: y,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        ease: "easeOut", // Smooth animation
      },
    },
  };
};
