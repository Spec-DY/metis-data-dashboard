import React from "react";
import styled from "styled-components";

export default function BacktoTop() {
  return (
    <StyledWrapper>
      <a id="scroll-up" className="scroll-up" href="#">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="rgba(255,255,255,1)"
            d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
          ></path>
        </svg>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* <reset-style> ============================ */
  a {
    text-decoration: none;
  }
  /* <main-style> ============================ */
  .scroll-up {
    /* position: fixed; */
    right: 3rem;
    bottom: -50%;
    z-index: 10;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: rgba(29, 29, 31, 0.7);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: bottom 0.4s, transform 0.4s;
  }

  .scroll-up:hover {
    transform: translateY(-0.25rem);
  }

  /* Show scroll-up */
  ._show-scroll {
    bottom: 3rem;
  }

  @media (max-width: 1199.98px) {
    .scroll-up {
      right: 1rem;
    }
  }
`;
