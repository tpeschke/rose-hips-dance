import "./findYourClass.css";
import { mhiora, lemonade } from "../../utilities/fonts";
import Image from "next/image";
import Link from "next/link";

export default function FindYourClass() {
  return (
    <div className="find-your-class">
      <div className="title">
        <p className="eyebrow">What We Offer</p>
        <h1 className={`${mhiora.className} antialiased`}>
          Find your <span>perfect class</span>
        </h1>
        <div className="eyebrow">
          <Image
            aria-hidden
            src="/star.png"
            alt="star"
            width={35}
            height={35}
          />
        </div>
      </div>
      <div className="class-catalog-squares">
        <Link href={`/classes#in-person`}>
          <div className="class-square">
            {/* Header Image */}
            <h2 className={`${mhiora.className} antialiased`}>In Person</h2>
            <button
              className={`${lemonade.className} antialiased full-transparent`}
            >
              Explore →
            </button>
          </div>
        </Link>
        <Link href={`/classes#online`}>
          <div className="class-square">
            {/* Header Image */}
            <h2 className={`${mhiora.className} antialiased`}>Online</h2>
            <button
              className={`${lemonade.className} antialiased full-transparent`}
            >
              Explore →
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
