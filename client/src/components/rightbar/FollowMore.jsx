const FollowMore = () => {
  const suggestedAccounts = [
    { id: 1, username: "user1", name: "User One" },
    { id: 2, username: "user2", name: "User Two" },
    { id: 3, username: "user3", name: "User Three" },
  ];

  return (
    <div className="bg-white border rounded p-4 mb-4">
      <div className="text-xl font-medium mb-2">Accounts you follow</div>
      <ul>
        {suggestedAccounts.map((account) => (
          <li key={account.id} className="flex items-center space-x-2 mb-2">
            <img
              src={`https://avatars.dicebear.com/api/identicon/${account.username}.svg`}
              alt={account.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold">{account.name}</p>
              <p className="text-gray-600">@{account.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowMore;
