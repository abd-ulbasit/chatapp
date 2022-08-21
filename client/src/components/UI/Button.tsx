import { FC } from 'react';
import styled from 'styled-components';
const Button = styled.button`

outline: none;
border: none;
    background-color: #e79393;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;

    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #b93636;
        color: white;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
`
export default Button;