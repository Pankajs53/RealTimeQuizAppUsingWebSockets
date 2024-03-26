import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    roomId:localStorage.getItem("roomid")
    ?JSON.parse(localStorage.getItem("roomid"))
    :null,
    liveUserCount:0,
    scores:{}
}

const roomSlice = createSlice({
    name:"room",
    initialState:initialState,
    reducers:{
        addRoom(state,action){
            state.roomId = action.payload;
            localStorage.setItem("roomid",JSON.stringify(state.roomId))
        },
        updateRoom(state,action){
            state.roomId = action.payload;
            // Update room data in localStorage
            localStorage.setItem("roomid", JSON.stringify(state.roomId));
        },
        deleteRoom(state,action){
            state.roomId=null;
            localStorage.removeItem("roomid")
        },
        // action to update live user count
        updateLiveUserCount(state,action){
            state.liveUserCount=action.payload;
        },
        updateScores(state,action){
            const {username,score} = action.payload;
            state.scores[username]=score;
        }
    }
})


export const {
    addRoom,
    updateRoom,
    deleteRoom,
    updateLiveUserCount,
    updateScores,
  } = roomSlice.actions;
  export default roomSlice.reducer;