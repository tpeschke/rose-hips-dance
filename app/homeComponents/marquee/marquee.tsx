import "./marquee.css";
import { mhiora } from "../../utilities/fonts";
import { Fragment } from "react";
import Image from "next/image";

export default function Marquee() {
  const basicItems = [
    "Qigong",
    "Muscle Group Rebalancing",
    "Structural Integration",
    "Somatic Experiencing",
    "Feldenkrais Techniques",
    "Tribal-Fusion Belly Dance",
    "Egyptian Cabaret Belly Dance",
  ];
  const marqueeItems = [
    ...basicItems,
    ...basicItems,
    ...basicItems,
    ...basicItems,
    ...basicItems,
  ];

  return (
    <div className="marquee-band">
      <div className="marquee-inner">
        <Image aria-hidden src="/star.png" alt="star" width={25} height={25} />
        {marqueeItems.map((item, index) => (
          <Fragment key={index}>
            <span className={`${mhiora.className} antialiased`}>{item}</span>
            <Image
              aria-hidden
              src="/star.png"
              alt="star"
              width={25}
              height={25}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
