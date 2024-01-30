import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Scoreboard from "./components/Scoreboard";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  // guess is the current letter a user has guessed.
  const [guess, setGuess] = useState("");

  // Track no. of guesses
  const [remainingTries, setRemainingTries] = useState(10);

  // Track game phases: 'playing', 'win', 'lose'
  const [gameState, setGameState] = useState("playing");

  // Track game score (current score, total rounds)
  const [gameScore, setGameScore] = useState([0, 0]);

  // Autofocus on text box on initial load
  const inputRef = useRef();

  useEffect(() => {
     if (gameState === "playing") {
       inputRef.current.focus();
     }
  }, [gameState]);

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("___ ");
      }
    }
    return wordDisplay.toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear text box
    setGuess("");
    // Check if text field is empty
    if (guess === "") {
      alert("Please enter a letter!");
      return;
    }
    // Check if letter has already been guessed
    if (guessedLetters.includes(guess)) {
      alert("You have already guessed this letter!");
      return;
    }

    // Autofocus on text box
    document.getElementById("guessBox").focus();

    // State setters are not immediate, so we need to store the array of guessed letters in a variable first to access the updated array immediately.
    // Add the current guess to the guessedLetters array
    const nextLetters = [...guessedLetters, guess];
    setGuessedLetters(nextLetters);

    // Minus 1 try from tries starting from 10
    // State setters are not immediate, so we need to store the value in a variable first to access the updated try count immediately. Contrast with setRemainingTries((prevRemainingTries)=>prevRemainingTries-1)
    const nextTries = remainingTries - 1;

    // Check if player won or lost (check win conditions and check if any tries left)
    if (checkWin(nextLetters)) {
      setGameState("win");
      confetti();
      setGameScore([gameScore[0] + 1, gameScore[1] + 1]);
    }

    if (nextTries === 0 && !checkWin(nextLetters)) {
      setRemainingTries(nextTries);
      setGameState("lose");
      setGameScore([gameScore[0], gameScore[1] + 1]);
    } else {
      setRemainingTries(nextTries);
    }
  };

  const handleRestart = () => {
    setGameState("playing");
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setRemainingTries(10);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Pass the nextLetters array AND NOT THE GUESSEDLETTERS ARRAY to check if all letters in the word have been guessed
  const checkWin = (checkedLetters) => {
    for (const letter of currWord) {
      if (!checkedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  const displayHeading = () => {
    if (gameState === "playing") {
      return <h1>Guess The Word</h1>;
    }
    if (gameState === "win") {
      return <h1>You guessed the word!</h1>;
    }
    if (gameState === "lose") {
      return (
        <h1>
          You lost... the word is{" "}
          <span style={{ color: "yellow" }}>{currWord}</span>. Try again!
        </h1>
      );
    }
  };

  return (
    <>
      <div className="card">
        {displayHeading()}
        <Scoreboard wins={gameScore[0]} roundsPlayed={gameScore[1]} />
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <br />
        <br />
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <br />
        <div style={{backgroundColor: '#3f3f3f', width: '80%', margin: '0 auto', height:'2px'}}>{''}</div>
        <h3>Input</h3>
        <p>Tries remaining: {remainingTries}</p>

        {/* Add form that has controlled text input tied to guess state (store current letter guess) */}
        {gameState === "playing" && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="guessBox">
              Guess a letter : {"   "}
              <input
                type="text"
                ref={inputRef}
                id="guessBox"
                value={guess}
                // Regex to only allow one letter
                pattern="[A-za-z]"
                title="Enter a single letter"
                onChange={(e) => {
                  setGuess(e.target.value.toLowerCase());
                }}
              />
            </label>
            {gameState === "playing" && (
              <button type="submit" style={{ marginLeft: "1rem" }}>
                Submit letter
              </button>
            )}
          </form>
        )}
        {gameState !== "playing" && (
          <button onClick={handleRestart} style={{ marginTop: "1rem" }}>
            Restart the round
          </button>
        )}
      </div>
    </>
  );
}

export default App;
