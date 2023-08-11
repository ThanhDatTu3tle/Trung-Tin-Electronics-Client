import { axiosClient } from "../axios";

class BrandService{ 
    static GetAllBrand = () => axiosClient.get(`brand/getAll`, {})
    // static GetImagesBrand = () => axiosClient.get(`brand/image/getAll`, {})
    static GetBrand = (id: number) => axiosClient.get(`brand/getBrand/${id}`, {})
    // static GetAllUserDeleted = () =>axiosClient.get(`user/search/searchAllDeleted`,{})
    static CreateBrand = (data:any) => axiosClient.post('brand/create', data)
    static UpdateBrand = (id: number, data: any) => axiosClient.put(`brand/edit/${id}`, data)
    // static RecycleUser = (id:any)=>axiosClient.put(`user/recycle/recycleUser/${id}`,{})
    // static UndoUser = (id:any)=>axiosClient.put(`user/recycle/undoUser/${id}`,{})
    // static DeleteUser = (id:any)=>axiosClient.delete(`user/recycle/delete/${id}`,{})
    
}  
export default BrandService;
