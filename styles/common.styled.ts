import styled from "@emotion/styled";
import { Button } from "antd";

export const CustomButton = styled(Button)<{ colorReverse?: boolean }>`
  font-size: x-large;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 100px;
  color: #158041;
  background-color: ${(props) => (props.colorReverse ? "white" : "black")};

  &:hover {
    border: solid ${(props) => (props.colorReverse ? "black" : "none")};
    background-color: ${(props) => (props.colorReverse ? "" : "white")};
  }
`;
