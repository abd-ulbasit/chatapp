import styled from 'styled-components';
const Card = styled.div`

    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
`
export default Card;
