import axiosClient from "../axios";

const AuthService = {
    login: (data:any) => axiosClient.post(`user/signin?email=${data.username}&password=${data.password}`,{}),
}

export default AuthService;
