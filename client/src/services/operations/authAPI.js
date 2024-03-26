import {authEndpoints} from "../api"
import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"

import { setToken } from "../../slices/authSlice";

const {
    SIGNUP_API,
    LOGIN_API,
}=authEndpoints;

export function login(email,password,navigate){
    console.log("Starting Login");
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })
            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/create-room")
        }catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        toast.dismiss(toastId)
    }
}

