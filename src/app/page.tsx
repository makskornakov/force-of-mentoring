'use client';
import Link from 'next/link';
import { HeadContainer, HomeContainer, StyledButton } from './edit/page.styled';
import NextImage from 'next/image';
import { styled } from '@linaria/react';

import mediaOverview from '~/files/overview/media.png';
import textOverview from '~/files/overview/text.png';
import inspiringImage from '~/files/overview/inspiringImage.png';

const overviewImages = {
  'Text template': textOverview,
  'Media template': mediaOverview,
  'Inspiring image': inspiringImage,
};

export default function Page() {
  return (
    <HomePageContainer>
      <h1>Discover The Force of Mentoring</h1>
      <h2>Introduction</h2>
      <p>
        The campaign provides downloadable templates. Edit and share them across your social media
        platforms to empower and showcase unity within the European Mentoring Community.
      </p>
      <p>
        This manual explores the heart of our upcoming marketing campaign - The Force of Mentoring,
        which will launch on{' '}
        <strong>
          <u>January 17, 2024</u>
        </strong>
        , coinciding with the official European Mentoring Day.
      </p>
      <p>
        <Link href="/edit">Editable templates</Link> allow you to amplify our story, share your
        mentoring experience as a mentor or mentee, and shine a light on the impact of mentoring on
        European society.
      </p>
      <h2>Our Goal</h2>
      <p>
        Our goal is to demonstrate the profound impact of mentoring by sharing, together with all of
        you, heartwarming stories, inspiring testimonials, guidelines, and statistics highlighting
        the immense value of mentoring in individuals’ lives throughout Europe.
      </p>
      <h2>The Campaign consists of:</h2>
      <ul>
        <li>
          Templates:
          <ul>
            <li>Empty Text Template</li>
            <li>Empty Media Template</li>
            <li>Inspiring Image</li>
          </ul>
        </li>
        <li>
          Infographic:
          <ul>
            <li>Mentoring field Facts & Figures</li>
            <li>Drop-out prevention statistics</li>
            <li>Committee of regions</li>
          </ul>
        </li>
        <li>
          Guidelines:
          <ul>
            <li>For template use</li>
            <li>For content</li>
          </ul>
        </li>
      </ul>
      <h2>Template overview</h2>
      <OverviewContainer>
        {/* <div>
          <NextImage
            src="/images/empty-text-template.png"
            layout="fill"
            alt="Empty text template"
          />
        </div> */}
        {Object.entries(overviewImages).map(([name, src]) => (
          <div key={name}>
            <div>
              <NextImage src={src} layout="fill" alt={name} />
            </div>
            <h4>{name}</h4>
          </div>
        ))}
      </OverviewContainer>
      <StyledButton
        style={{
          marginTop: '1rem',
        }}
        onClick={() => {
          window.location.href = '/edit';
        }}
      >
        Edit your first template
      </StyledButton>
    </HomePageContainer>
  );
}
const OverviewContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
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

const HomePageContainer = styled.div`
  width: 70%;
  margin: 1rem auto;
  display: flex;
  margin-bottom: 4rem;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: center;

  > h1 {
    font-size: 3rem;
    color: #a18bf8;
    font-family: 'Poor Story', sans-serif;
  }
  > h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: var(--main-color);
    font-family: 'Inter', sans-serif;
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

  @media (max-width: 768px) {
    width: 90%;
  }
`;
