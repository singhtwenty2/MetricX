import React from "react";
import { resourcesLinks, platformLinks, communityLinks } from "../../constants";
import assets from "../../assets/assets";
import { FaSquareGithub } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="mt-20 border-t pt-10  mx-32 border-neutral-700 my-5">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4  ">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  className="text-neutral-300 hover:text-orange-500"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4  ">Plateform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  className="text-neutral-300 hover:text-orange-500"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4  ">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a
                  className="text-neutral-300 hover:text-orange-500"
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="mt-5 border-t pt-10  border-neutral-700 ">
        <div className="container flex justify-center items-center mt-[-15px]">
          <div className="social-media-links flex gap-3 justify-center items-center ">
            <a
              href="https://github.com/"
              target="_blank"
              className="social-icon"
            >
              <img
                className="h-8 w-12 rounded-md hover:scale-125"
                src={assets.github}
                alt="github"
              />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="social-icon"
            >
              <img
                className="h-7 w-6 rounded-md  hover:scale-125"
                src={assets.x6}
                alt="Twitter"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="social-icon"
            >
              <img
                className="h-8 w-12  hover:scale-125"
                src={assets.insta}
                alt="Instagram"
              />
            </a>
            <a
              href="https://linkedin.com/in"
              target="_blank"
              className="social-icon"
            >
              <img
                className="h-8 w-12  hover:scale-125"
                src={assets.linkedin}
                alt="LinkedIn"
              />
            </a>
            <p className="font-thin text-xs tracking-wider">
              © 2024 MetricX All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
