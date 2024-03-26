// 
import {apiConnector} from "../apiConnector"
import {roomEndpoints} from "../api"
import { toast } from "react-hot-toast"
import {socket} from "../../socket"

const {cretRoom,generateRandomRoomId} =  roomEndpoints;

export function createRoom(roomId,token,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....")
        try{
            const response = await apiConnector("POST",cretRoom,{
                roomId,token
            })
            console.log("Createroom api response",response);
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            toast.success("Login Successful")
            const data = {
                username:"creator",
                roomId,
                isCreator: true
            }
            socket.emit("newMember",data)
            navigate(`/quiz-room/${roomId}`);

        }catch(error){
            console.log("Error in createRoom Api client",error);
            toast.error("error in api");
        }
        toast.dismiss(toastId)
    }
}