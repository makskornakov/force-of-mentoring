import { styled } from '@linaria/react';

export const OverviewContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
  row-gap: 2rem;
  column-gap: 2rem;
  justify-content: center;
  align-items: flex-start;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;

    > div {
      height: 20rem;
      width: 20rem;
      position: relative;
      border: 1px solid var(--border-color);
      background-color: #eefcfa;
    }
  }

  @media (max-width: 768px) {
    > div {
      > div {
        height: 14rem;
        width: 14rem;
      }
    }
  }

  @media (max-width: 500px) {
    > div {
      > div {
        height: 11rem;
        width: 11rem;
      }
    }
  }
`;

export const HomePageContainer = styled.div`
  width: 70%;
  margin: 1rem auto;
  display: flex;
  margin-bottom: 4rem;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: center;

  > h1 {
    font-size: 3.25rem;
    color: #a18bf8;
    font-family: 'Poor Story', sans-serif;
    margin-bottom: 1rem;
  }
  > h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: var(--main-color);
  }
  > h3,
  > h2 {
    align-self: flex-start;
  }

  > ul {
    align-self: flex-start;

    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);

    padding: 0 1.5rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    width: 100%;
    justify-content: space-between;

    > li {
      margin-top: 0.5rem;
      list-style-type: decimal;
      line-height: 2rem;
    }

    ul {
      margin-left: 1rem;

      > li {
        line-height: 1.5rem;
      }
    }
  }
  > q {
    /* tob, bottom 1.5rem, other 0 */
    margin: 1rem 0;
    font-family: 'Poor Story', sans-serif;
    font-size: 1.75rem;
  }
  > p {
    font-size: 1rem;
    font-weight: 300;

    font-family: 'Inter', sans-serif;
    line-height: 1.5;

    > a {
      color: var(--active-color);
      font-weight: 600;
      transition-duration: 0.3s;
      transition-property: color;
      text-decoration: underline;

      &:hover {
        color: #a18bf8;
      }
    }
  }

  @media (max-width: 1000px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;
