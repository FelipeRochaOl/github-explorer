import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface FormProps {
  hasError: boolean
}

export const Logo = styled.img`
  width: 215px;
  height: 32px;
  margin: 42px 0px 100px 0px;
`

export const Title = styled.h1`
  max-width: 433px;
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 40px;
  font-weight: bold;
`
export const Form = styled.form<FormProps>`
  display: flex;

  input {
    width: 714px;
    height: 72px;
    border: 0px;
    padding-left: 30px;
    flex: 1;
    color: 3d3d4d;
    font-size: 20px;
    border: 1px solid #fff;
    border-radius: 5px 0px 0px 5px;

    ${props =>
      props.hasError &&
      css`
        border: 1px solid #ff1744;
        border-right: 0px;
      `}

    &::placeholder {
      line-height: 23px;
      color: #a8a8b3;
    }
  }

  button {
    flex-direction: row;
    align-items: center;
    padding: 19px 64px;
    background: #04d361;
    border: 0px;
    border-radius: 0px 5px 5px 0px;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`

export const Filter = styled.div`
  max-width: 714px;
  display: flex;
  margin-bottom: 16px;
  margin-top: 120px;

  input {
    height: 50px;
    border: 0px;
    padding-left: 30px;
    flex: 1;
    border-radius: 5px;

    &::placeholder {
      line-height: 23px;
      color: #a8a8b3;
    }
  }
`

export const Error = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: #ff1744;
`

export const Repositories = styled.div`
  section {
    max-width: 714px;
    display: flex;
    align-items: center;

    & + section {
      margin-top: 16px;
    }

    a {
      width: 100%;
      text-decoration: none;
      background: #fff;
      padding: 14.1px;
      border-radius: 5px;

      display: flex;
      align-items: center;
      transition: transform 0.2s;

      &:hover {
        transform: translateX(10px);
      }

      img {
        width: 81.83px;
        height: 81.83px;
        border-radius: 50%;
        object-fit: cover;
      }

      div {
        margin-left: 22.1px;
        flex: 1;

        strong {
          font-weight: bold;
          font-size: 24px;
          line-height: 28px;
          color: #3d3d4d;
        }

        p {
          font-size: 18px;
          color: #a8a8b3;
          margin-top: 4px;
        }
      }

      svg {
        margin-right: ${30 - 14.1}px;
        color: #c9c9d4;
        font-size: 27.5px;
      }
    }

    button {
      height: 45px;
      margin-left: 20px;
      border: 0px;
      padding: 12px;
      background-color: transparent;
      cursor: pointer;
      transition: 0.2s color;

      &:hover {
        color: #ff1744;
      }
    }
  }
`
