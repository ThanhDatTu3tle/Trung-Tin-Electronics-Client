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
  
  import GoodsService from "../service/GoodsService";
  
  interface GoodsContextValue {
    id: string;
    quantity: number;
    goodsDetail: {
      id: number;
      idGoods: number;
      idProduct: string;
      cost: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  const GoodsContext = createContext<GoodsContextValue[] | undefined>(
    undefined
  );
  
  export const useGoods = () => {
    const context = useContext(GoodsContext);
    if (!context) {
      throw new Error("useGoods must be used within a GoodsProvider");
    }
    return context;
  };
  
  export const GoodsProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const MySwal = withReactContent(Swal);
    const [goodss, setGoodss] = useState<
      {
        id: string;
        quantity: number;
        goodsDetail: {
          id: number;
          idGoods: number;
          idProduct: string;
          cost: number;
        }[];
        createdAt: Date;
        updatedAt: Date;
      }[]
    >([]);
  
    const fetchAPIGoodss = async () => {
      try {
        const res = await GoodsService.GetAllGoods();
        return res.data;
      } catch (error) {}
    };
  
    const { data: goodssData, refetch: refetchGoodss } = useQuery(
      ["goodssImages"],
      fetchAPIGoodss,
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
        await Promise.all([refetchGoodss()]);
      };
      fetchAllAPIs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      if (goodssData) {
        setGoodss(goodssData);
      }
    }, [goodssData]);
  
    const contextValue: GoodsContextValue[] = goodss;
  
    return (
      <GoodsContext.Provider value={contextValue}>
        {children}
      </GoodsContext.Provider>
    );
  };
  