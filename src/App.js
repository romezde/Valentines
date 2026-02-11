import { useState, useRef } from "react";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [shake, setShake] = useState(false);

  const noTexts = [
    "No 😢",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Please reconsider?",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const yesScale = 1 + noCount * 0.2;

const handleYesClick = () => {
  setYesClicked(true);

  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left side
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2
      },
      colors: ["#ff4d6d", "#ff69b4", "#ffc0cb", "#ffe4e1"]
    });

    // Right side
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2
      },
      colors: ["#ff4d6d", "#ff69b4", "#ffc0cb", "#ffe4e1"]
    });

  }, 250);
};



  const handleNoClick = () => {
    if (noCount < noTexts.length - 1) {
      setNoCount(noCount + 1);

      setShake(true);
      setTimeout(() => setShake(false), 400); // duration matches CSS
    }
  };


  if (yesClicked) {
    return (
      <div className="container">
        <h1>I love you so much!!! 💘🌹</h1>
        <p>You made me the happiest person 💕</p>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Rose, Will you be my Valentine? 💖</h1>

      <div className="buttons">
        <button
          onClick={handleYesClick}
          className="yes"
          style={{
            transform: `scale(${yesScale})`,
            transition: "0.3s ease"
          }}
        >
          Yes 💕
        </button>

        <button
          onClick={handleNoClick}
          className={`no ${shake ? "shake" : ""}`}
          disabled={noCount >= noTexts.length - 1}
          style={{
            opacity: noCount >= noTexts.length - 1 ? 0.5 : 1,
            cursor: noCount >= noTexts.length - 1 ? "not-allowed" : "pointer"
          }}
        >
          {noTexts[noCount]}
        </button>
      </div>
      
      {noCount >= 4 && (
        <p className="hint">
          💡 Hint: The "Yes" button is getting bigger for a reason…
        </p>
      )}
      {noCount >= 8 && (
        <p className="hint">
          💡 Hint: Are you this heartless??
        </p>
      )}
      {noCount >= 12 && (
        <p className="hint">
          💡 Hint: Please Click "Yes"!!!
        </p>
      )}
      {noCount >= 15 && (
        <p className="hint">
          💡 Hint: Now you can only click "Yes" 😘
        </p>
      )}
    </div>
  );
}

export default App;
