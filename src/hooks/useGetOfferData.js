import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const useGetOfferData = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["offerQuery"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "simOffer"));
      return querySnapshot.docs;
    },
  });

  return { data, isLoading, isError, refetch };
};
