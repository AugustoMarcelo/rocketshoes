import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: 100%;
  grid-gap: 20px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 3fr 1fr;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column-reverse;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

    h3 {
      border-bottom: 1px solid #cecece;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
  }
`;

export const ThreeFieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;

  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Payment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  padding-bottom: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 1000px) {
    align-items: stretch;
    flex-direction: column;
  }

  .card-form {
    display: flex;
    flex-direction: column;
  }

  .card {
    .rccs,
    .rccs > div {
      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }
  }
`;

export const Button = styled.button`
  background: #7159c1;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s;
  align-self: flex-end;

  &:hover {
    background: ${darken(0.03, '#7159c1')};
  }

  @media screen and (max-width: 450px) {
    align-self: stretch;
  }
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
  height: fit-content;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
      color: #999;
      text-transform: uppercase;
    }
  }

  hr {
    margin-bottom: 10px;
  }
`;
