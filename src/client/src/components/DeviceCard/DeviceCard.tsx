import React from "react";
import { DeviceCardParams } from "../../interfaces";

const DeviceCard: React.FC<DeviceCardParams> = ({
  className,
  availability,
  deviceId,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <div className="status">{availability}</div>
      <div className="content">
        <strong>{deviceId}</strong>
      </div>
    </div>
  );
};

export default DeviceCard;
