import "./mainBanner.css";
import Image from "next/image";
import { mhiora, lemonade } from "../../utilities/fonts";
import Link from "next/link";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="columns">
        <div className={`${lemonade.className} antialiased welcome`}>
          <p className="eyebrow">Belly Dance for the Soul</p>
          <h1 className={`${mhiora.className} antialiased`}>Move. Heal.</h1>
          <h1 className={`${mhiora.className} antialiased`}>
            <span>Rediscover</span> Yourself.
          </h1>
          <p className="subtitle">
            Where ancient Middle Eastern dance meets modern healing; gently
            restoring your body, your confidence, and your deepest joy.
          </p>
          <div>
            <Link href="/classes">
              <button className={`${lemonade.className} antialiased blue`}>
                Begin Your Journey
              </button>
            </Link>
            <button className={`${lemonade.className} antialiased transparent`}>
              Learn More
            </button>
          </div>
        </div>
        <div className="portrait">
          <Image
            aria-hidden
            src="/portrait.jpg"
            alt="a hot piece of ass"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
