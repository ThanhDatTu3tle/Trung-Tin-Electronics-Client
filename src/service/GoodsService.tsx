import { axiosClient } from "../axios";

class GoodsService{ 
  static GetAllGoods = () => axiosClient.get(`goods/getAll`, {})
  static CreateGoods = (data:any) => axiosClient.post('goods/create', data)
}  

export default GoodsService;
