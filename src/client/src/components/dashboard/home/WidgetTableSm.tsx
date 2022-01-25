import React from "react";
import styled from "styled-components";
import WidgetListItem from "./WidgetListItem";

const Container = styled.div`
  flex: 2;
  padding: 1.5rem;
  margin-right: 2rem;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const WidgetTableSm = ({ recentNewDevices }: any) => {
  return (
    <Container>
      <h2>Recent Devices</h2>
      <ul>
        {recentNewDevices.map((device: any) => {
          return (
            <WidgetListItem
              type="device"
              key={device.id}
              name={device.model.name}
              time={device.created_on}
            />
          );
        })}
      </ul>
    </Container>
  );
};

export default WidgetTableSm;
