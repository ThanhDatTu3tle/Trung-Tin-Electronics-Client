import { axiosClient } from "../axios";

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
class ProductService {
  static GetAllProduct = () => axiosClient.get(`product/getAll`, {})
  static GetProduct = (id: string) => axiosClient.get(`product/getProduct/${id}`, {})
  static GetProductByIdCategory = (categoryIds: number[]) => axiosClient.post(`product/getAllByIdCategory`, categoryIds);
  static CreateProduct = (data: any) => axiosClient.post('product/create', data)
  static UpdateProductStatus = (id: string, status: number) => axiosClient.put(`product/updateStatus/?id=${id}&status=${status}`, {}, config)
  static UpdateProductDiscount = (id: string, discount: number, promotional: number) => axiosClient.put(`product/updateDiscount/?id=${id}&discount=${discount}&promotional=${promotional}`, {}, config)
  static UpdateProductQuantity = (id: string, quantity: number) => axiosClient.put(`product/updateQuantity/?id=${id}&quantity=${quantity}`, {}, config)
  static UpdateProduct = (data: any) => axiosClient.put(`product/update`, data)
}

export default ProductService;
