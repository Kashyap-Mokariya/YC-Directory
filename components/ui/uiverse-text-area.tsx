import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const UiverseTextAreassr = dynamic(() => import('./uiverse-text-area'), { ssr: false });


interface UiverseTextAreaProp {
    children: React.ReactNode;
}

const UiverseTextArea: React.FC<UiverseTextAreaProp> = ({ children }) => {
    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .input {
    font-family: "SF Pro";
    max-width: 900px;
    min-width: 600px;
    min-height: 90px;
    padding: 0.875rem;
    font-size: 1rem;
    border: 1.5px solid #000;
    border-radius: 1rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
  }

  .input:focus {
    box-shadow: 8px 10px 0 black;
  }`;

export default UiverseTextArea;
