"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Logged Out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.reponse.data);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-4 p-2">
      <h1 className="text-lg font-semibold">Profile Page</h1>
      <br />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="p-2 m-4 text-white rounded-md text-sm bg-green-500 "
      >
        Get User Details
      </button>
      <button
        onClick={handleLogout}
        className="p-2 m-4 text-white rounded-md text-sm bg-red-500 "
      >
        Logout
      </button>
    </div>
  );
}
