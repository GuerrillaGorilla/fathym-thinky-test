import React from "react";
import { RiLockLine, RiCloudFill, RiWifiFill, RiNetworkChartLine } from "react-icons/ri";
// Import the icons you need from the react-icons library

const Slide = () => {
  return (
    <div>
      <ul>
        <li>
          <RiLockLine />
          Increased demand for data security and privacy
        </li>
        <li>
          <RiNetworkChartLine />
          Growing adoption of IoT devices
        </li>
        <li>
          <RiCloudFill />
          Cloud computing and edge computing
        </li>
        <li>
          <RiWifiFill />
          Remote work and telecommuting
        </li>
        <li>
          <RiLockLine />
          Industry-specific requirements
        </li>
      </ul>
    </div>
  );
};

export default Slide;