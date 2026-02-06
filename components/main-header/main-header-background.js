export default function MainHeaderBackground() {
  return (
    <div
      className={
        'absolute inset-x-0 top-0 z-0 min-h-[14rem] w-full ' +
        'sm:min-h-[12rem] md:min-h-[11rem]'
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
      >
        <defs>
          <linearGradient
            id="header-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0f766e" stopOpacity="1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Full rectangle with wavy bottom - wave positioned low so teal covers header */}
        <path
          fill="url(#header-gradient)"
          d={
            'M0,0 L1440,0 L1440,320 L1392,310 C1344,300,1248,285,1152,278 ' +
            'C1056,271,960,271,864,278 C768,285,672,300,576,308 ' +
            'C480,316,384,316,288,308 C192,300,96,285,48,278 L0,271 Z'
          }
        />
      </svg>
    </div>
  );
}
