import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

export const ContainerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 590px) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 200px;
    }

    > strong {
      font-size: 15px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
  }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const AddProductButton = styled.button.attrs(props => ({
  disabled: props.adding,
}))`
  background: #7159c1;
  color: #fff;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;

  display: flex;
  align-items: center;
  transition: background 0.2s;

  div {
    display: flex;
    align-items: center;
    padding: 12px;
    background: rgba(0, 0, 0, 0.1);

    svg {
      margin-right: 5px;
    }
  }

  span {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }

  &:hover {
    background: ${darken(0.03, '#7159c1')};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.adding &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
