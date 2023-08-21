import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub style={{ color: "#333" }} />,
      link: "https://github.com/Vivek3072",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin style={{ color: "#0e76a8" }} />,
      link: "https://www.linkedin.com/in/vivek-srivas/",
    },
    {
      name: "Instagram",
      icon: <FaInstagram style={{ color: "#bc2a8d" }} />,
      link: "https://www.instagram.com/vvk_srvstv_/",
    },
  ];

  return (
    <footer className="border text-gray-600 rounded py-8">
      <div className="mx-auto flex flex-col items-center justify-between">
        <div className="flex flex-row space-y-0 space-x-4">
          {socialLinks.map((socialLink) => (
            <a
              key={socialLink.name}
              href={socialLink.link}
              className="hover:text-gray-400 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialLink.icon}
            </a>
          ))}
        </div>
        <div className="text-sm text-center mt-4">
          &copy; 2023 - Twitter Clone
        </div>
        <div className="text-sm text-center mt-4">All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
