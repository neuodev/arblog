import Image from "next/image";
import Link from "next/link";
import React from "react";
import text from "src/data/text.json";

const SOCIAL_LINKS = [
  {
    icon: "/airbrakedotio.svg",
    text: "Portfolio",
    link: "https://me.ahmedibrahim.dev/",
  },
  {
    icon: "/medium.svg",
    text: "Medium",
    link: "https://blog.ahmedibrahim.dev/",
  },
  {
    icon: "/github.svg",
    text: "GitHub",
    link: "https://github.com/neuodev",
  },
  {
    icon: "/gmail.svg",
    text: "Email",
    link: "mailto:me@ahmedibrahim.dev",
  },
  {
    icon: "/linkedin.svg",
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/neuodev/",
  },
  {
    icon: "/youtube.svg",
    text: "YouTube",
    link: "https://www.youtube.com/@neuodev",
  },
];

const AboutMe: React.FC<{}> = () => {
  return (
    <div className="flex flex-row gap-4">
      <Image
        width={200}
        height={200}
        src="/ahmed-ibrahim.png"
        alt={text.ahmedIbrahim}
      />

      <div className="pt-10">
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
