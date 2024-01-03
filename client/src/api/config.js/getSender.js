export const getSenderUsername = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1].username
    : users[0].username;
};
