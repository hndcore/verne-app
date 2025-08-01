import React from "react";

interface DialogLoaderProps {
  message?: string;
}

const DialogLoader: React.FC<DialogLoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-4 h-4 mr-2 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-stone-600">{message}</span>
    </div>
  );
};

export default DialogLoader;
