import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";

export const Socials = () => {
  return (
    <div id="social-links" className=" z-10 mb-12 self-end">
      <a
        href="https://www.linkedin.com/in/levi-deang/"
        target="_blank"
        className="mr-2 inline-block"
        aria-label="Levi's LinkedIn account"
      >
        <LinkedIn
          width={30}
          height={30}
          className="text-gray-900 dark:text-white"
        />
      </a>
      <a
        href="https://github.com/levi-ren/weather-app-v3"
        target="_blank"
        className="inline-block"
        aria-label="GitHub repository"
      >
        <Github
          width={30}
          height={30}
          className="text-gray-900 dark:text-white"
        />
      </a>
    </div>
  );
};
