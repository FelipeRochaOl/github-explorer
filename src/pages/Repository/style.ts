import styled from 'styled-components'
import { shade } from 'polished'

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 81px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    transition: 0.2s color;
    transition: 0.2s transform;

    &:hover {
      color: ${shade(0.2, '#a8a8b3')};
      transform: translateX(-5px);
    }

    svg {
      font-size: 16px;
      margin-right: 5px;
    }
  }
`

export const Logo = styled.img`
  width: 215px;
  height: 32px;
`

export const RepositoryInfo = styled.section`
  header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-left: 32px;
      flex: 1;

      strong {
        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
        color: #3d3d4d;
      }

      p {
        font-size: 20px;
        line-height: 23px;
        color: #737380;
      }
    }
  }

  ul {
    display: flex;
    margin-bottom: 80px;

    li {
      list-style: none;

      & + li {
        margin-left: 80px;
      }

      strong {
        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
      }

      p {
        font-size: 20px;
        line-height: 23px;
        color: #6c6c80;
      }
    }
  }
`

export const Issues = styled.div`
  a {
    width: 100%;
    text-decoration: none;
    background: #fff;
    padding: 14.1px;
    border-radius: 5px;
    min-height: 112px;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
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
`
