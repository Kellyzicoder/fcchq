import Image from "next/image";

export function AnnouncementCard({
  name,
  image,
  detail,
  link,
}: {
  name: string;
  image: string;
  detail?: string;
  link?: string;
}) {
  const content = (
    <>
      <div className="relative aspect-video">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      {detail && (
        <div className="p-4">
          <p className="text-sm text-[var(--ink-soft)]">{detail}</p>
        </div>
      )}
    </>
  );

  const className =
    "block overflow-hidden rounded-[var(--radius-lg)] bg-white hairline shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]";

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
