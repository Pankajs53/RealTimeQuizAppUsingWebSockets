import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    signupData:null,
    loading:false,
    // if value present in local storage then okie otherwise we will set the initial state
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,action){
            localStorage.setItem("signupData",JSON.stringify(action.payload));
            state.signupData = action.payload;
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
        setToken(state,action){
            localStorage.setItem("token",JSON.stringify(action.payload));
            state.token = action.payload;
        },
    },
});

export const {setToken,setSignupData,setLoading} = authSlice.actions;
export default authSlice.reducer;