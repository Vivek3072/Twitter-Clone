import { useState } from "react";
import { FaEdit, FaTrash, FaHeart, FaShare } from "react-icons/fa";

const TweetCard = ({ tweet, user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tweet);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(tweet);
  };

  const handleSaveEdit = () => {
    onEdit(user, editedText);
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-3 mb-3">
      <div className="flex flex-row items-center justify-between mb-2">
        <div className="flex flex-row">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${user}.svg`}
            alt={`User ${user}`}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-lg font-medium">{`@${user}`}</div>
          <div className="text-blue-500 font-medium px-2 py-1 rounded ml-2">
            Follow
          </div>
        </div>
        <div className="mx-2 my-auto text-sm text-gray-500 order-last">
          21st April, 2023
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full mb-2"
        />
      ) : (
        <p className="py-2">{tweet}</p>
      )}

      <div className="border-t p-2 flex justify-between items-center">
        <div className="flex space-x-4 text-gray-600">
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaHeart />
            <p>12</p>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaShare />
            <p>12</p>
          </div>
        </div>
        {isEditing ? (
          <div>
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaEdit onClick={handleEdit} />
              <p>Edit</p>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaTrash onClick={() => onDelete(user)} />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetCard;
