export function HeroVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
