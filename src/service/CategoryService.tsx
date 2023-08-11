import { axiosClient } from "../axios";

class CategoryService{ 
    static GetAllCategory = () => axiosClient.get(`category/getAll`, {})
    // static GetImagesBrand = () => axiosClient.get(`brand/image/getAll`, {})
    static GetCategory = (id: number) => axiosClient.get(`category/getCategory/${id}`, {})
    // static GetAllUserDeleted = () =>axiosClient.get(`user/search/searchAllDeleted`,{})
    static CreateCategory = (data:any) => axiosClient.post('category/create', data)
    static UpdateCategory = (id: number, data: any) => axiosClient.put(`category/edit/${id}`, data)
    // static RecycleUser = (id:any)=>axiosClient.put(`user/recycle/recycleUser/${id}`,{})
    // static UndoUser = (id:any)=>axiosClient.put(`user/recycle/undoUser/${id}`,{})
    // static DeleteUser = (id:any)=>axiosClient.delete(`user/recycle/delete/${id}`,{})
    
}  
export default CategoryService;
