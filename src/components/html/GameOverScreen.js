import { useState, useEffect } from "react";

import cubeRunLogo from "../../textures/cuberun-logo.png";

import "../../styles/gameMenu.css";

import { useStore } from "../../state/useStore";

const GameOverScreen = () => {
  const previousScores = localStorage.getItem("highscores")
    ? JSON.parse(localStorage.getItem("highscores"))
    : [...Array(3).fill(0)];
  const [shown, setShown] = useState(false);
  const [opaque, setOpaque] = useState(false);
  const [highScores, setHighscores] = useState(previousScores);

  const gameOver = useStore((s) => s.gameOver);
  const score = useStore((s) => s.score);

  useEffect(() => {
    let t;
    if (gameOver !== opaque) t = setTimeout(() => setOpaque(gameOver), 500);
    return () => clearTimeout(t);
  }, [gameOver, opaque]);

  useEffect(() => {
    if (gameOver) {
      setShown(true);
    } else {
      setShown(false);
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (window.ReactNativeWebView) {
        const message = { event: "end", score };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    }
  }, [gameOver, highScores, score]);

  return shown ? (
    <div
      className="game__container"
      style={{
        opacity: shown ? 1 : 0,
        background: opaque ? "#141622FF" : "#141622CC",
      }}
    >
      <div className="game__menu">
        <img
          className="game__logo-small"
          width="512px"
          src={cubeRunLogo}
          alt="Cuberun Logo"
        />
        <h1 className="game__score-gameover">GAME OVER</h1>
        <div className="game__scorecontainer">
          <div className="game__score-left">
            <h1 className="game__score-title">SCORE</h1>
            <h1 className="game__score">{score.toFixed(0)}</h1>
          </div>
        </div>
        <h1 className="game__score-gameover-small">You'll be redirected to app in a bit</h1>
      </div>
    </div>
  ) : null;
};

export default GameOverScreen;
