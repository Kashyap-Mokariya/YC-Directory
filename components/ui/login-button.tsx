'use client'

import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

interface LoginButtonProps {
    children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
    return (
        <StyledWrapper>
            <button>
                {children}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
   padding: 5px 13px;
   border: unset;
   border-radius: 15px;
   color: #212121;
   z-index: 1;
   background: #e8e8e8;
   position: relative;
   font-weight: 600;
   font-size: 15px;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms;
   overflow: hidden;
  }

  button::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 0;
   border-radius: 15px;
   background-color: #212121;
   z-index: -1;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms;
  }

  button:hover {
   color: #e8e8e8;
  }

  button:hover::before {
   width: 100%;
  }
`;

// export default LoginButton;

export default dynamic(() => Promise.resolve(LoginButton), { ssr: false });
