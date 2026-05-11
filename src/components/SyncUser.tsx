import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    axios.post(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName,
    });
  }, [user]);

  return null;
}