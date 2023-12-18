import { styled } from '@linaria/react';
export const PreviewCanvasContainer = styled.div`
  position: relative;
  width: 60%;
  aspect-ratio: 1;
  > canvas {
    /* outline: 1px solid var(--main-color); */

    width: 100%;
    aspect-ratio: 1;

    font-family: 'New Sun', sans-serif;
  }
  @media (max-width: 1280px) {
    width: 70%;
  }

  @media (max-width: 1000px) {
    width: 80%;
  }

  @media (max-width: 500px) {
    /* width: 95%; */
  }
`;

export const HeadContainer = styled.div`
  border-bottom: 1px solid var(--main-color);
  border-top: 1px solid var(--main-color);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: center;

  @media (max-width: 1000px) {
    padding: 2rem 2rem;
  }
`;
export const HomeContainer = styled.div`
  /* outline: 1px solid red; */
  min-height: 60vh;
  display: flex;
  padding: 0 4rem;
  flex-direction: row;

  justify-content: space-between;

  h2 {
    border-bottom: 1px solid var(--main-color);
  }

  > div {
    display: flex;
    align-items: center;
    /* width: 48%; */
    /* min-width: 500px; */
    width: max(500px, 48%);
    flex-direction: column;
    row-gap: 1rem;

    > label {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
    }
  }
  /* all inputs and texareas */
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid;
    border-color: var(--border-color);
    outline: none;
    resize: none;
    font-weight: 200;
    font-size: 1rem;
    transition-duration: 0.2s;
    transition-property: border-color;

    &:focus,
    &:active {
      border: 1px solid var(--main-color);
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 2rem;
    padding: 0 2rem;

    > div {
      width: 80%;
    }
  }

  @media (max-width: 500px) {
    row-gap: 3rem;

    > div {
      width: 95%;
    }
  }
`;
export const PreviewContainer = styled.div`
  align-items: center;
  min-width: 400px;

  > button {
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: var(--border-color);
    outline: none;
    color: var(--main-color);
    font-size: 1rem;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: border-color;

    &:hover,
    &:focus {
      border-color: #03ba00;
    }
  }
`;
