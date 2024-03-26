import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

const QuestionRoom = () => {
  // State to store the received question
  const [receivedQuestion, setReceivedQuestion] = useState(null);

  // State to store the score
  const [score, setScore] = useState(0);

  // State to manage the waiting state for new questions
  const [wait, setWait] = useState(false);

  // Function to handle submission of the selected option
  const handleSubmit = (selectedOption, startTime) => {
    // Check if an option is selected
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }

    // Check if the selected option is correct
    if (selectedOption.toLowerCase().trim() !== receivedQuestion.answer.toLowerCase().trim()) {
      // No score update for incorrect answer
      setWait(true);
      return;
    }

    // Calculate the time taken to answer the question
    const endTime = new Date();
    const overallTime = endTime - startTime;

    // Update the score based on the time taken
    let updatedScore = score;
    if (overallTime < 30000) {
      updatedScore += 100;
    } else if (overallTime < 20000) {
      updatedScore += 60;
    } else {
      updatedScore += 20;
    }

    // Update the score
    setScore(updatedScore);

    // Emit the updated score to the server
    socket.emit("updateScore", updatedScore);

    // Set the waiting state to true to wait for a new question
    setWait(true);
  };

  useEffect(() => {
    // Event listener to receive new questions

    socket.on("getcurruser")
    socket.on("getNewQuestion", (question) => {
      console.log(question)
      setReceivedQuestion(question);
      // Reset the waiting state when a new question is received
      setWait(false);
    });

    // Event listener to update the score received from the server
    socket.on("getScore", (updatedScore) => {
      // Update the score received from the server
      setScore(updatedScore);
    });

    // Clean up event listeners
    return () => {
      socket.off("getNewQuestion");
      socket.off("getScore");
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Conditional rendering based on the waiting state and received question */}
      {wait ? (
        <div className="text-center">
          <p className="font-bold">Please Wait For New Question</p>
        </div>
      ) : receivedQuestion ? (
        <QuestionCard data={receivedQuestion} handleSubmit={handleSubmit} />
      ) : (
        <div>Please Wait For Question</div>
      )}

      {/* Display the score */}
      <p className="font-bold">Score: {score}</p>
    </div>
  );
};

// QuestionCard component
const QuestionCard = ({ data, handleSubmit }) => {
  const { question, options } = data;
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = () => {
    handleSubmit(selectedOption, new Date());
  };

  return (
    <div className="border rounded-md p-4 shadow-md mb-4 max-w-3xl">
      <p className="font-bold mb-2">Question is:</p>
      <p>{question}</p>

      <p className="font-bold mt-4 mb-2">Options Are:</p>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
        SUBMIT ANSWER
      </button>
    </div>
  );
};

export default QuestionRoom;
