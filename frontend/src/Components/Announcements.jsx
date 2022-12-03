import React from "react";
import styled from "styled-components";

const Announcement = styled.div`
  text-align: center;
  background-color: teal;
  padding: 0.5rem 0px;
`;

const Announcements = () => {
  return <Announcement>Super Deal! Free Shipping over 50$</Announcement>;
};

export default Announcements;
