import React from "react";
import { SVGAttributes } from "react";

function Clock(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.26" d="M3.757 2.274a2.52 2.52 0 00-1.782 1.782M11.36 2.274a2.52 2.52 0 011.78 1.782"></path>
      <path fill="currentColor" fillRule="evenodd" d="M7.558 12.896a5.039 5.039 0 100-10.078 5.039 5.039 0 000 10.078zm.63-7.558a.63.63 0 00-1.26 0V7.7c0 .434.353.787.788.787h1.732a.63.63 0 000-1.26h-1.26v-1.89z" clipRule="evenodd"></path>
    </svg>
  );
}

function LocationOn(props: React.SVGAttributes<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
        <path fill="currentColor" d="M7.558 14.39a.586.586 0 01-.378-.127.765.765 0 01-.236-.33 8.766 8.766 0 00-.756-1.654c-.294-.514-.708-1.118-1.244-1.81a14.25 14.25 0 01-1.307-1.984c-.325-.63-.488-1.391-.488-2.284 0-1.228.425-2.267 1.276-3.117.86-.861 1.905-1.292 3.133-1.292s2.267.43 3.118 1.292c.86.85 1.29 1.89 1.29 3.117 0 .956-.183 1.753-.55 2.394-.357.63-.772 1.254-1.244 1.873-.567.756-.997 1.386-1.291 1.89a8.896 8.896 0 00-.709 1.575.71.71 0 01-.252.346.616.616 0 01-.362.11zm0-6.614c.44 0 .814-.152 1.118-.457a1.52 1.52 0 00.457-1.118c0-.44-.153-.813-.457-1.118a1.52 1.52 0 00-1.118-.456c-.44 0-.813.152-1.118.456a1.52 1.52 0 00-.457 1.118c0 .441.153.814.457 1.118a1.52 1.52 0 001.118.457z"></path>
      </svg>
    );
}

function PeopleFill(props: React.SVGAttributes<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
        <g clipPath="url(#clip0_374_526)">
          <path fill="currentColor" d="M6.612 13.99s-.945 0-.945-.945c0-.944.945-3.778 4.723-3.778s4.723 2.834 4.723 3.778c0 .945-.945.945-.945.945H6.612zm3.778-5.667a2.834 2.834 0 100-5.667 2.834 2.834 0 000 5.667zM4.927 13.99a2.116 2.116 0 01-.204-.945c0-1.28.642-2.597 1.828-3.513a5.95 5.95 0 00-1.828-.265C.945 9.267 0 12.101 0 13.045c0 .945.945.945.945.945h3.982zM4.25 8.323a2.361 2.361 0 100-4.723 2.361 2.361 0 000 4.723z"></path>
        </g>
        <defs>
          <clipPath id="clip0_374_526">
            <path fill="currentColor" d="M0 0H15.113V15.113H0z" transform="translate(0 .766)"></path>
          </clipPath>
        </defs>
      </svg>
    );
}

function LockClosedIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  );
}

function LockOpenIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  );
}

function Search(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 163 163" {...props}>
      <rect width="32.662" height="138.812" x="78.66" y="10.158" fill="currentColor" rx="5" transform="rotate(11.034 78.66 10.158)">
      </rect>
      <rect width="32.662" height="138.812" x="152.655" y="78.66" fill="currentColor" rx="5" transform="rotate(101.034 152.655 78.66)"
      ></rect>
    </svg>
  );
}

export { Clock, LocationOn, PeopleFill, LockClosedIcon, LockOpenIcon, Search };