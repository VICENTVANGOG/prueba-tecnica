"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  username: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    try {
      const profile = await axios.get("/api/profile");
      setUser(profile.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch profile:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Logout failed:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    router.push("/login");
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={getProfile}>Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
