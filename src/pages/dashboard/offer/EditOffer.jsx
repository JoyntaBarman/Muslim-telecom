import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase/firebase.config";
import toast from "react-hot-toast";
import { useGetOfferData } from "../../../hooks/useGetOfferData";
import Spinner from "../../../components/Spinner"
import Button from "../../../components/Button"

const EditOffer = ({ toggleEditOffer, offer }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(offer.offerName);
  const [regularPrice, setRegularPrice] = useState(offer.regularPrice);
  const [discountPrice, setDiscountPrice] = useState(offer.discountPrice);
  const [buyPrice, setBuyPrice] = useState(offer.buyPrice);
  const [operator, setOperator] = useState(offer.operatorType);
  const [offerType, setOfferType] = useState(offer.simOfferType);

  // Custom hooks
  const { refetch } = useGetOfferData();

  const handleUpdateOffer = async (event) => {
    event.preventDefault();

    const updateObj = {
      offerName: name,
      regularPrice,
      offerPrice: discountPrice,
      buyPrice,
      operatorType: operator,
      simOfferType: offerType,
    };

    try {
      setLoading(true);
      await updateDoc(doc(db, "simOffer", offer.id), updateObj);
      toast.success("Document successfully updated!");
      refetch();
      toggleEditOffer();
    } catch (error) {
      console.log("Error updating document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                onClick={toggleEditOffer}
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
              <form onSubmit={handleUpdateOffer} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium  dark:text-white"
                  >
                    Offer Name:
                  </label>
                  <input
                    onChange={(e) => setName(e.currentTarget.value)}
                    value={name}
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
                    onChange={(e) => setBuyPrice(e.currentTarget.value)}
                    value={buyPrice}
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
                    onChange={(e) => setRegularPrice(e.currentTarget.value)}
                    value={regularPrice}
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
                    onChange={(e) => setDiscountPrice(e.currentTarget.value)}
                    value={discountPrice}
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
                    value={operator}
                    onChange={(e) => {
                      setOperator(e.currentTarget.value);
                    }}
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
                    value={offerType}
                    onChange={(e) => {
                      setOfferType(e.currentTarget.value);
                    }}
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

                {
                  <Button type="submit" disabled={loading} className="disabled:bg-gray-300">
                    {loading? <Spinner className="w-6 h-6"/> : "Add offer"}
                  </Button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOffer;
