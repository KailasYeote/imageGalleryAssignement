import api from "../api/axios";

const userRegister = async (data) => {
    const response = await api.post("/saveuser", data);
    return response.data;
};

const fetchUser = async () => {
    const response = await api.get('/getuser');
    return response.data;
};

const userLogin = async (loginData) => {
    const response = await api.post('/login', loginData);
    console.log(response.data, "user data from service")
    return response.data;
};

export default { userLogin, fetchUser, userRegister };