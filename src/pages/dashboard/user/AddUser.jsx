import React from "react";
import Button from "../../../components/Button";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

const AddUserForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const nid = formData.get("nid");
    const dob = formData.get("dob");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replaceAll(" ", "-");

    const userObj = {
      fullName: name,
      email,
      phone,
      nid,
      dateofbirth: dob,
      password,
      accountVerify: false,
      adminId: "",
      balanceType: "main",
      bankBalance: 0,
      bankStatus: true,
      bankType: "bank",
      creationDate: formattedDate,
      driveBalance: 0,
      driveStatus: true,
      driveType: "drive",
      fcmToken:
        "cZ9mcGaRTZqEFqurUzTj2p:APA91bHITH041mzd6GUGpYdFLRT_BGaw39gbssz6gk3rTs6HRAqV2pK__TeDxO2orDWKVC4joD8tbkXwuBodHK4zfYxsbj4lpxB1I6T6zP47NVGZ-cKMI_E",
      imeiNo: "23606c32dddddba4",
      level: "",
      locationLat: "0.0",
      locationLng: "0.0",
      locationName: "",
      lockCode: "",
      loginTime: "05-Dec-24 05:43:19 AM",
      mainBalance: 10,
      mainStatus: true,
      masterpassword: "1059114",
      oldImeiNo: "23606c32dddddba4",
      shopBalance: 0,
      shopStatus: true,
      shopType: "shop",
      status: true,
    };

    if (password === confirmPassword) {
      const docRef = await addDoc(collection(db, "users"), userObj);
      if (docRef.id) {
        const updatedOfferObj = { ...userObj, id: docRef.id };

        // Update the document with the new ID
        await setDoc(doc(db, "users", docRef.id), updatedOfferObj);
        toast.success("Successfully added.");
      } else {
        toast.error("Something is wrong.");
      }
    } else {
      toast.error("Type your password and current password same.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="space-y-4">
        <h1 className="mb-4 text-2xl font-bold text-center underline">
          Add an user
        </h1>
        <div>
          {" "}
          <label htmlFor="name" className="font-medium">
            Full name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="full name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="Phone"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="nid" className="font-medium">
            NID
          </label>
          <input
            type="number"
            id="nid"
            name="nid"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="NID"
            required
          />
        </div>
        <div>
          <label htmlFor="dob" className="font-medium">
            Date Of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="Date Of Birth"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="shadow-sm px-3 py-1 w-full outline-none border border-gray-600 rounded-lg"
            placeholder="Confirm Password"
            required
          />
        </div>
      </div>

      <Button type={"submit"}>Add</Button>
    </form>
  );
};

export default AddUserForm;
