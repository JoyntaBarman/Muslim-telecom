import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const useFirestoreCollection = (collectionName) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [collectionName],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });

  return { data, isLoading, isError, refetch };
};