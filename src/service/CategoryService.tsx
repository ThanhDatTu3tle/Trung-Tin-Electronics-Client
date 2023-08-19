import { axiosClient } from "../axios";

class CategoryService{ 
    static GetAllCategory = () => axiosClient.get(`category/getAll`, {})
    static GetCategory = (id: number) => axiosClient.get(`category/getCategory/${id}`, {})
    static CreateCategory = (data:any) => axiosClient.post('category/create', data)
    static UpdateCategory = (id: number, data: any) => axiosClient.put(`category/edit/${id}`, data)
}  
export default CategoryService;
