import React from "react";
import { useFirestoreCollection } from "../../../hooks/useFirestoreCollection";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { Link } from "react-router";
import AddLazyLoading from "../../../components/AddLazyLoading";

const User = () => {
  const { data: users, isLoading, isError } = useFirestoreCollection("users");

  if (isLoading) {
    return (
      <div className="w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (users.length < 0) {
    return <div>nothing</div>;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Link to={"add"}>
          <Button>Add user</Button>
        </Link>
      </div>
      <AddLazyLoading>
        {users.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {users.map((user) => (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <div class="p-5">
                  <Link to={`${user.id}`} className="space-y-1">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {user?.fullName}
                    </h5>

                    <p className=" font-normal text-gray-800">
                      Email: {user?.email}
                    </p>
                    <p className=" font-normal text-gray-800">
                      Phone: {user?.phone}
                    </p>
                    <p className=" font-normal text-gray-800">
                      Curent Level: {user?.level || "N/A"}
                    </p>
                    <p className=" font-normal text-gray-800">
                      Last Login: {user?.loginTime || "N/A"}
                    </p>
                  </Link>
                  <Button>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>No data found.</h1>
        )}
      </AddLazyLoading>
    </div>
  );
};

export default User;
