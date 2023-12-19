'use client';
import Link from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import mediaOverview from '~/files/overview/media.png';
import textOverview from '~/files/overview/text.png';
import inspiringImage from '~/files/overview/inspiring.png';

// import mentoringBenefits from '~/../public/download/mentoringBenefits.svg';
// import mentoringImpact from '~/../public/download/mentoringImpact.svg';
// import preset3 from '~/../public/download/preset3.svg';

// import inspirationButterfly from '~/../public/download/inspirationButterfly.png';

import { HomePageContainer, OverviewContainer } from './page.styled';
import { StyledButton } from './edit/page.styled';
import { HtmlStyledTag, styled } from '@linaria/react';
import { HiDownload } from 'react-icons/hi';

const overviewImages = {
  'Text template': textOverview,
  'Media template': mediaOverview,
  'Inspiring image': inspiringImage,
};

const downloadableImages = {
  'Mentoring Benefits': '/download/mentoringBenefits.png',
  'Mentoring Impact': '/download/mentoringImpact.png',
  'Preset 3': '/download/4sections.png',
  'Inspiration Butterfly': '/download/inspirationButterfly.png',
};

export default function Page() {
  const router = useRouter();
  return (
    <HomePageContainer>
      <h1>Discover The Force of Mentoring</h1>
      {/* <h2>Introduction</h2> */}
      <p>
        As we step into the new year, we are thrilled to release a transformative campaign that
        holds the power to inspire, connect, and uplift European society. This is your exclusive
        access point to the heart of our upcoming communication campaign, launching on{' '}
        <strong>January 17, 2024</strong>, the official European Mentoring Day.
      </p>
      <q>It is not about Mentoring Europe. It is about Mentoring IN Europe.</q>
      <h2>About</h2>
      <p>
        We invite you to share your mentoring journey, amplify our collective story, and shine a
        light on the effect of mentoring, how one relationship can affect many lives and create a
        positive current within society. Your experiences as a mentor or mentee are a valuable piece
        of the puzzle that makes the Force of Mentoring so impactful.
      </p>
      <p>
        <Link href="/edit">Editable Templates</Link> have been developed for you to share across
        social media platforms to empower and showcase unity within the European Mentoring
        Community.
      </p>
      <p>
        These templates allow you to amplify our story, share your mentoring experience as a mentor
        or mentee, and shine a light on the impact of mentoring on European society.
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
      <MovingH2>Template examples</MovingH2>
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
              <NextImage
                src={src}
                layout="fill"
                alt={name}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <h4>{name}</h4>
          </div>
        ))}
      </OverviewContainer>
      <MovingH2>Download content</MovingH2>
      <MovingH3>For use on your own designs</MovingH3>
      <DownloadContentWrapper>
        {Object.entries(downloadableImages).map(([name, src]) => (
          <div key={name}>
            <div>
              <NextImage
                src={src}
                fill
                alt={name}
                quality={20}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <h4>{name}</h4>
            <StyledButton
              onClick={() => {
                // create a link element
                const link = document.createElement('a');
                // set the link's href
                link.href = src;
                // set the download attribute
                link.download = name;
                // trigger click event
                link.click();
              }}
              small
              green
            >
              Download
              <HiDownload />
            </StyledButton>
          </div>
        ))}
      </DownloadContentWrapper>
      <StyledButton
        style={{
          marginTop: '1rem',
        }}
        onClick={() => {
          router.push('/edit');
        }}
      >
        Edit your first template
      </StyledButton>
    </HomePageContainer>
  );
}
const DownloadContentWrapper = styled.div`
  /* outline: 1px solid red; */

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  padding-bottom: 2rem;
  flex-direction: row;
  gap: 1.5rem;

  > div {
    /* border: 1px solid var(--border-color); */
    /* border-radius: 0.25rem; */
    width: 12rem;
    height: 14rem;
    padding: 0.5rem;

    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;

    > div {
      background-color: #eefcfa;
      border-radius: 0.25rem;
      position: relative;
      width: 80%;
      aspect-ratio: 1;
    }
  }

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const MovingH2 = styled.h2`
  @media (max-width: 1000px) {
    align-self: center !important;
  }
`;
const MovingH3 = styled.h3`
  @media (max-width: 1000px) {
    align-self: center !important;
  }
`;
