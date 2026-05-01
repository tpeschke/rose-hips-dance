import { mhiora, lemonade } from "../../utilities/fonts";
import { createID } from "../../utilities/classInfo";
import Link from "next/link";
import Image from "next/image";

interface Props {
  classDetails: {
    title: string,
    image?: string,
    skillLevel: string,
    body: string[],
    prereqs: string[],
    time: string,
    address?: string,
    cost: number
  };
  isOdd: Boolean;
}

export default function ClassCard({ classDetails, isOdd }: Props) {
  const { title, image = 'bellyDanceForSoul.jpg', skillLevel, body, prereqs, time, address, cost } = classDetails;

  function formatPrereqs(prereqs: string[]) {
    if (prereqs.length === 0) return "None";

    return prereqs.reduce((currentString, req, index) => {
      return (
        currentString + ` ${req}${index === prereqs.length - 1 ? "" : ","}`
      );
    }, "");
  }

  return (
    <div key={title} className={"class-card" + (isOdd ? " odd" : "")}>
      <div className="image-shell">
        <div id={createID(title)} className="nav-id"></div>
        <h1 className={`${mhiora.className} antialiased`}>{title}</h1>
        <Image
          aria-hidden
          src={`/classImages/${image}`}
          alt="a hot piece of ass"
          width={400}
          height={400}
        />
      </div>
      <div className="class-body">
        <p>
          <strong className={`${mhiora.className} antialiased`}>
            Skill Level:{" "}
          </strong>
          {skillLevel}
        </p>
        {body.map((paragraph, index) => (
          <p key={index} className="gray">
            {paragraph}
          </p>
        ))}
        <p>
          <strong className={`${mhiora.className} antialiased`}>
            Prerequisite:{" "}
          </strong>{" "}
          {formatPrereqs(prereqs)}
        </p>
        <p>
          <strong className={`${mhiora.className} antialiased`}>
            Time:{" "}
          </strong>{" "}
          {time}
        </p>
        {address && <p>
          <strong className={`${mhiora.className} antialiased`}>
            Address:{" "}
          </strong>{" "}
          {address}
        </p>}
        <p>
          <strong className={`${mhiora.className} antialiased`}>
            Cost:{" "}
          </strong>{" "}
          ${cost} (for series)
        </p>
        <Link href={`/classes/registration/${title}`}>
          <button className={`${lemonade.className} antialiased transparent`}>
            Book This Class
          </button>
        </Link>
      </div>
    </div>
  );
}
