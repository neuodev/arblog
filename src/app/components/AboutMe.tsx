import Image from "next/image";
import Link from "next/link";
import React from "react";
import text from "src/data/text.json";
import pic from "src/images/pic.png";
import github from "src/images/github.svg";
import gmail from "src/images/gmail.svg";
import linkedin from "src/images/linkedin.svg";
import youtube from "src/images/youtube.svg";
import portfolio from "src/images/portfolio.svg";
import medium from "src/images/medium.svg";

const SOCIAL_LINKS = [
  {
    icon: portfolio,
    text: "Portfolio",
    link: "https://me.ahmedibrahim.dev/",
  },
  {
    icon: medium,
    text: "Medium",
    link: "https://blog.ahmedibrahim.dev/",
  },
  {
    icon: github,
    text: "GitHub",
    link: "https://github.com/neuodev",
  },
  {
    icon: gmail,
    text: "Email",
    link: "mailto:me@ahmedibrahim.dev",
  },
  {
    icon: linkedin,
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/neuodev/",
  },
  {
    icon: youtube,
    text: "YouTube",
    link: "https://www.youtube.com/@neuodev",
  },
];

const AboutMe: React.FC<{}> = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
      <Image width={200} height={200} src={pic} alt={text.ahmedIbrahim} />

      <div className="sm:pt-10">
        <h1 className="mb-1 text-sm">{text.aboutme.header}</h1>
        <p className="mb-3 font-medium">{text.aboutme.bdoy}</p>

        <div className="flex flex-row gap-2">
          {SOCIAL_LINKS.map(({ icon, text, link }) => (
            <Link key={icon} href={link} target="_blank">
              <Image width={30} height={30} src={icon} alt={text} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
