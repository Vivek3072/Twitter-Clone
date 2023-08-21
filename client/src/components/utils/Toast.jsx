import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type }) => {
  console.log(message, type);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toastClass = type === "success" ? "bg-green-500" : "bg-red-500";

  return showToast ? (
    <div
      className={`fixed bottom-0 right-0 m-4 p-2 rounded-lg text-white ${toastClass}`}
    >
      {message}
    </div>
  ) : null;
};

export default Toast;
