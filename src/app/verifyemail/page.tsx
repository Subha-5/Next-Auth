"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  // const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse);
    }
  };

  useEffect(() => {
    const urlToken = decodeURI(window.location.search.split("=")[1]);
    setToken(urlToken || "");

    // const {query} = router; // using nextts
    // const urlToken2 = query.token
  }, []);

  const handleVerifyUserEmail = () => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
      <button
        className="m-4 p-2 border rounded-lg bg-green-500 text-base"
        disabled={token == undefined}
        onClick={handleVerifyUserEmail}
      >
        Press to verify your email
      </button>
    </div>
  );
}
