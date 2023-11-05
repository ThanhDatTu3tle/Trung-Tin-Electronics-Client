import { axiosClient } from "../axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
class InvoiceService{ 
    static GetAllInvoice = () => axiosClient.get(`invoice/getAll`, {})
    static GetInvoice = (id: string) => axiosClient.get(`invoice/getInvoice/${id}`, {})
    static CreateInvoice = (data:any) => axiosClient.post('invoice/create', data)
    static UpdateInvoiceStatus = (id: number, status: number) => axiosClient.put(`invoice/updateStatus/?id=${id}&status=${status}`, {}, config)
    static UpdateInvoiceConfirm = (id: number, confirm: number) => axiosClient.put(`invoice/updateConfirm/?id=${id}&confirm=${confirm}`, {}, config)
}  
export default InvoiceService;
