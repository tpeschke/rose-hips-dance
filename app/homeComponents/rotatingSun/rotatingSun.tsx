import "./rotatingSun.css";
import Image from "next/image";

interface Props {
  sunDimensions?: number,
  isLoading?: boolean
}

export default function RotatingSun({sunDimensions = 1350, isLoading = false}: Props) {
  return (
    <div className={`rotating-sun ${isLoading && 'loading'}`}>
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
