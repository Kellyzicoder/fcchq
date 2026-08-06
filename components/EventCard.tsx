import Image from "next/image";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export function EventCard({
  name,
  time,
  detail,
  image,
  link,
}: {
  name: string;
  time: string;
  detail?: string;
  image?: string;
  link?: string;
}) {
  const className =
    "block overflow-hidden rounded-[var(--radius-lg)] bg-white hairline shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]";

  const content = (
    <>
      <div className="relative h-40">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <PhotoPlaceholder className="absolute inset-0" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
          {time}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--ink)]">{name}</h3>
        {detail && <p className="mt-2 text-sm text-[var(--ink-soft)]">{detail}</p>}
      </div>
    </>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
