import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export default function SpinnerComponent() {
  return (
    <div className="flex justify-center items-center h-80">
      <Spinner />
    </div>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${spin} 0.5s linear infinite;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 3px solid #1588411f;
  border-top: 3px solid #158841;
  border-radius: 50%;
`;
