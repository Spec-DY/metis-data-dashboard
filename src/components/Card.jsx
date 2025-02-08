import React from "react";
import styled from "styled-components";

const Card = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: auto;
    height: auto;
    border-radius: 24px;
    // background: #e0e0e0;
    box-shadow: 15px 0px 20px #e8e8e8, -15px 0px 20px #e8e8e8;
  }
`;

export default Card;
