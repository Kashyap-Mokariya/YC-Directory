'use client'
import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';


interface DetailsButtonProps {
    children: React.ReactNode;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ children }) => {
    return (
        <StyledWrapper>
            <button className="button">
                <p className="button-text">{children}</p> <p className="iconer"><svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" /><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" /></svg></p>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    border: none;
    overflow: hidden;
    background: black;
    color: #fff;
  }

  .button-text {
    transform: translateX(15px);
    font-size: 1em;
    font-weight: 500;
    transition-duration: 0.3s;
  }

  .iconer {
    transform: translateY(35px);
    transition-duration: 0.3s;
  }

  .button:hover .button-text {
    transform: translateX(0px);
    padding-left: 8px; 
  }

  .button:hover .iconer {
    transform: translateY(0px);
  }`;

// export default DetailsButton;

export default dynamic(() => Promise.resolve(DetailsButton), { ssr: false });
