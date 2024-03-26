import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import questionReducer from "../slices/questioSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    question:questionReducer
})

export default rootReducer;