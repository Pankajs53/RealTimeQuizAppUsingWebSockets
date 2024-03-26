import React, { useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addQuestion } from '../../slices/questioSlice';
import {createRoom} from "../../services/operations/roomAPI"
import { useSelector } from 'react-redux';
import { socket } from '../../socket';

const CreateQuestions = () => {

    // access token here from authAPI slice
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch(); 
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [index, setIndex] = useState(1);
    const [data, setData] = useState({
        question: "",
        options: ["", "", "", ""],
        answer: "",
    });

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleOptionChange = (e, index) => {
        const newOptions = [...data.options];
        newOptions[index] = e.target.value;
        setData(prev => ({
            ...prev,
            options: newOptions,
        }));
    }

    const [questions, setQuestions] = useState([]);

    const handleAddNextQuestion = () => {
        if (!data.question || !data.answer || data.options.some(option => !option)) {
            alert("Please fill in all fields");
            return;
        }
        const newQuestion = { ...data, index }; 
        
        dispatch(addQuestion(newQuestion))
        // Use a callback function to ensure you're accessing the updated state
        setQuestions(prev => {
            const newQuestions = [...prev, data];
            console.log(newQuestions); // Log updated questions array
            return newQuestions;
        });
        setData({
            question: "",
            options: ["", "", "", ""],
            answer: "",
        });
        setIndex(prevIndex => prevIndex + 1);
    }

    const handleStartQuiz = () =>{
        console.log("clicked")
        console.log("Room id sent is->",roomId)
        const data ={
            username:"creator h",
            roomId:roomId,
            isCreator:true
        }
        socket.on("newMember",data)
        dispatch(createRoom(roomId,token,navigate));
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <form>
                <label htmlFor='question' className="block mb-2">Enter Question</label>
                <input
                    type='text'
                    name='question'
                    id='question'
                    placeholder='What is Recursion??'
                    value={data.question}
                    onChange={handleDataChange}
                    className="block w-full border rounded-md px-4 py-2 mb-4"
                />

                <label htmlFor='options' className="block mb-2">Options:</label>
                {[1, 2, 3, 4].map((index) => (
                    <input
                        key={index}
                        type='text'
                        name='options'
                        id={`option-${index}`}
                        placeholder={`OPTION ${index}`}
                        value={data.options[index - 1]}
                        onChange={(e) => handleOptionChange(e, index - 1)}
                        className="block w-full border rounded-md px-4 py-2 mb-2"
                    />
                ))}

                <label htmlFor='answer' className="block mb-2">Enter Answer</label>
                <input
                    id='answer'
                    type='text'
                    name='answer'
                    placeholder='answer'
                    onChange={handleDataChange}
                    value={data.answer}
                    className="block w-full border rounded-md px-4 py-2 mb-4"
                />
            </form>

            <button onClick={handleAddNextQuestion} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
                Add Next Question
            </button>

            <button onClick={handleStartQuiz} className=' bg-yellow-200 w-full mt-2 p-3 text-center'>
                Start The Quiz
            </button>
        </div>
    );
}

export default CreateQuestions;
