// Button.tsx
import React from "react";

interface ButtonProps {
  onClick?: () => void;                 // Optional click handler (for buttons)
  isLoading?: boolean;                   // Show loading spinner
  isDisabled?: boolean;                  // Disable button
  type?: "button" | "submit" | "reset";  // Support button, submit, reset types
  children: React.ReactNode;             // Button content (text or icons)
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  type = "button", // Default type
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading} // Prevent clicks when disabled/loading
      type={type} // Dynamically handle button type
      className={`bg-[#9605C5] mt-[rem] w-full text-white p-3 rounded-[10px] ${
        isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
