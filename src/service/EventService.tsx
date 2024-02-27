import { axiosClient } from "../axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
class EventService{ 
    static GetAllEvent = () => axiosClient.get(`event/getAll`, {})
    static GetEvent = (id: number) => axiosClient.get(`event/getEvent/${id}`, {})
    static CreateEvent = (data:any) => axiosClient.post('event/create', data)
    static UpdateEvent = (id: number, data: any) => axiosClient.put(`event/edit/${id}`, data)
    static UpdateEventStatus = (id: number, status: number) => axiosClient.put(`event/updateStatus/?id=${id}&status=${status}`, {}, config)
}  
export default EventService;
