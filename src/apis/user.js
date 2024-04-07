import httpInstance from "@/utils/http"


export const loginAPI = ({ username, password }) => {
    return httpInstance.post('api/login', { username, password })
}




export const regUserAPI = ({ username, password }) => {
    return httpInstance.post('api/regUser', { username, password })
}




// export const userLoginService = ({ username, password }) =>
//   request.post('/api/login', { username, password })