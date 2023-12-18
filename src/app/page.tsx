'use client';
import Link from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import mediaOverview from '~/files/overview/media.png';
import textOverview from '~/files/overview/text.png';
import inspiringImage from '~/files/overview/inspiring.png';
import { HomePageContainer, OverviewContainer } from './page.styled';
import { StyledButton } from './edit/page.styled';

const overviewImages = {
  'Text template': textOverview,
  'Media template': mediaOverview,
  'Inspiring image': inspiringImage,
};

export default function Page() {
  const router = useRouter();
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
          router.push('/edit');
        }}
      >
        Edit your first template
      </StyledButton>
    </HomePageContainer>
  );
}
