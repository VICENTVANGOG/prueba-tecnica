"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Credentials {
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", credentials);

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Home;
