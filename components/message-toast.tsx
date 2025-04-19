import React, { useState } from "react";

interface MessageToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration_ms?: number;
  onClose?: () => void;
}

export const MessageToast: React.FC<MessageToastProps> = ({
  message,
  type = "info",
  duration_ms = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration_ms);

    return () => clearTimeout(timer);
  }, [duration_ms, onClose]);

  if (!visible) return null;

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 rounded px-4 py-2 shadow-lg ${getToastStyle()}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default MessageToast;
