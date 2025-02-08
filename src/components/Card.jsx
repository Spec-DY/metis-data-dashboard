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
    box-shadow: 15px 0px 20px #e8e8e8, -15px 0px 20px #e8e8e8;

    @media (max-width: 640px) {
      border-radius: 16px;
      box-shadow: 8px 0px 12px #e8e8e8, -8px 0px 12px #e8e8e8;
    }
  }
`;

export default Card;
