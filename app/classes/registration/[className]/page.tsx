"use client";
import "./registration.css";
import Link from "next/link";
import { lemonade } from "../../../utilities/fonts";
import { useEffect, useState } from "react";
import classInfo from "../../../utilities/classInfo";
import BackgroundImages from "@/app/components/backgroundImages/backgroundImages";

export default function Registration({
  params,
}: {
  params: Promise<{ className: string }>;
}) {
  const [firstName, setFirstName] = useState<string | null>();
  const [secondName, setSecondName] = useState<string | null>();

  const [phoneNumber, setPhoneNumber] = useState<string | null>();
  const formatAndSetPhoneNumber = (phoneString: string) => {
    const cleaned = ("" + phoneString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      setPhoneNumber("(" + match[1] + ") " + match[2] + "-" + match[3]);
    }
    setPhoneNumber(null);
  };

  const [email, setEmail] = useState<string | null>();
  const [address, setAddress] = useState<string | null>();

  const [classes, setClasses] = useState<string[]>([]);

  const classSelectOptions = [
    ...classInfo.inPerson,
    ...classInfo.online,
    ...classInfo.oneOnOne,
  ].filter((classOption) => {
    return classes.indexOf(classOption.title) === -1;
  });

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const addSelectedClass = () => {
    if (selectedClass) {
      setClasses([...classes, selectedClass]);
    } else {
      setClasses([...classes, classSelectOptions[0].title]);
    }
    setSelectedClass(null);
  };

  const [recommendation, setRecommendation] = useState<string | null>();

  const [hasAgreed, setHasAgreed] = useState(false);

  const canSubmit =
    !!firstName &&
    !!secondName &&
    !!phoneNumber &&
    !!email &&
    !!address &&
    classes.length > 0 &&
    hasAgreed;

  useEffect(() => {
    params.then(({ className }) => {
      if (className && className !== "no-class") {
        setClasses([decodeURI(className)]);
      }
    });
  }, [params]);

  return (
    <div className="registration">
      <BackgroundImages />
      <div className="class-registration-card">
        <h1>Class Registration</h1>
        <p className="subtitle">
          Completing this form will register you as a student at Rose Hips
          Dance.
        </p>
        <p className="subtitle">
          Still have questions? Send us a message using via our{" "}
          <Link href="/contact">Contact Page</Link>
        </p>
        <br />
        <p className="subtitle">
          All contact information will only be used for class updates and school
          information.
        </p>
        <br />

        <h2>
          Name <strong>*</strong>
        </h2>
        <div className="inputs-shell">
          <span>
            <input onChange={(event) => setFirstName(event.target.value)} />
            <label>First</label>
          </span>
          <span>
            <input onChange={(event) => setSecondName(event.target.value)} />
            <label>Second</label>
          </span>

          <h2>
            Phone Number <strong>*</strong>
          </h2>
          <input
            maxLength={16}
            onChange={(event) => formatAndSetPhoneNumber(event.target.value)}
          />

          <h2>
            Email <strong>*</strong>
          </h2>
          <input onChange={(event) => setEmail(event.target.value)} />

          <h2>
            Address <strong>*</strong>
          </h2>
          <input onChange={(event) => setAddress(event.target.value)} />

          <h2>
            Classes <strong>*</strong>
          </h2>
          <ul>
            {classes.map((className) => (
              <li key={className}>
                <button
                  onClick={(_) =>
                    setClasses(classes.filter((title) => title !== className))
                  }
                  className={`${lemonade.className} full-transparent`}
                >
                  {className}
                </button>
              </li>
            ))}
          </ul>
          {classSelectOptions.length > 0 && (
            <div>
              <select
                onChange={(event) => setSelectedClass(event.target.value)}
              >
                {classSelectOptions.map(({ title }) => (
                  <option key={title}>{title}</option>
                ))}
              </select>
              <button
                onClick={addSelectedClass}
                className={`${lemonade.className} full-transparent`}
              >
                Add Class
              </button>
            </div>
          )}

          <h2>How did you hear about Rose Hips Dance?</h2>
          <textarea
            onChange={(event) => setRecommendation(event.target.value)}
            maxLength={1000}
          />

          <p className="disclaimer">
            I understand that the activities I am about to take part in are
            completely voluntary. I understand that I should consult with my
            physician before beginning any new exercise program, and I realize
            it is my responsibility to inform the instructor of any pre-existing
            medical conditions. I release Rose Hips Dance and all instructors,
            contractors, volunteers, and owners from liability in event of
            injury or for any medical problems or conditions that may arise
            from participating in any Rose Hips Dance activities. I further
            acknowledge that I am participating in the activities of my own free
            will and assume all risks and obligations. I understand that Rose
            Hips Dance will not be held liable for any property that is damage,
            lost, or stolen.
          </p>

          <span>
            <input
              onChange={(_) => setHasAgreed(!hasAgreed)}
              type="checkbox"
              checked={hasAgreed}
            />
            <label>I agree</label>
          </span>

          <br />
          <button
            disabled={!canSubmit}
            className={`${lemonade.className} antialiased gold`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
