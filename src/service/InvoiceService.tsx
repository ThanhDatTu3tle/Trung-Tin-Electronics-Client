import { axiosClient } from "../axios";

class InvoiceService{ 
    static GetAllInvoice = () => axiosClient.get(`invoice/getAll`, {})
    static GetInvoice = (id: string) => axiosClient.get(`invoice/getInvoice/${id}`, {})
    static CreateInvoice = (data:any) => axiosClient.post('invoice/create', data)
    // static UpdateInvoice = (id: number, data: any) => axiosClient.put(`invoice/edit/${id}`, data) 
}  
export default InvoiceService;
