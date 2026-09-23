import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'markOnly' | 'wordmarkOnly';
  weight?: 'light' | 'regular';
  className?: string;
  markClassName?: string;
  textClassName?: string;
  roofColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  className = '',
  markClassName = 'w-9 h-7 sm:w-10 sm:h-8',
  textClassName = 'text-white',
  roofColor,
}) => {
  // Determine roof & window color: if textClassName has text-white, default to white; otherwise default to #0C1730
  const isDarkBg = textClassName.includes('text-white');
  const roof = roofColor || (isDarkBg ? '#FFFFFF' : '#0C1730');

  // Exact Logo.svg structure with customizable roof/window color
  const logoMark = (
    <svg 
      viewBox="0 0 100 70" 
      fill="none" 
      className={markClassName}
      aria-label="نشان سان پرتو انرژی"
    >
      {/* Sun Rays in Golden Sun Yellow */}
      <g stroke="#F2B134" strokeWidth="3.4" strokeLinecap="round">
        <line x1="1" y1="56" x2="16" y2="56" />
        <line x1="9" y1="39" x2="22" y2="44.5" />
        <line x1="15" y1="21.5" x2="26.5" y2="33" />
        <line x1="32" y1="12" x2="38.5" y2="25.5" />
        <line x1="50" y1="2" x2="50" y2="18" />
        <line x1="68" y1="12" x2="61.5" y2="25.5" />
        <line x1="85" y1="21.5" x2="73.5" y2="33" />
        <line x1="91" y1="39" x2="78" y2="44.5" />
        <line x1="99" y1="56" x2="84" y2="56" />
      </g>
      {/* Sun Dome Semi-Circle */}
      <path d="M 25 56 A 25 25 0 0 1 75 56 Z" fill="#F2B134" />
      {/* House Roof in configurable color */}
      <path d="M 19 63 L 50 37 L 81 63" stroke={roof} strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* 4-Pane Window under Roof */}
      <g fill={roof}>
        <rect x="44.5" y="44.5" width="4.2" height="4.2" rx="0.8" />
        <rect x="51.3" y="44.5" width="4.2" height="4.2" rx="0.8" />
        <rect x="44.5" y="51.3" width="4.2" height="4.2" rx="0.8" />
        <rect x="51.3" y="51.3" width="4.2" height="4.2" rx="0.8" />
      </g>
    </svg>
  );

  // Exact Logotype light vector matching the user's Logotype light.svg
  const logotypeLight = (
    <svg 
      viewBox="0 0 310 50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="h-6 sm:h-7 w-auto"
      aria-label="سان پرتو انرژی"
    >
      {/* سان */}
      <path d="M 302 24 C 302 18, 296 18, 296 23 C 296 29, 290 29, 290 23 C 290 18, 284 18, 284 23 L 284 31 L 274 31 L 274 10" />
      <path d="M 262 20 L 262 29 C 262 36, 244 36, 244 29 L 244 20" />
      <circle cx="253" cy="24" r="2.2" fill="currentColor" stroke="none" />

      {/* پرتو */}
      <path d="M 230 20 L 230 31 L 208 31 L 208 20" />
      <circle cx="223" cy="38" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="215" cy="38" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="219" cy="44" r="2.2" fill="currentColor" stroke="none" />
      <path d="M 198 25 C 195 32, 189 36, 184 37" />
      <path d="M 174 20 L 174 31 L 154 31 L 154 20" />
      <circle cx="168" cy="14" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="160" cy="14" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="143" cy="23" r="5" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M 141 28 C 139 33, 134 36, 130 37" />

      {/* انرژی */}
      <line x1="120" y1="10" x2="120" y2="31" />
      <path d="M 108 20 L 108 31 L 96 31" />
      <circle cx="108" cy="14" r="2.2" fill="currentColor" stroke="none" />
      <path d="M 90 25 C 87 32, 81 36, 76 37" />
      <path d="M 66 25 C 63 32, 57 36, 52 37" />
      <circle cx="69" cy="16" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="61" cy="16" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="65" cy="10" r="2.2" fill="currentColor" stroke="none" />
      <path d="M 42 22 C 38 27, 34 31, 28 34 L 6 34" />
    </svg>
  );

  if (variant === 'markOnly') {
    return logoMark;
  }

  if (variant === 'wordmarkOnly') {
    return (
      <div className={`${textClassName} ${className}`}>
        {logotypeLight}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {logoMark}
        <div className={`flex flex-col items-center ${textClassName}`}>
          {logotypeLight}
          <span className="font-semibold text-[10px] tracking-wider opacity-85 mt-0.5">SunParto Energy</span>
        </div>
      </div>
    );
  }

  // Horizontal variant: Logo.svg on the right, Logotype light in front of it (next to it)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoMark}
      <div className={`flex flex-col justify-center text-right ${textClassName}`}>
        {logotypeLight}
        <span className="text-[10px] sm:text-[11px] opacity-75 font-mono tracking-wider pt-0.5">
          SunParto Energy
        </span>
      </div>
    </div>
  );
};
