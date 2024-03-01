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
  
  import InvoiceService from "../service/InvoiceService";
  
  interface InvoiceContextValue {
    id: string;
    address: string;
    description: string;
    content: string;
    createdAt: Date;
    customerName: string;
    email: string;
    payment: string;
    phone: string;
    status: boolean;
    total: number;
    updatedAt: Date;
    confirm: boolean;
  }
  
  const InvoiceContext = createContext<InvoiceContextValue[] | undefined>(
    undefined
  );
  
  export const useInvoice = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
      throw new Error("useInvoice must be used within a InvoiceProvider");
    }
    return context;
  };
  
  export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const MySwal = withReactContent(Swal);
    const [invoices, setInvoices] = useState<
      {
        id: string;
        address: string;
        description: string;
        content: string;
        createdAt: Date;
        customerName: string;
        email: string;
        payment: string;
        phone: string;
        status: boolean;
        total: number;
        updatedAt: Date;
        confirm: boolean;
      }[]
    >([]);
  
    const fetchAPIInvoices = async () => {
      try {
        const res = await InvoiceService.GetAllInvoice();
        return res.data;
      } catch (error) {}
    };
  
    const { data: invoicesData, refetch: refetchInvoices } = useQuery(
      ["invoicesImages"],
      fetchAPIInvoices,
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
        await Promise.all([refetchInvoices()]);
      };
      fetchAllAPIs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      if (invoicesData) {
        setInvoices(invoicesData);
      }
    }, [invoicesData]);
  
    const contextValue: InvoiceContextValue[] = invoices;
  
    return (
      <InvoiceContext.Provider value={contextValue}>
        {children}
      </InvoiceContext.Provider>
    );
  };
  