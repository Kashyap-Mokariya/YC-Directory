import React from 'react';
import styled from 'styled-components';

interface SubmitButtonProps {
    children: React.ReactNode;
    isPending: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isPending }) => {
    return (
        <StyledWrapper>
            <button type='submit' className="comic-button ml-[160px]" disabled = {isPending}>
                {children}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .comic-button {
    display: inline-block;
    padding: 10px 60px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: black;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 5px 5px 0px black;
    transition: all 0.3s ease;
    scale: 0.85;
    align-items: center;
  }

  .comic-button:hover {
    background-color: #ff5252;
    color: white;
    border: 2px solid black;
    box-shadow: 5px 5px 0px black;
    scale: 1;
  }

  .comic-button:active {
    background-color: #fcf414;
    box-shadow: none;
    transform: translateY(4px);
  }`;

export default SubmitButton;


// import React from 'react';
// import styled from 'styled-components';

// interface SubmitButtonProps {
//     children: React.ReactNode;
//     isPending: boolean;
// }

// const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isPending }) => {
//     return (
//         <StyledWrapper>
//             <button type='submit' className='cosmic-button' disabled={isPending}>
//                 {children}
//             </button>
//         </StyledWrapper>
//     );
// }

// const StyledWrapper = styled.div`
//   .comic-button {
//     display: inline-block;
//     padding: 10px 20px;
//     font-size: 24px;
//     font-weight: bold;
//     text-align: center;
//     text-decoration: none;
//     color: black;
//     background-color: white;
//     border: 2px solid #000;
//     border-radius: 10px;
//     box-shadow: 5px 5px 0px black;
//     transition: all 0.3s ease;
//     scale: 0.9;
//   }

//   .comic-button:hover {
//     background-color: #ff5252;
//     color: white;
//     border: 2px solid black;
//     box-shadow: 5px 5px 0px black;
//     scale: 1;
//   }

//   .comic-button:active {
//     background-color: #fcf414;
//     box-shadow: none;
//     transform: translateY(4px);
//   }`;

// export default SubmitButton;
