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
  
  import EventService from "../service/EventService";
  
  interface EventContextValue {
    event: {
      id: number;
      name: string;
      image: string;
      price: number;
      cost: number;
      discount: number;
      status: boolean;
    },
    detail: [
      {
        id: number;
        idProduct: string;
        idEvent: number;
        productNumber: number;
        event: {
          id: number;
          name: string;
          image: string;
          price: number;
          cost: number;
          status: boolean;
        };
        product: {
          id: string;
          name: string;
          description: string;
          price: number;
          status: boolean;
          idBrand: number;
          idCategory: number;
          idEvent: null;
          quantity: number;
          brand: {
            id: number;
            name: string;
            image: string;
          };
          category: {
            id: number;
            name: string;
            image: string;
            status: boolean;
          };
          event: null;
        }
      }
    ]
  }
  
  const EventContext = createContext<EventContextValue[] | undefined>(undefined);
  
  export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
      throw new Error("useEvent must be used within a EventProvider");
    }
    return context;
  };
  
  export const EventProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const MySwal = withReactContent(Swal);
    const [events, setEvents] = useState<
      {
        event: {
            id: number;
            name: string;
            image: string;
            price: number;
            cost: number;
            discount: number;
            status: boolean;
          },
          detail: [
            {
              id: number;
              idProduct: string;
              idEvent: number;
              productNumber: number;
              event: {
                id: number;
                name: string;
                image: string;
                price: number;
                cost: number;
                status: boolean;
              };
              product: {
                id: string;
                name: string;
                description: string;
                price: number;
                status: boolean;
                idBrand: number;
                idCategory: number;
                idEvent: null;
                quantity: number;
                brand: {
                  id: number;
                  name: string;
                  image: string;
                };
                category: {
                  id: number;
                  name: string;
                  image: string;
                  status: boolean;
                };
                event: null;
              }
            }
          ]
      }[]
    >([]);
  
    const fetchAPIEvents = async () => {
      try {
        const res = await EventService.GetAllEvent();
        return res.data;
      } catch (error) {}
    };
  
    const { data: eventsData, refetch: refetchEvents } = useQuery(
      ["eventsImages"],
      fetchAPIEvents,
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
        await Promise.all([refetchEvents()]);
      };
      fetchAllAPIs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      if (eventsData) {
        setEvents(eventsData);
      }
    }, [eventsData]);
  
    const contextValue: EventContextValue[] = events;
  
    return (
      <EventContext.Provider value={contextValue}>
        {children}
      </EventContext.Provider>
    );
  };
  