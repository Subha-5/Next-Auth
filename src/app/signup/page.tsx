"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const reponse = await axios.post("/api/users/signup", user);
      console.log("Signup success", reponse.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-4">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black rounded-xl"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter username"
        type="text"
      />
      <label htmlFor="emailId">Email Address</label>
      <input
        className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black rounded-xl"
        id="emailId"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
        type="email"
      />
      <label htmlFor="user-password">Password</label>
      <input
        className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black rounded-xl"
        id="user-password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password"
        type="password"
      />
      <button disabled={buttonDisabled || loading} onClick={onSignup} className="border rounded-lg p-2 mb-4 border-gray-300 focus:outline-none focus:border-gray-600">
        {buttonDisabled ? "No signup" : "Sign up"}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}
