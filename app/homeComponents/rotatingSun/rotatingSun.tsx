import "./rotatingSun.css";
import Image from "next/image";

export default function RotatingSun() {
  const sunDimensions = 1350;

  return (
    <div className="rotating-sun">
      <Image
        aria-hidden
        src="/homeImages/sun.png"
        alt="rotating sun"
        width={sunDimensions}
        height={sunDimensions}
      />
    </div>
  );
}
