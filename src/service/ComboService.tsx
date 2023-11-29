import { axiosClient } from "../axios";

class ComboService{ 
    static GetAllCombo = () => axiosClient.get(`combo/getAll`, {})
    static GetCombo = (id: number) => axiosClient.get(`combo/getCombo/${id}`, {})
    static CreateCombo = (data:any) => axiosClient.post('combo/create', data)
    static UpdateCombo = (id: number, data: any) => axiosClient.put(`combo/edit/${id}`, data)
}  
export default ComboService;
