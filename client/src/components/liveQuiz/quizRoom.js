import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestion } from "../../slices/questioSlice";
// import { updateLiveUserCount } from "../../slices/roomSlice";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

const QuizRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);

  // const liveUserCount = useSelector((state)=>state.room.liveUserCount) || 0;
  const [liveUser,setLiveUser]=useState(0);

  const [liveScores, setLiveScores] = useState([]);

  useEffect(() => {
    console.log("inside useeffect");
    // Listen for 'liveScores' event from socket
    socket.emit("getcurruser",roomId);
    socket.on("currUserCount",(length)=>{
      console.log("length is->",length)
      setLiveUser(length)
    })
    
    socket.on("liveScores", (scoresInRoom) => {
      // have to handle this some way
      console.log("scores are->",scoresInRoom);
      setLiveScores(scoresInRoom);
    });

    console.log("baxjbaxhbxa");
    

    // Clean up the event listener
    return () => {
      socket.off("liveScores");
    };
  }, []);

  socket.on("liveScores", (scoresInRoom) => {
    console.log(scoresInRoom);
  });

  const handleFilterQuestion = (index) => {
    dispatch(deleteQuestion(index));
  };

  return (
    <div className="w-full bg-yellow-200 h-full flex flex-row gap-x-5">
      {/* question list */}
      <div className="w-[60%] bg-green-400">
        {questions.map((data, index) => (
          <QuestionsCard
            key={index}
            data={data}
            roomId={roomId}
            handleFilterQuestion={handleFilterQuestion}
          />
        ))}
      </div>
      {/* live score and total live person */}
      <div>
        <p>Current Live: {liveUser}</p>
        {/* scoreboard */}
        <div className="mt-5 flex flex-col items-center justify-center">
          {Array.isArray(liveScores) ? (
            liveScores.map((score, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-80"
              >
                <p className="text-lg font-semibold">Name: {score.name}</p>
                <p className="text-lg font-semibold">Score: {score.score}</p>
              </div>
            ))
          ) : (
            <div>Wait for results</div>
          )}
        </div>
      </div>
      <button className="bg-red-500 h-10 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">
        End Quiz
      </button>
      
    </div>
  );
};

const QuestionsCard = ({ data, handleFilterQuestion, roomId }) => {
  const { question, options, answer, index } = data;

  const handleClick = () => {
    // sending selected question in the backend
    socket.emit("newQuestion", data, roomId);
    handleFilterQuestion(index);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <p className="font-semibold mb-2">Question:</p>
      <p className="mb-4">{question}</p>

      <p className="font-semibold mb-2">Options:</p>
      <ul className="list-disc pl-4 mb-4">
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>

      <p className="font-semibold mb-2">Answer:</p>
      <p>{answer}</p>

      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        Present Question
      </button>
    </div>
  );
};

export default QuizRoom;
