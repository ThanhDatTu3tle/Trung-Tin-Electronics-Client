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

import ComboService from "../service/ComboService";

interface ComboContextValue {
  combo: {
    id: string;
    name: string;
    image: string;
    price: number;
    cost: number;
    discount: number;
  },
  detail: []
}

const ComboContext = createContext<ComboContextValue[] | undefined>(undefined);

export const useCombo = () => {
  const context = useContext(ComboContext);
  if (!context) {
    throw new Error("useCombo must be used within a ComboProvider");
  }
  return context;
};

export const ComboProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const MySwal = withReactContent(Swal);
  const [combos, setCombos] = useState<
    {
      combo: {
        id: string;
        name: string;
        image: string;
        price: number;
        cost: number;
        discount: number;
      },
      detail: []
    }[]
  >([]);

  const fetchAPICombos = async () => {
    try {
      const res = await ComboService.GetAllCombo();
      return res.data;
    } catch (error) {}
  };

  const { data: combosData, refetch: refetchCombos } = useQuery(
    ["comboImages"],
    fetchAPICombos,
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
      await Promise.all([refetchCombos()]);
    };
    fetchAllAPIs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (combosData) {
      setCombos(combosData);
    }
  }, [combosData]);

  const contextValue: ComboContextValue[] = combos;

  return (
    <ComboContext.Provider value={contextValue}>
      {children}
    </ComboContext.Provider>
  );
};
