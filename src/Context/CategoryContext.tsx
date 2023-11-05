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

import CategoryService from "../service/CategoryService";

interface CategoryContextValue {
  id: number;
  name: string;
  status: boolean;
}

const CategoryContext = createContext<CategoryContextValue[] | undefined>(
  undefined
);

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
      throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);

  const fetchAPICategories = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) {}
  };

  const { data: categoriesData, refetch: refetchCategories } = useQuery(
    ["categoryImages"],
    fetchAPICategories,
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
      await Promise.all([refetchCategories()]);
    };
    fetchAllAPIs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const contextValue: CategoryContextValue[] = categories;

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
