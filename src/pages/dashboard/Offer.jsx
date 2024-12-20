import React, { lazy, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import AddLazyLoading from "../../components/AddLazyLoading";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import { useGetOfferData } from "../../hooks/useGetOfferData";
import Spinner from "../../components/Spinner";
import { FaSearch } from "react-icons/fa";
const OfferTable = lazy(() => import("./OfferTable"));

const Offer = () => {
  const [showModel, setShowModel] = useState(false);
  const [offers, setOffers] = useState([]);
  const inpurRef = useRef(null);
  const { data, isLoading, refetch } = useGetOfferData();
  console.log(data)

  // Add offer function

  const handleSearch = async () => {
    const inputValue = inpurRef.current.value;
    // if input value does not exist.
    if (inputValue) {
      const newOffers = data.filter((offer) => {
        const isExist = offer
          .data()
          .offerName.toLowerCase()
          .includes(inputValue.toLowerCase());
        
        if (isExist) {
          return isExist;
        }
      });
      setOffers(newOffers);
    } else (
      refetch()
    )

  };

  const addOffer = async (event) => {
    event.preventDefault();
    const date = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replaceAll(" ", "-");
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const price = formData.get("Buy_price");
    const regularPrice = formData.get("Regular_price");
    const discountPrice = formData.get("Discount_price");
    const operator = formData.get("operator");
    const offerType = formData.get("type");

    const offerObj = {
      buyPrice: price,
      commission: "",
      dateTime: formattedDate,
      discountPrice: discountPrice,
      level: "",
      offerName: name,
      operatorType: operator,
      refNo: "20241129200827",
      regularPrice: regularPrice,
      simOfferType: offerType,
      status: "Active",
    };

    try {
      const docRef = await addDoc(collection(db, "simOffer"), offerObj);
      if (docRef.id) {
        const updatedOfferObj = { ...offerObj, id: docRef.id };

        // Update the document with the new ID
        await setDoc(doc(db, "simOffer", docRef.id), updatedOfferObj);
        toast.success("Successfully added.");
        refetch();
        taggleModel();
      } else {
        toast.error("Something is wrong.");
      }
    } catch (error) {
      console.error("Error adding offer: ", error);
    }
  };

  const taggleModel = () => {
    setShowModel((prev) => !prev);
  };

  useEffect(() => {
    setOffers(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              ref={inpurRef}
              placeholder="offer name"
              className="border border-gray-600 rounded-lg px-4 py-1 outline-none"
            />
            <Button onClick={handleSearch}>
              <FaSearch />
            </Button>
          </div>
        </div>
        <div className="flex items-center">
          <Button onClick={taggleModel}>Add Offer</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
      <AddLazyLoading >
        <OfferTable offers={offers} />
      </AddLazyLoading>
      </div>

      {/* modal */}
      {showModel && (
        <div>
          {/* <!-- Main modal --> */}
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-[#EDEEF3] bg-opacity-70"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative rounded-lg shadow bg-gray-600">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t 0">
                  <h3 className="text-xl font-semibold align-text-bottom text-center text-white">
                    Add new offer.
                  </h3>
                  <button
                    onClick={taggleModel}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  <form onSubmit={addOffer} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium  dark:text-white"
                      >
                        Offer Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className=" border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none  "
                        placeholder="Offer name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Buy_price"
                        className="block mb-2 font-medium  dark:text-white"
                      >
                        Buy price
                      </label>
                      <input
                        type="number"
                        name="Buy_price"
                        id="Buy_price"
                        placeholder="Buy price"
                        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Regular_price"
                        className="block mb-2 font-medium  dark:text-white"
                      >
                        Regular price
                      </label>
                      <input
                        type="number"
                        name="Regular_price"
                        id="Regular price"
                        placeholder="Regular_price"
                        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Discount_price"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                      >
                        Discount price
                      </label>
                      <input
                        type="number"
                        name="Discount_price"
                        id="Discount price"
                        placeholder="Discount_price"
                        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="operator"
                        className="block mb-2 font-medium  dark:text-white"
                      >
                        Operator
                      </label>
                      <select
                        name="operator"
                        className="w-full px-4 py-2 outline-none rounded-lg"
                      >
                        <option value="GP">Grameenphone</option>
                        <option value="BL">BL</option>
                        <option value="Robi">Robi</option>
                        <option value="Airtel">Airtel</option>
                        <option value="Teletalk">Teletalk</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        class="block mb-2 font-medium  dark:text-white"
                      >
                        Sim Offer Type
                      </label>
                      <select
                        name="type"
                        id="type"
                        className="w-full px-4 py-2 outline-none rounded-lg"
                      >
                        <option value="Internet">Internet</option>
                        <option value="Internet">Minute</option>
                        <option value="Family">Family</option>
                        <option value="Combo">Combo</option>
                        <option value="Gift">Gift</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add offer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
