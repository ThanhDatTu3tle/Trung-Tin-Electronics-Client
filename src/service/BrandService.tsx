import axiosClient from "../axios"

class BrandService{ 
    static GetAllBrand = () =>axiosClient.get(`brand/getAll`, {})
    // static GetAllUserDeleted = () =>axiosClient.get(`user/search/searchAllDeleted`,{})
    static CreateBrand = (data:any) =>axiosClient.post('brand/create', data)
    // static UpdateUser = (data:any)=>axiosClient.put('user/editUser',data)
    // static RecycleUser = (id:any)=>axiosClient.put(`user/recycle/recycleUser/${id}`,{})
    // static UndoUser = (id:any)=>axiosClient.put(`user/recycle/undoUser/${id}`,{})
    // static DeleteUser = (id:any)=>axiosClient.delete(`user/recycle/delete/${id}`,{})
    
}  
export default BrandService