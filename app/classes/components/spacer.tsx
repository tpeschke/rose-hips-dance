import Image from "next/image";

export default function Spacer() {
  return (
    <div className="spacer">
      <div className="eyebrow">
        <Image aria-hidden src="/star.png" alt="star" width={35} height={35} />
      </div>
    </div>
  );
}
