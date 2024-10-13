import React from "react";

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.26"
        d="M3.757 2.274a2.52 2.52 0 00-1.782 1.782M11.36 2.274a2.52 2.52 0 011.78 1.782"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.558 12.896a5.039 5.039 0 100-10.078 5.039 5.039 0 000 10.078zm.63-7.558a.63.63 0 00-1.26 0V7.7c0 .434.353.787.788.787h1.732a.63.63 0 000-1.26h-1.26v-1.89z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function LocationOn(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
      >
        <path
          fill="currentColor"
          d="M7.558 14.39a.586.586 0 01-.378-.127.765.765 0 01-.236-.33 8.766 8.766 0 00-.756-1.654c-.294-.514-.708-1.118-1.244-1.81a14.25 14.25 0 01-1.307-1.984c-.325-.63-.488-1.391-.488-2.284 0-1.228.425-2.267 1.276-3.117.86-.861 1.905-1.292 3.133-1.292s2.267.43 3.118 1.292c.86.85 1.29 1.89 1.29 3.117 0 .956-.183 1.753-.55 2.394-.357.63-.772 1.254-1.244 1.873-.567.756-.997 1.386-1.291 1.89a8.896 8.896 0 00-.709 1.575.71.71 0 01-.252.346.616.616 0 01-.362.11zm0-6.614c.44 0 .814-.152 1.118-.457a1.52 1.52 0 00.457-1.118c0-.44-.153-.813-.457-1.118a1.52 1.52 0 00-1.118-.456c-.44 0-.813.152-1.118.456a1.52 1.52 0 00-.457 1.118c0 .441.153.814.457 1.118a1.52 1.52 0 001.118.457z"
        ></path>
      </svg>
    );
}

function PeopleFill(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
      >
        <g clipPath="url(#clip0_374_526)">
          <path
            fill="currentColor"
            d="M6.612 13.99s-.945 0-.945-.945c0-.944.945-3.778 4.723-3.778s4.723 2.834 4.723 3.778c0 .945-.945.945-.945.945H6.612zm3.778-5.667a2.834 2.834 0 100-5.667 2.834 2.834 0 000 5.667zM4.927 13.99a2.116 2.116 0 01-.204-.945c0-1.28.642-2.597 1.828-3.513a5.95 5.95 0 00-1.828-.265C.945 9.267 0 12.101 0 13.045c0 .945.945.945.945.945h3.982zM4.25 8.323a2.361 2.361 0 100-4.723 2.361 2.361 0 000 4.723z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_374_526">
            <path
              fill="currentColor"
              d="M0 0H15.113V15.113H0z"
              transform="translate(0 .766)"
            ></path>
          </clipPath>
        </defs>
      </svg>
    );
}

function Unlock(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="7"
        fill="none"
        viewBox="0 0 7 7"
        {...props}
      >
        <g clipPath="url(#clip0_486_946)">
          <path
            fill="currentColor"
            d="M4.825.64a.763.763 0 00-.763.764v1.525a.763.763 0 01.763.763V5.6a.763.763 0 01-.763.763H1.773A.763.763 0 011.01 5.6V3.692a.763.763 0 01.763-.763H3.68V1.404a1.144 1.144 0 112.289 0v1.525a.19.19 0 11-.381 0V1.404A.763.763 0 004.825.64zM1.773 3.31a.381.381 0 00-.381.382V5.6a.381.381 0 00.381.382h2.289a.381.381 0 00.381-.382V3.692a.381.381 0 00-.381-.381H1.773z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_486_946">
            <path
              fill="transparent"
              d="M0 0H6.103V6.103H0z"
              transform="translate(.629 .26)"
            ></path>
          </clipPath>
        </defs>
      </svg>
    );
}

export { Clock, LocationOn, PeopleFill, Unlock };