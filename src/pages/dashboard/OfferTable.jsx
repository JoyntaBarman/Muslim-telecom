import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditOffer from "./offer/EditOffer";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useGetOfferData } from "../../hooks/useGetOfferData";

const OfferTable = ({ offers }) => {
  const [editOfferId, setEditOfferId] = useState(null); // Track which offer is being edited
  const { refetch } = useGetOfferData();

  const toggleEditOffer = (offerId) => {
    setEditOfferId((prev) => (prev === offerId ? null : offerId));
  };

  const handleDelete = async (id) => {
    try {
      // Delete the document
      await deleteDoc(doc(db, "simOffer", id));
      toast.success("Document successfully deleted!");
      refetch();
    } catch (error) {
      toast.error("Error deleting document");
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      <table className="table-auto w-full text-left border-collapse overflow-x-scroll">
        <thead className="bg-[#EDEEF3]">
          <tr>
            <th className="px-4 py-2 w-1/3">Offer Name</th>
            <th className="px-4 py-2 ">Operator</th>
            <th className="px-4 py-2 ">Offer Type</th>
            <th className="px-4 py-2 ">Price</th>
            <th className="px-4 py-2 ">Discount</th>
            <th className="px-4 py-2 ">Buy</th>
            <th className="px-4 py-2 ">Status</th>
            <th className="px-4 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => {
            const offerData = offer.data(); // Extract offer data
            const isEditing = editOfferId === offer.id; // Check if this row is being edited

            return (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } text-sm border-b`}
              >
                <td className="px-4 py-2">{offerData.offerName || "N/A"}</td>
                <td className="px-4 py-2">{offerData.operatorType || "N/A"}</td>
                <td className="px-4 py-2">{offerData.simOfferType || "N/A"}</td>
                <td className="px-4 py-2">{offerData.regularPrice || "N/A"}</td>
                <td className="px-4 py-2">
                  {offerData.discountPrice || "N/A"}
                </td>
                <td className="px-4 py-2">{offerData.buyPrice || "N/A"}</td>
                <td className="px-4 py-2">{offerData.status || "N/A"}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <MdEdit
                      onClick={() => toggleEditOffer(offer.id)}
                      size={20}
                      className="cursor-pointer hover:text-indigo duration-300"
                    />
                    {isEditing && (
                      <EditOffer
                        toggleEditOffer={() => toggleEditOffer(null)}
                        offer={offerData}
                      />
                    )}
                    <MdDelete
                      onClick={() => handleDelete(offer.id)}
                      size={20}
                      className="cursor-pointer hover:text-red-500 duration-300"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {!offers.length && <div>No data found</div>}
      </table>
    </>
  );
};

export default OfferTable;
