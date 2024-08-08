"use client";

import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const userForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email: email });
      toast.success("send email succes, check your inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { forgotPassword, isLoading };
};

export default userForgotPassword;
