import { useQuery } from "react-query";
import AuthService from "../service/AuthService";
async function Login (username: String, password:String){
    try {
        const user ={
          "username": username,
          "password": password
        }        
        const res = await AuthService.login(user);
        localStorage.removeItem('errorlogin');
        localStorage.removeItem('token');
        localStorage.setItem('token', res.data.token);
        return res.data;
      } catch (error) {
        localStorage.setItem('errorlogin','error');
      }
}
interface LoginQueryProps{
    username: any;
    password: any;
}
function LoginQuery({username, password}: LoginQueryProps) {
    const { data, isLoading, isFetching, isSuccess, refetch } = useQuery(['user'], () => Login(username, password),{
        enabled: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,});
    return {data, isFetching, isLoading, isSuccess, refetch};
}

export default LoginQuery;
