import { axiosClient } from "../axios";

class ProductService{ 
    static GetAllProduct = () => axiosClient.get(`product/getAll`, {})
    // static GetImagesBrand = () => axiosClient.get(`brand/image/getAll`, {})
    static GetProduct = (id: number) => axiosClient.get(`product/getProduct/${id}`, {})
    // static GetAllUserDeleted = () =>axiosClient.get(`user/search/searchAllDeleted`,{})
    static CreateProduct = (data:any) => axiosClient.post('product/create', data)
    static UpdateProduct = (id: number, data: any) => axiosClient.put(`product/edit/${id}`, data)
    // static RecycleUser = (id:any)=>axiosClient.put(`user/recycle/recycleUser/${id}`,{})
    // static UndoUser = (id:any)=>axiosClient.put(`user/recycle/undoUser/${id}`,{})
    // static DeleteUser = (id:any)=>axiosClient.delete(`user/recycle/delete/${id}`,{})
    
}  
export default ProductService;
