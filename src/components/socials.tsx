import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";

export const Socials = () => {
  return (
    <div id="social-links" className=" z-10 mb-12 mr-2 mt-2 self-end">
      <a
        href="https://www.linkedin.com/in/levi-deang/"
        target="_blank"
        className="mr-2 inline-block"
        aria-label="Levi's LinkedIn account"
      >
        <LinkedIn className="w-6 text-gray-300 sm:w-7" />
      </a>
      <a
        href="https://github.com/levi-ren/weather-app-v3"
        target="_blank"
        className="inline-block"
        aria-label="GitHub repository"
      >
        <Github className="w-6 text-gray-300 sm:w-7" />
      </a>
    </div>
  );
};
