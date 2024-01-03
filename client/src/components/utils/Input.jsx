import { MdClose, MdSearch } from "react-icons/md";
import { useTheme } from "../../hooks/ThemeContext";

export default function Input({ inputValue, inputHandlerFunction }) {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <div
        className={`${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-600 border border-gray-400"
        } my-3 px-2 w-full flex flex-row items-center justify-between border focus:border-primary rounded-full focus:outline-none`}
      >
        <input
          type="text"
          placeholder="Search users by their username..."
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"
          } p-3 h-full w-full rounded-full focus:outline-none`}
          value={inputValue}
          onChange={(e) => {
            inputHandlerFunction(e.target.value);
          }}
        />

        {inputValue && inputValue.length > 0 ? (
          <div className="cursor-pointer bg-primary rounded-full p-2">
            <MdClose
              className="text-xl text-white"
              onClick={() => inputHandlerFunction("")}
            />
          </div>
        ) : (
          <div className="cursor-pointer bg-primary rounded-full p-2">
            <MdSearch className="text-xl text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
