import styled from "@emotion/styled";
import { Button } from "antd";

export const Wrapper = styled.div<{ readOnly: boolean }>`
  width: ${(props) => (props.readOnly ? "" : "calc(100% - 130px)")};
  padding: ${(props) => (props.readOnly ? "" : "0 10px")};
  color: #333;
  ${(props) =>
    props.readOnly
      ? ""
      : "border: 1px solid rgba(0,0,0,0.1); border-radius: 8px"}
`;

export const CustomButton = styled(Button)`
  font-size: x-large;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 100px;
  color: #158041;
  background-color: black;

  &:hover {
    background-color: #fff;
  }

  @media (min-width: 0px) {
    font-size: 14px;
    height: 40px;
  }

  @media (min-width: 640px) {
    font-size: 14px;
    height: 40px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    height: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    height: 48px;
  }

  @media (min-width: 1280px) {
    font-size: 24px;
    height: 60px;
  }
`;

export const CustomWhiteButton = styled(Button)`
  font-size: x-large;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 100px;
  color: #158041;
  background-color: #fff;

  &:hover {
    border: solid black;
  }

  @media (min-width: 0px) {
    font-size: 14px;
    height: 40px;
  }

  @media (min-width: 640px) {
    font-size: 14px;
    height: 40px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    height: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    height: 48px;
  }

  @media (min-width: 1280px) {
    font-size: 24px;
    height: 60px;
  }
`;

export const CategoryButton = styled(Button)<{ selected?: boolean }>`
  font-size: x-large;
  font-weight: 600;
  height: 60px;
  color: ${(props) => (props.selected ? "#000000" : "#158041")};

  @media (min-width: 0px) {
    font-size: 16px;
    height: 16px;
  }

  @media (min-width: 640px) {
    font-size: 16px;
    height: 20px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    height: 30px;
  }
`;

export const CustomWrap = styled.div<{ padding?: string }>`
  min-height: 100vh;
  height: 100%;
  padding: ${(props) => (props.padding ? props.padding : "150px 240px")};

  @media (max-width: 1024px) {
    padding: 120px 30px;
  }
`;

export const CustomWhiteWrap = styled.div`
  margin-top: 80px;
  padding: 80px 240px;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 30px 0px;
  }

  @media (max-width: 1024px) {
    padding: 80px 50px;
  }
`;

export const CustomTitle = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 3rem;
  @media (max-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

export const ItemTitle = styled.p`
  margin-bottom: 1.5rem;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;

  @media (max-width: 640px) {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    padding: 0 16px 0 0;
  }
`;

export const ItemList = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
  position: relative;
  border-radius: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2.5rem 0;

  @media (max-width: 640px) {
    margin: 1.5rem 0;
  }
`;

export const CartInfoContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;
