import { mhiora, lemonade } from "../../utilities/fonts";
import { createID } from "../../utilities/classInfo";
import Link from "next/link";

interface Props {
  classDetails: {
    title: string;
    skillLevel: string;
    body: string[];
    prereqs: string[];
    cost: number
  };
  isOdd: Boolean;
}

export default function ClassCard({ classDetails, isOdd }: Props) {
  const { title, skillLevel, body, prereqs, cost } = classDetails;

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
        <div></div>
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
            Cost:{" "}
          </strong>{" "}
          ${cost}
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
