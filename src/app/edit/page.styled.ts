import { styled } from '@linaria/react';
export const PreviewCanvasContainer = styled.div`
  position: relative;
  width: 60%;
  margin-top: 4.5rem;
  aspect-ratio: 1;
  > canvas {
    /* media color scheme light */
    @media (prefers-color-scheme: light) {
      border: 1px solid var(--secondary-color);
    }

    width: 100%;
    aspect-ratio: 1;

    font-family: 'New Sun', sans-serif;
  }
  @media (max-width: 1280px) {
    width: 70%;
  }

  @media (max-width: 1000px) {
    width: 80%;
    margin-top: 2rem;
  }

  @media (max-width: 500px) {
    margin-top: 1rem;
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
    padding: 1rem 10%;
  }
  @media (max-width: 500px) {
    padding: 1rem 5%;
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
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition-duration: 0.2s;
    transition-property: border-color;

    &:hover,
    &:focus,
    &:active {
      border: 1px solid var(--main-color);
    }
  }

  /* input range */
  input[type='range'] {
    /* min-width: 100px; */
    appearance: none;
    width: 70%;
    height: 0.4rem;
    background-color: var(--border-color);
    outline: none;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
    padding: 0;
    transition-duration: 0.3s;
    transition-property: background-color;

    &:hover,
    &:focus,
    &:active {
      background-color: var(--main-color);
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 1rem;
      height: 1rem;
      background-color: var(--main-color);
      border-radius: 50%;
      transition: background-color 0.3s;
      /* small dark shadow */
      box-shadow: 0 0 0.3rem 0.1rem var(--background-color);
      &:hover,
      &:focus,
      &:active {
        background-color: #a18bf8;
      }
    }

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 3rem;
    padding: 2rem 0;

    > div {
      width: 80%;
    }
  }

  @media (max-width: 500px) {
    row-gap: 3rem;

    > div {
      width: 90%;
    }
  }
`;

export const StyledButton = styled.button<{ red?: boolean; green?: boolean; small?: boolean }>`
  background-color: transparent;
  /* padding: 0.5rem 1rem; */
  padding: ${({ small }) => (small ? '0.25rem 0.5rem' : '0.5rem 1rem')};
  border-radius: ${({ small }) => (small ? '0.25rem' : '0.5rem')};
  border: 1px solid;
  border-color: var(--border-color);
  outline: none;
  /* opacity: ${({ red }) => (red ? 1 : 0.5)}; */
  color: var(--border-color);
  font-size: ${({ small }) => (small ? '0.9rem' : '1rem')};
  cursor: pointer;
  transition-duration: 0.3s;
  transition-property: border-color, color;

  &:hover,
  &:focus {
    border-color: ${({ red, green }) =>
      red ? '#e60000' : green ? '#03ba00' : 'var(--main-color)'};
    color: var(--main-color);
    /* opacity: 1; */
  }
`;

export const CopyrightSpan = styled.span`
  /* outline: 1px solid red; */
  font-size: 0.8rem;
  font-weight: 200;
  position: absolute;
  text-align: left;
  color: var(--secondary-color);
  bottom: 0.5rem;
  left: 1rem;

  > a {
    text-decoration: underline;
    cursor: pointer;
    transition-duration: 0.3s;
    transition-property: color;

    &:hover,
    &:focus {
      color: var(--main-color);
    }
  }
`;
export const PresetImageContainer = styled.div<{ selected?: boolean }>`
  background-color: #eefcfa;
  position: relative;
  border: 2px solid;
  /* border-color: var(--border-color); */
  border-color: ${({ selected }) => (selected ? '#1cef18' : 'var(--border-color)')};
  border-radius: 0.5rem;

  cursor: pointer;
  width: 8rem;
  height: 8rem;
  transition-duration: 0.3s;
  transition-property: border-color;

  &:hover,
  &:focus {
    border-color: #1cef18;
  }
`;

export const PresetLabelWrapper = styled.label`
  /* outline: 1px solid red; */

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    > div {
      border-color: #1cef18;
    }
  }
`;
export const PreviewContainer = styled.div`
  align-items: center;
  /* justify-content: center; */
  min-width: 400px;
`;
export const AllPresetsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
`;
