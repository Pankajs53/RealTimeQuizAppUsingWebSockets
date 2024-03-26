import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearQuestions } from "../../slices/questioSlice";
import {useDispatch} from "react-redux"
import { addRoom } from "../../slices/roomSlice";

const CreateRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    const handleRoomIdGeneration = async () => {
        try{
            const roomData = await generateRandomRoom();
            const roomId = roomData.data;
            setRoomId(roomId)
            dispatch(addRoom(roomId));
            dispatch(clearQuestions())
        
            navigate(`/create-questions/${roomId}`);
        }catch(error){
            console.error('Error generating room ID:', error.message);
        }
    }

    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a Room</h2>
                <button onClick={handleRoomIdGeneration} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
                    Generate Room ID
                </button>
                {roomId && (
                    <div className="text-center mb-4">
                        <p className="text-lg font-semibold">Room ID:</p>
                        <p className="text-lg text-blue-500">{roomId}</p>
                    </div>
                )}
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Share this Room ID with others to join.</p>
                </div>
                <div onClick={()=>navigate(`/create-questions/${roomId}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer">
                    Click Here To Add Questions
                </div>
            </div>
        </div>
    );
}

const generateRandomRoom = async() => {
    try{
        const response = await fetch('http://localhost:4000/room/generate-room',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            
        })

        if(!response.ok){
            throw new Error('Generation Room id failed')
        }
        const data  = await response.json();
        return data;
    }catch(error){
        console.error('Error Generating room id :', error.message);
        throw error;
    }
}

const roomCreate = async(roomId) =>{
    const response = await fetch("",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(roomId)
    })

    if(!response.ok){
        throw new Error('Error in creating room id')
    }
}

export default CreateRoom;
