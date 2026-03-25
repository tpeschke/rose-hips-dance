import "./footer.css";
import { mhiora } from "../../utilities/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const sections = [
    {
      title: "Stories",
      items: [
        // "Our Story",
        "Philosophy",
        "Gallery",
      ].map((title) => {
        return { title, link: `/` };
      }),
    },
    {
      title: "Connect",
      items: ["Instagram", "Contact Us"].map((title) => {
        return { title, link: `/` };
      }),
    },
  ];
  return (
    <div className="footer">
      <div className="main">
        <h1 className={`${mhiora.className} antialiased`}>
          Rose Hips <span>Dance</span>
        </h1>
        <p className="subtitle">
          Belly Dance for the Soul. Restoring bodies, healing hearts, and
          awakening joy, one movement at a time.
        </p>
        <div className="strike-right">
          <Image
            aria-hidden
            src="/star.png"
            alt="star"
            width={35}
            height={35}
          />
        </div>
      </div>
      {sections.map(({ title, items }) => {
        return (
          <div key={title}>
            <h2 className={`${mhiora.className} antialiased`}>{title}</h2>
            {items.map(({ title, link }, index) => {
              return (
                <Link key={index} href={link}>
                  <p>{title}</p>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
