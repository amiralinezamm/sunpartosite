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
      viewBox="0 0 1920 1080"
      className="h-6 sm:h-7 w-auto"
      aria-label="سان پرتو انرژی"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d="M1392.2,459c-5,0-9,4-9,9v116.7c0,10.1-8.2,18.3-18.3,18.3h-29.4c-33.2,0-60.2-27-60.2-60.2v-11.8c0-29.8,24.2-54,54-54s9-4,9-9-4-9-9-9c-39.7,0-72,32.3-72,72v11.8c0,43.1,35.1,78.2,78.2,78.2h29.4c20,0,36.3-16.3,36.3-36.3v-116.7c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M740.3,459c-5,0-9,4-9,9v144c0,5,4,9,9,9s9-4,9-9v-144c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M452.3,531c-5,0-9,4-9,9v72c0,5,4,9,9,9s9-4,9-9v-72c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M1212.2,459c-5,0-9,4-9,9v21.9c0,22.7-18.4,41.1-41.1,41.1h-66.9c-17,0-30.9,13.9-30.9,30.9v50.1c0,5,4,9,9,9s9-4,9-9v-50.1c0-7.1,5.8-12.9,12.9-12.9h66.9c32.6,0,59.1-26.5,59.1-59.1v-21.9c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M685.1,459c-5,0-9,4-9,9v21.9c0,22.7-18.4,41.1-41.1,41.1h-106.8c-17,0-30.9,13.9-30.9,30.9v50.1c0,5,4,9,9,9s9-4,9-9v-50.1c0-7.1,5.8-12.9,12.9-12.9h106.8c32.6,0,59.1-26.5,59.1-59.1v-21.9c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M1064.3,468c0-5-4-9-9-9s-9,4-9,9v21.9c0,22.7-18.4,41.1-41.1,41.1h-129.9v-27c0-24.8-20.2-45-45-45s-45,20.2-45,45,20.2,45,45,45h27v63c0,5,4,9,9,9s9-4,9-9v-63h129.9c32.6,0,59.1-26.5,59.1-59.1v-21.9ZM830.3,531c-14.9,0-27-12.1-27-27s12.1-27,27-27,27,12.1,27,27v27h-27Z"/>
      <path fill="currentColor" d="M1212.2,576h-72c-5,0-9,4-9,9s4,9,9,9h63v18c0,5,4,9,9,9s9-4,9-9v-27c0-5-4-9-9-9Z"/>
      <path fill="currentColor" d="M376,531h-40.7v-41.1c0-7.1,5.8-12.9,12.9-12.9h32.1c5,0,9-4,9-9s-4-9-9-9h-32.1c-17,0-30.9,13.9-30.9,30.9v50.1c0,5,4,9,9,9h49.7c7.3,0,13.3,6,13.3,13.3v28.2c0,6.9-5.6,12.5-12.5,12.5h-54.2c-32.7,0-59.3-26.6-59.3-59.3v-57.7c0-5-4-9-9-9s-9,4-9,9v57.7c0,42.6,34.7,77.3,77.3,77.3h54.2c16.8,0,30.5-13.7,30.5-30.5v-28.2c0-17.2-14-31.3-31.3-31.3Z"/>
      <path fill="currentColor" d="M606,471.4c.2.6.5,1.1.8,1.6.3.5.7,1,1.1,1.4.4.4.9.8,1.4,1.1.5.3,1,.6,1.6.8.5.2,1.1.4,1.7.5.6.1,1.2.2,1.8.2s1.2,0,1.8-.2c.6-.1,1.1-.3,1.7-.5.5-.2,1.1-.5,1.5-.8.5-.3,1-.7,1.4-1.1.4-.4.8-.9,1.1-1.4s.6-1,.8-1.6c.2-.5.4-1.1.5-1.7.1-.6.2-1.2.2-1.8,0-2.4-1-4.7-2.6-6.4-.4-.4-.9-.8-1.4-1.1-.5-.3-1-.6-1.5-.8-.5-.2-1.1-.4-1.7-.5-1.2-.2-2.4-.2-3.5,0-.6.1-1.1.3-1.7.5-.5.2-1.1.5-1.6.8-.5.3-.9.7-1.4,1.1-1.7,1.7-2.6,4-2.6,6.4s0,1.2.2,1.8c.1.6.3,1.1.5,1.7Z"/>
      <path fill="currentColor" d="M1332.6,531.7c-.5-.2-1.1-.4-1.7-.5-1.2-.2-2.4-.2-3.5,0-.6.1-1.1.3-1.7.5-.5.2-1.1.5-1.6.8-.5.3-1,.7-1.4,1.1-.4.4-.8.9-1.1,1.4s-.6,1-.8,1.6c-.2.5-.4,1.1-.5,1.7-.1.6-.2,1.2-.2,1.8s0,1.2.2,1.8c.1.6.3,1.1.5,1.7.2.6.5,1.1.8,1.6s.7,1,1.1,1.4c.4.4.9.8,1.4,1.1.5.3,1,.6,1.6.8.5.2,1.1.4,1.7.5.6.1,1.2.2,1.8.2s1.2,0,1.8-.2c.6-.1,1.1-.3,1.7-.5.5-.2,1.1-.5,1.6-.8.5-.3.9-.7,1.4-1.1,1.7-1.7,2.6-4,2.6-6.4s-1-4.7-2.6-6.4c-.4-.4-.9-.8-1.4-1.1-.5-.3-1-.6-1.6-.8Z"/>
      <path fill="currentColor" d="M444,471.4c.2.6.5,1.1.8,1.6.3.5.7,1,1.1,1.4,1.7,1.7,4,2.6,6.4,2.6s1.2,0,1.8-.2c.6-.1,1.1-.3,1.7-.5.5-.2,1.1-.5,1.5-.8.5-.3,1-.7,1.4-1.1.4-.4.8-.9,1.1-1.4s.6-1,.8-1.6c.2-.5.4-1.1.5-1.7.1-.6.2-1.2.2-1.8,0-2.4-1-4.7-2.6-6.4-.4-.4-.9-.8-1.4-1.1-.5-.3-1-.6-1.5-.8-.5-.2-1.1-.4-1.7-.5-2.9-.6-6,.4-8.1,2.5-1.7,1.7-2.6,4-2.6,6.4s0,1.2.2,1.8c.1.6.3,1.1.5,1.7Z"/>
      <path fill="currentColor" d="M479.3,495h-54c-5,0-9,4-9,9s4,9,9,9h54c5,0,9-4,9-9s-4-9-9-9Z"/>
      <path fill="currentColor" d="M929.3,477h54c5,0,9-4,9-9s-4-9-9-9h-54c-5,0-9,4-9,9s4,9,9,9Z"/>
      <path fill="currentColor" d="M1665.4,486c-5,0-9,4-9,9v82.3c0,14.2-11.5,25.7-25.7,25.7h-.8c-14.2,0-25.7-11.5-25.7-25.7v-55.3c0-5-4-9-9-9s-9,4-9,9v55.3c0,14.2-11.5,25.7-25.7,25.7s-25.7-11.5-25.7-25.7v-46.3c0-5-4-9-9-9s-9,4-9,9v46.3c0,14.2-11.5,25.7-25.7,25.7h-24.4c-10.1,0-18.3-8.2-18.3-18.3v-116.7c0-5-4-9-9-9s-9,4-9,9v116.7c0,20,16.3,36.3,36.3,36.3h24.4c14.1,0,26.7-6.7,34.7-17.2,8,10.4,20.6,17.2,34.7,17.2s26.7-6.7,34.7-17.2c8,10.4,20.6,17.2,34.7,17.2h.8c24.1,0,43.7-19.6,43.7-43.7v-82.3c0-5-4-9-9-9Z"/>
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
