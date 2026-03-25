import "./findYourClass.css";
import { mhiora, lemonade } from "../../utilities/fonts";
import Image from "next/image";
import classInfo, { createID } from "../../utilities/classInfo";
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
        {classInfo.inPerson.map(({ title }, index) => {
          {
            /* Header image */
          }
          return (
            <div className="class-square" key={index}>
              <Link href={`/classes#${createID(title)}`}>
                <h2 className={`${mhiora.className} antialiased`}>{title}</h2>
                <p className="subtitle">In Person</p>
                <button
                  className={`${lemonade.className} antialiased full-transparent`}
                >
                  Explore →
                </button>
              </Link>
            </div>
          );
        })}
        {classInfo.online.map(({ title }, index) => {
          {
            /* Header image */
          }
          return (
            <div className="class-square" key={index}>
              <Link href={`/classes#${createID(title)}`}>
                <h2 className={`${mhiora.className} antialiased`}>{title}</h2>
                <p className="subtitle">Online</p>
                <button
                  className={`${lemonade.className} antialiased full-transparent`}
                >
                  Explore →
                </button>
              </Link>
            </div>
          );
        })}
        {classInfo.oneOnOne.map(({ title }, index) => {
          {
            /* Header image */
          }
          return (
            <div className="class-square" key={index}>
              <Link href={`/classes#${createID(title)}`}>
                <h2 className={`${mhiora.className} antialiased`}>{title}</h2>
                <p className="subtitle">One on One</p>
                <button
                  className={`${lemonade.className} antialiased full-transparent`}
                >
                  Explore →
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
