import React from "react";
import {useNavigate} from 'react-router-dom'


const MainPage = () => {

  const navigate = useNavigate();

  const handleRoomNavigation = () =>{
    navigate("/login")
  }

  const handleQuizNavigation = () =>{
    navigate("/offline-quiz")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[500px] max-w-md space-y-4">
        <p onClick={handleQuizNavigation} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 hover:cursor-pointer transition duration-300">Play Quiz Offline</p>
        <p onClick={handleRoomNavigation} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 hover:cursor-pointer transition duration-300">Create a Room And Start Quiz</p>
      </div>
  </div>
  );
};

export default MainPage;
