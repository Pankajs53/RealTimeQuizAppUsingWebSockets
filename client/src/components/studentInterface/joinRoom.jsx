import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { toast } from 'react-hot-toast';

const JoinRoom = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for newMemberError event
    socket.on("newMemberError", ({ message }) => {
      // Display error message using react-hot-toast
      toast.error(message);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("newMemberError");
    };
  }, []);

  const handleJoinRoom = () => {
    const data = { username, roomId };
    socket.emit("newMember", data);
    socket.on("newMemberSuccess",()=>{
      console.log("roomId->",roomId);
      navigate(`/joined-room/${roomId}`);
    })
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Join Room</h2>
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg font-bold mb-2">
            Enter Your Name:
          </label>
          <input
            type="text"
            placeholder="ZYX"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="room" className="block text-lg font-bold mb-2">
            Enter Room Id To Join:
          </label>
          <input
            type="text"
            placeholder="ZYX"
            id="room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <button
          className="w-full border-rose-500 rounded-md px-4 py-3 bg-yellow-400 hover:bg-red-400 transition-all duration-400  "
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
