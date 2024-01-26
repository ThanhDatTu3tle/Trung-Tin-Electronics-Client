import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

import ProductService from "../service/ProductService";

interface ProductContextValue {
  id: string;
  name: string;
  description: string;
  specification: { id: number; specification: string }[];
  imageProducts: { id: number; image: string }[];
  price: number;
  quantity: number;
  brand: { id: number; name: string; image: string };
  event: null;
  status: boolean;
  discount: number;
  promotional: number;
  category: { id: number; name: string; image: string; status: boolean };
  idBrand: number;
  idCategory: number;
  idEvent: number;
}

const ProductContext = createContext<ProductContextValue[] | undefined>(
  undefined
);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const MySwal = withReactContent(Swal);
  const [products, setProducts] = useState<
    {
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      quantity: number;
      brand: { id: number; name: string; image: string };
      event: null;
      status: boolean;
      discount: number;
      promotional: number;
      category: { id: number; name: string; image: string; status: boolean };
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);

  const fetchAPIProducts = async () => {
    try {
      const res = await ProductService.GetAllProduct();
      return res.data;
    } catch (error) {}
  };

  const { data: productsData, refetch: refetchProducts } = useQuery(
    ["productImages"],
    fetchAPIProducts,
    {}
  );

  useEffect(() => {
    const fetchAllAPIs = async () => {
      await MySwal.fire({
        title: "Đang tải...",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1000,
      });
      await Promise.all([refetchProducts()]);
    };
    fetchAllAPIs();
  }, []);
  useEffect(() => {
    if (productsData) {
        setProducts(productsData);
    }
  }, [productsData]);

  const contextValue: ProductContextValue[] = products;

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
