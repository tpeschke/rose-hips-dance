"use client";
import { Fragment, useState } from "react";
import "./classes.css";
import classInfo from "../utilities/classInfo";
import { mhiora, lemonade } from "../utilities/fonts";
import Image from "next/image";
import BackgroundImages from "../components/backgroundImages/backgroundImages";
import ClassCard from "./components/classCard";
import Spacer from "./components/divider";

export default function Classes() {
  const [filter, setFilter] = useState<
    "inPerson" | "online" | "oneOnOne" | null
  >(null);

  // const changeFilter = (newFilter: "inPerson" | "online" | "oneOnOne") => {
  //   if (newFilter === filter) {
  //     setFilter(null);
  //   } else {
  //     setFilter(newFilter);
  //   }
  // };

  const onlineIndexAddOn = !filter ? classInfo.inPerson.length : 0;
  // const oneOnOneIndexAddOn = !filter
  //   ? onlineIndexAddOn + classInfo.online.length
  //   : 0;

  return (
    <div className="classes">
      <BackgroundImages />
      {/* <div className="filter-buttons">
        <button
          onClick={(_) => changeFilter("inPerson")}
          className={`${lemonade.className} antialiased transparent ${
            filter === "inPerson" && "on"
          }`}
        >
          In Person
        </button>
        <button
          onClick={(_) => changeFilter("online")}
          className={`${lemonade.className} antialiased transparent ${
            filter === "online" && "on"
          }`}
        >
          Online
        </button>
      </div> */}
      {(!filter || filter === "inPerson") && (
        <>
          {formatHeader("In Person", "in-person")}
          {classInfo.inPerson.map((classDetails, index) => (
            <Fragment key={classDetails.title}>
              <ClassCard classDetails={classDetails} isOdd={index % 2 === 1} />
              {index !== classInfo.inPerson.length - 1 && <Spacer />}
            </Fragment>
          ))}
        </>
      )}
      {(!filter || filter === "online") && (
        <>
          {formatHeader("Online", "online")}
          {classInfo.online.map((classDetails, index) => (
            <Fragment key={classDetails.title}>
              <ClassCard
                classDetails={classDetails}
                isOdd={(onlineIndexAddOn + index) % 2 === 1}
              />
              {index !== classInfo.online.length - 1 && <Spacer />}
            </Fragment>
          ))}
        </>
      )}
      <div className="spacer"></div>
    </div>
  );
}

function formatHeader(content: string, id: string) {
  return (
    <span className="filter-header" id={id ?? content}>
      <Image aria-hidden src="/star.png" alt="star" width={25} height={25} />
      <h2 className={`${mhiora.className} antialiased`}>{content}</h2>
      <Image aria-hidden src="/star.png" alt="star" width={25} height={25} />
    </span>
  );
}
