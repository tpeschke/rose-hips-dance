"use client";
import "./registration.css";
import Link from "next/link";
import { mhiora, lemonade } from "../../../utilities/fonts";
import { ChangeEvent, useEffect, useState } from "react";
import classInfo from "../../../utilities/classInfo";
import BackgroundImages from "@/app/components/backgroundImages/backgroundImages";
import { Bounce, ToastContainer } from "react-toastify";
import PayPalButtonsDisplay from "./components/PayPalButtonsDisplay";
import validateEmail from "./components/utilities/validateEmail";
import { formatPhoneNumber, validatePhoneNumber } from "./components/utilities/phoneUtilities";

export interface ClassInterface {
  title: string,
  cost: number
}

export default function Registration({
  params,
}: {
  params: Promise<{ className: string }>;
}) {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const formatAndSetPhoneNumber = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const formattedString = formatPhoneNumber(event.target.value)

    if (formattedString) {
      event.target.value = formattedString
    }
    setPhoneNumber(formattedString);
  };

  const [email, setEmail] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassInterface[]>([]);

  const classSelectOptions = [
    ...classInfo.inPerson,
    ...classInfo.online,
  ].filter((classOption) => {
    return classes.findIndex(option => option.title === classOption.title) === -1;
  });

  const [selectedClass, setSelectedClass] = useState<ClassInterface | null>(null);

  const addSelectedClass = () => {
    if (selectedClass) {
      setClasses([...classes, selectedClass]);
    } else {
      setClasses([...classes, { title: classSelectOptions[0].title, cost: classSelectOptions[0].cost }]);
    }
    setSelectedClass(null);
  };

  const [recommendation, setRecommendation] = useState<string | null>(null);

  const [hasAgreed, setHasAgreed] = useState(false);

  const canSubmit =
    !!firstName &&
    !!lastName &&
    !!phoneNumber &&
    validatePhoneNumber(phoneNumber) &&
    !!email &&
    validateEmail(email) &&
    classes.length > 0 &&
    hasAgreed;

  useEffect(() => {
    params.then(({ className }) => {
      if (className && className !== "no-class") {
        const decodedClassName = decodeURI(className)
        const classIndex = classSelectOptions.findIndex(option => option.title === decodedClassName)

        if (classIndex > -1) {
          const { title, cost } = classSelectOptions[classIndex]
          setClasses([{ title, cost }]);
        }
      }
    });
  }, [params]);

  return (
    <div className="registration">
      <BackgroundImages />
      <div className="class-registration-card">
        <h1 className={`${mhiora.className} antialiased`}> Class Registration</h1 >
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
            <input onChange={(event) => setFirstName(event.target.value.trim())} maxLength={150} placeholder="First" />
          </span>
          <span>
            <input onChange={(event) => setLastName(event.target.value.trim())} maxLength={150} placeholder="Second" />
          </span>

          <h2>
            Phone Number <strong>*</strong>
          </h2>
          <input
            maxLength={16}
            onChange={formatAndSetPhoneNumber}
          />
          {(hasAgreed && phoneNumber && !validatePhoneNumber(phoneNumber)) && <p className="warning">Phone Number isn't valid</p>}

          <h2>
            Email <strong>*</strong>
          </h2>
          <input onChange={(event) => setEmail(event.target.value)} />
          {(hasAgreed && email && !validateEmail(email)) && <p className="warning">Email isn't valid</p>}

          <h2>
            Classes <strong>*</strong>
          </h2>
          <ul>
            {classes.map((className) => (
              <li key={className.title}>
                <button
                  onClick={(_) =>
                    setClasses(classes.filter((title) => title !== className))
                  }
                  className={`${lemonade.className} full-transparent delete`}
                >
                  {className.title} (${className.cost})
                  <span>X</span>
                </button>
              </li>
            ))}
            <li>
              <span className="total-shell">
                Total: ${classes.reduce((currentValue, { cost }) => currentValue + cost, 0)}
              </span>
            </li>
          </ul>
          {classSelectOptions.length > 0 && (
            <div>
              <select
                onChange={(event) => {
                  const classOptionIndex = classSelectOptions.findIndex(option => option.title === event.target.value)
                  if (classOptionIndex > -1) {
                    setSelectedClass(classSelectOptions[classOptionIndex])
                  }
                }}
              >
                {classSelectOptions.map((classOption) => {
                  const { title, cost } = classOption
                  return <option key={title} value={title}>{title} (${cost})</option>
                })}
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
            className={`${lemonade.className} antialiased`}
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

          <span className="agreement">
            <input
              onChange={(_) => setHasAgreed(!hasAgreed)}
              type="checkbox"
              checked={hasAgreed}
            />
            <label>I agree</label>
          </span>

          <br />

          <PayPalButtonsDisplay
            classes={classes}
            canSubmit={canSubmit}
            registrationInfo={{ firstName, lastName, phoneNumber, email, classes, hasAgreed, recommendation }}
          />
        </div>
      </div >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}
