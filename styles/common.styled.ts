import styled from "@emotion/styled";
import { Button } from "antd";

export const CustomButton = styled(Button)<{ colorreverse?: boolean }>`
  font-size: x-large;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 100px;
  color: #158041;
  background-color: ${(props) => (props.colorreverse ? "white" : "black")};

  &:hover {
    border: solid ${(props) => (props.colorreverse ? "black" : "none")};
    background-color: ${(props) => (props.colorreverse ? "" : "white")};
  }
`;

export const CategoryButton = styled(Button)`
  font-size: x-large;
  height: 60px;
  color: #158041;
  margin-bottom: 20px;
`;

export const CustomWrap = styled.div`
  min-height: 100vh;
  height: 100%;
  padding: 150px 240px;
`;

export const CustomWhiteWrap = styled.div`
  margin-top: 80px;
  padding: 80px 240px;
  background-color: #fff;
`;

export const CustomTitle = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 3rem;
`;

export const ItemTitle = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 2rem;
`;

export const ItemList = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2.5rem 0;
  padding-bottom: 2.5rem;
`;

export const CartInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
