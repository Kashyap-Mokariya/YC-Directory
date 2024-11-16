import React from 'react';
import styled from 'styled-components';

interface UiverseInputProps {
    children: React.ReactNode;
}

const UiverseInput: React.FC<UiverseInputProps> = ({children}) =>{
    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .input {
    font-family: "work-sans";
    max-width: 900px;
    min-width: 600px;
    min-height: 60px;
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

export default UiverseInput;
