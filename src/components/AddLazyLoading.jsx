import React, { Suspense } from "react";
import Spinner from "./Spinner";

const AddLazyLoading = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </>
  );
};

export default AddLazyLoading;
