import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    a {
      text-decoration: none;
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }
  }

  @media screen and (max-width: 590px) {
    footer {
      flex-direction: column-reverse;
      margin-top: 10px;

      a {
        align-self: stretch;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
  }

  tbody td {
    padding: 12px;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    padding: 10px;
    border-radius: 50%;
    transition: background 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  }

  @media screen and (max-width: 590px) {
    thead {
      display: none;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  p {
    font-size: 18px;
    color: #888;
    margin: 20px 0;
  }

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#7159c1')};
    }
  }
`;
