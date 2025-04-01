interface Props {
  className?: string;
}

export default function Logo({ className = "" }: Props) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.96 116.65"
      className={`fill-accent size-lg ${className}`}
      strokeWidth={10}
    >
      <title>Logo</title>

      <g id="Layer_1-2" data-name="Layer 1">
        <path
          className="cls-1"
          fill="var(--accent)"
          strokeWidth={10}
          d="M116.04,0H11.93C5.34,0,0,5.34,0,11.93v92.8c0,6.59,5.34,11.93,11.93,11.93h104.11c6.59,0,11.93-5.34,11.93-11.93V11.93c0-6.59-5.34-11.93-11.93-11.93ZM41.22,67.21c-14.66,0-26.54-11.88-26.54-26.54s11.88-26.54,26.54-26.54,26.54,11.88,26.54,26.54-11.88,26.54-26.54,26.54ZM89.52,104.34c-14.66,0-26.54-11.88-26.54-26.54s11.88-26.54,26.54-26.54,26.54,11.88,26.54,26.54-11.88,26.54-26.54,26.54Z"
        />
      </g>
    </svg>
  );
}
