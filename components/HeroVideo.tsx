export function HeroVideo() {
  return (
    <video
      src="/videos/jesus-march.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
