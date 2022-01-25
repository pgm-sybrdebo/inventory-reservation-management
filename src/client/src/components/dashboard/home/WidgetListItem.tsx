import React from "react";
import styled from "styled-components";
import defaultImg from "../../../assets/device.jpg";
import moment from "moment";
import { WidgetListItemProps } from "../../../interfaces";

const WidgetListItemComponent = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  span {
    // display: block;
  }
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  max-width: 10rem;
  text-align: center;
`;

const Small = styled.span`
  font-size: 0.8rem;
  margin-right: 0.2rem;
`;

const WidgetListItem = ({
  name,
  time,
  type,
  firstName,
  lastName,
  start,
  end,
}: WidgetListItemProps) => {
  let dateString;
  let startString;
  let endString;
  let t = time ? time : new Date();
  let s = start ? start : new Date();
  let e = end ? end : new Date();
  if (type === "device") {
    const date = new Date(t);
    dateString =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  if (type === "reservation") {
    const dateStart = new Date(s);
    startString =
      dateStart.getFullYear() +
      "-" +
      (dateStart.getMonth() + 1) +
      "-" +
      dateStart.getDate();
    const dateEnd = new Date(e);
    endString =
      dateEnd.getFullYear() +
      "-" +
      (dateEnd.getMonth() + 1) +
      "-" +
      dateEnd.getDate();
  }

  return (
    <WidgetListItemComponent>
      {type === "device" && (
        <>
          <Image src={defaultImg} alt="device" />
          <Name>{name}</Name>
          <div>
            <Small>New from</Small>
            <span>{moment(dateString).format("DD-MM-YYYY")}</span>
          </div>
        </>
      )}
      {type === "reservation" && (
        <>
          <div>
            <span>{firstName}</span>
            <span> {lastName}</span>
          </div>
          <span>{name}</span>
          <div>
            <span>{moment(startString).format("DD-MM-YYYY")}</span>
            <span> - </span>
            <span>{moment(endString).format("DD-MM-YYYY")}</span>
          </div>
        </>
      )}
    </WidgetListItemComponent>
  );
};

export default WidgetListItem;
