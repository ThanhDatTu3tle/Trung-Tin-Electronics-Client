import { axiosClient } from "../axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
class ComboService{ 
    static GetAllCombo = () => axiosClient.get(`combo/getAll`, {})
    static GetCombo = (id: number) => axiosClient.get(`combo/getCombo/${id}`, {})
    static CreateCombo = (data:any) => axiosClient.post('combo/create', data)
    static UpdateCombo = (id: number, data: any) => axiosClient.put(`combo/edit/${id}`, data)
    static UpdateComboStatus = (id: number, status: number) => axiosClient.put(`combo/updateStatus/?id=${id}&status=${status}`, {}, config)
}  
export default ComboService;
