import styled from 'styled-components';
import { IoIosArrowUp } from 'react-icons/io';

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 30px;
  bottom: 30px;

  width: 50px;
  height: 50px;

  font-family: inherit;
  font-size: 20px;
  font-weight: 500;

  text-align: center;
  border-radius: 4px;
  border: none;

  background-color: #f5f4fa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  border-radius: 50%;

  line-height: 1.87;
  letter-spacing: 0.06em;

  opacity: 1;

  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
    visibility 300ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;

  :hover,
  :focus {
    background-color: #d4d4d4;
  }
`;

export const Icon = styled(IoIosArrowUp)`
  fill: currentColor;
  transition: fill 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 30vh;
`;
