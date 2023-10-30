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
  
  import BrandService from "../service/BrandService";
  
  interface BrandContextValue {
    id: number;
    name: string;
    status: boolean;
  }
  
  const BrandContext = createContext<BrandContextValue[] | undefined>(
    undefined
  );
  
  export const useBrand = () => {
      const context = useContext(BrandContext);
      if (!context) {
        throw new Error("useBrand must be used within a BrandProvider");
      }
      return context;
  };
  
  export const BrandProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const MySwal = withReactContent(Swal);
    const [brands, setBrands] = useState<
      { id: number; name: string; status: boolean }[]
    >([]);
  
    const fetchAPIBrands = async () => {
        try {
          const res = await BrandService.GetAllBrand();
          return res.data;
        } catch (error) {}
      };
  
      const { data: brandsData, refetch: refetchBrands } = useQuery(
        ["brandImages"],
        fetchAPIBrands,
        {}
      );
  
    useEffect(() => {
      const fetchAllAPIs = async () => {
        await MySwal.fire({
          title: "Loading...",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 1000,
        });
        await Promise.all([refetchBrands()]);
      };
      fetchAllAPIs();
    }, []);
    useEffect(() => {
      if (brandsData) {
        setBrands(brandsData);
      }
    }, [brandsData]);
  
    const contextValue: BrandContextValue[] = brands;
  
    return (
      <BrandContext.Provider value={contextValue}>
        {children}
      </BrandContext.Provider>
    );
  };
  