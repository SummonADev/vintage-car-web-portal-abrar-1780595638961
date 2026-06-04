interface VCCPLogoProps {
  size?: number;
  className?: string;
}

export default function VCCPLogo({ size = 48, className = '' }: VCCPLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="60" cy="60" r="58" stroke="#d4af37" strokeWidth="3" fill="#1a1a2e" />
      {/* Inner circle ring */}
      <circle cx="60" cy="60" r="50" stroke="#d4af37" strokeWidth="1.5" fill="none" />
      {/* Vintage car silhouette */}
      <path
        d="M25 72 L30 72 L33 62 L42 55 L55 52 L75 52 L85 55 L92 62 L95 72 L95 76 L88 76 L88 72 C88 69 86 67 83 67 C80 67 78 69 78 72 L78 76 L42 76 L42 72 C42 69 40 67 37 67 C34 67 32 69 32 72 L32 76 L25 76 Z"
        fill="#d4af37"
        opacity="0.9"
      />
      {/* Front wheel */}
      <circle cx="37" cy="72" r="6" fill="#1a1a2e" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="37" cy="72" r="2.5" fill="#d4af37" />
      {/* Rear wheel */}
      <circle cx="83" cy="72" r="6" fill="#1a1a2e" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="83" cy="72" r="2.5" fill="#d4af37" />
      {/* Window */}
      <path
        d="M45 56 L53 53 L72 53 L80 56 L75 56 L70 48 L50 48 L45 56 Z"
        fill="#f5f0e8"
        opacity="0.3"
      />
      {/* Text: VCCP */}
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="16"
        fill="#d4af37"
        letterSpacing="3"
      >
        VCCP
      </text>
      {/* Bottom text */}
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7"
        fill="#d4af37"
        letterSpacing="1.5"
        opacity="0.8"
      >
        EST. 2024
      </text>
      {/* Decorative dots on the circle */}
      <circle cx="60" cy="8" r="2" fill="#d4af37" />
      <circle cx="60" cy="112" r="2" fill="#d4af37" />
      <circle cx="8" cy="60" r="2" fill="#d4af37" />
      <circle cx="112" cy="60" r="2" fill="#d4af37" />
    </svg>
  );
}
