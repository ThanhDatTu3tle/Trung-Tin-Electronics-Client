import { axiosClient } from "../axios";

class BrandService{ 
    static GetAllBrand = () => axiosClient.get(`brand/getAll`, {})
    static GetBrand = (id: number) => axiosClient.get(`brand/getBrand/${id}`, {})
    static CreateBrand = (data:any) => axiosClient.post('brand/create', data)
    static UpdateBrand = (id: number, data: any) => axiosClient.put(`brand/edit/${id}`, data)
}  
export default BrandService;
