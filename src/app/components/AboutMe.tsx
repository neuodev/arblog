import Image from "next/image";
import Link from "next/link";
import React from "react";
import text from "src/data/text.json";
import pic from "src/images/pic.png";

import GitHub from "src/svg/GitHub";
import Medium from "src/svg/Medium";
import Portfolio from "src/svg/Portfolio";
import YouTube from "src/svg/YouTube";
import LinkedIn from "src/svg/LinkedIn";
import Gmail from "src/svg/Gmail";

const SOCIAL_LINKS = [
  {
    Icon: Portfolio,
    text: "Portfolio",
    link: "https://me.ahmedibrahim.dev/",
  },
  {
    Icon: Medium,
    text: "Medium",
    link: "https://blog.ahmedibrahim.dev/",
  },
  {
    Icon: GitHub,
    text: "GitHub",
    link: "https://github.com/neuodev",
  },
  {
    Icon: Gmail,
    text: "Email",
    link: "mailto:me@ahmedibrahim.dev",
  },
  {
    Icon: LinkedIn,
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/neuodev/",
  },
  {
    Icon: YouTube,
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
          {SOCIAL_LINKS.map(({ Icon, link }) => (
            <Link key={link} href={link} target="_blank">
              <Icon className="w-8 h-8 fill-black dark:fill-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
