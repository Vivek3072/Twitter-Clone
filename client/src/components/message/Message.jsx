import { TbMessage2Heart } from "react-icons/tb";

export default function Message() {
  return (
    <div className="grid items-center h-full md:h-screen">
      <div className="max-w-md flex justify-center flex-col mx-auto p-8 my-auto bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center my-3">
          <TbMessage2Heart className="text-blue-500 text-4xl mr-4" />
          <div className="text-2xl font-semibold">Messaging Feature</div>
        </div>
        <p className="my-2 text-center text-gray-600">
          We are excited to announce that we will soon implement a messaging
          feature!
        </p>
        <p className="my-2 text-center text-gray-600">
          Stay tuned for updates as we work on bringing this feature to you.
        </p>

        <a
          href="https://github.com/Vivek3072/Twitter-Clone"
          target="_blank"
          rel="noreferrer"
          className="relative border border-blue-500 rounded-lg px-5 py-2 mx-auto transition hover:bg-blue-500 hover:text-white"
        >
          <span className="absolute top-0 left-0 w-full h-full border-dashed border-blue-500"></span>
          Learn More
        </a>
      </div>
    </div>
  );
}
