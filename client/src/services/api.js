const BASE_URL = "http://localhost:4000"

// AUTH ENDPOINTS
export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/user/signUp",
    LOGIN_API: BASE_URL + "/user/login",
}

// room

export const roomEndpoints = {
    generateRandomRoomId: BASE_URL + "/room/generate-room",
    cretRoom: BASE_URL + "/room/create-room"
}