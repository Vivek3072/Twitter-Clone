const Advertisement = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded my-3">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-2xl font-medium mb-4">
          Contribute to this project!
        </div>
        <p className="mb-8">
          Create a fork, clone the repository to make changes and then create
          PR.
        </p>
        <a
          href="https://github.com/Vivek3072/Twitter-Clone"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-blue-500 px-6 py-2 rounded-full font-medium"
        >
          View Repository
        </a>
      </div>
    </section>
  );
};

export default Advertisement;
