import React, { useRef, createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ToastContext = createContext();

export const useToastContext = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);
  const showToast = (message) => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    toastRef.current = toast(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};
