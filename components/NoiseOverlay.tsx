export default function NoiseOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full opacity-[0.022] mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
