import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      className="fill-sky-400/20 stroke-sky-500"
    />
    <path
      d="M12 4v1m5.66 1.344-.828.828m3.173 4.832h-1m-1.345 5.66-.828-.828M12 20.01V19m-5.66-1.336.835-.836m-3.18-4.824h1.01M6 6l.835.836"
      className="stroke-sky-500"
    />
  </svg>
);
export default SvgComponent;
