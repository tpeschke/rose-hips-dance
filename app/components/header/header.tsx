"use client";
import "./header.css";
import { mhiora, lemonade } from "../../utilities/fonts";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [headerColorClass, setHeaderColorClass] = useState("");

  const [storyBannerY, setStoryBannerY] = useState<number | undefined>(
    undefined
  );
  const [beginYourJourneyY, setBeginYourJourneyY] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (document) {
      setStoryBannerY(document.getElementById("story-banner")?.offsetHeight);
      console.log(document.getElementById("begin-your-journey")?.scrollTop);
      setBeginYourJourneyY(
        document.getElementById("begin-your-journey")?.offsetHeight
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const { scrollY } = window;
    if (scrollY === 0) {
      setHeaderColorClass("");
    } else if (storyBannerY && scrollY >= storyBannerY - 50) {
      setHeaderColorClass("scrolled-header-red");
    } else if (beginYourJourneyY && scrollY >= beginYourJourneyY - 50) {
      setHeaderColorClass("scrolled-header-blue");
    } else {
      setHeaderColorClass("scrolled-header-blue");
    }
  };

  return (
    <div id="header" className={`header ${headerColorClass}`}>
      <Link href="/">
        <h1 className={`${mhiora.className} antialiased`}>
          Rose Hips <span>Dance</span>
        </h1>
      </Link>
      <ul className={`${lemonade.className} antialiased`}>
        <li>
          <Link href="/classes">Classes</Link>
        </li>
        {/* <li>Our Story</li> */}
        <li>Contact</li>
        <li>
          <Link href="/classes">
            <button
              className={`${lemonade.className} antialiased ${
                headerColorClass === "scrolled-header-blue" ? "gold" : "blue"
              }`}
            >
              Book a Class
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
