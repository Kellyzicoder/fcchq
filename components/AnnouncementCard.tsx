import Image from "next/image";

export function AnnouncementCard({
  name,
  image,
  detail,
}: {
  name: string;
  image: string;
  detail?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] bg-white hairline shadow-[var(--shadow-sm)]">
      <div className="relative aspect-video">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      {detail && (
        <div className="p-4">
          <p className="text-sm text-[var(--ink-soft)]">{detail}</p>
        </div>
      )}
    </div>
  );
}
