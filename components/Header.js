import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import React from "react";

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null; // Prevents flickering before redirect

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/sign-in");
  };
  return (
    <div className="flex justify-between p-5 lg:px-15 items-center ">
      <h1 className="text-red-500 font-black text-3xl">CRONOFLIX</h1>
      {/* <h1 className="text-3xl font-bold">Welcome, {user.email} 🎉</h1> */}
      <button
        onClick={handleLogout}
        className=" bg-red-500 text-white px-4  py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
