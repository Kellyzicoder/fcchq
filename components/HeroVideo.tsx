// Static poster frame (in /public) so the hero paints instantly while the
// video streams in behind it.
const POSTER = "/videos/jesus-march-poster.webp";

export function HeroVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
