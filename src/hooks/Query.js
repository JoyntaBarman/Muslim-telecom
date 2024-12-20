import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const getQueryData = async (collectionName, queryObj) => {
  // Start with a collection reference
  let q = collection(db, collectionName);

  // Dynamically add `where` clauses based on queryObj
  const queryConstraints = [];
  for (const [field, condition] of Object.entries(queryObj)) {
    const { operator, value } = condition;
    queryConstraints.push(where(field, operator, value));
  }

  // Apply all query constraints
  q = query(q, ...queryConstraints);

  // Fetch data
  const querySnapshot = await getDocs(q);


  const results = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })); // Return the results as an array
  return results;
};
