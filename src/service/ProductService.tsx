import { axiosClient } from "../axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
};
class ProductService{ 
    static GetAllProduct = () => axiosClient.get(`product/getAll`, {})
    static GetProduct = (id: string) => axiosClient.get(`product/getProduct/${id}`, {})
    static GetProductByIdCategory = (categoryIds: number[]) => axiosClient.post(`product/getAllByIdCategory`, categoryIds);
    static CreateProduct = (data: any) => axiosClient.post('product/create', data)
    static UpdateProductStatus = (id: string, status: number) => axiosClient.put(`product/updateStatus/?id=${id}&status=${status}`, {}, config)
    static UpdateProduct = (id: number, data: any) => axiosClient.put(`product/edit/${id}`, data)
}  
export default ProductService;
