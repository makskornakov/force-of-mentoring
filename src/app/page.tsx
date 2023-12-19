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

import { HomePageContainer, OverviewContainer, StyledUl } from './page.styled';
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
      <StyledUl
        row
        style={{
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <li>
          Templates to edit:
          <ul>
            <li>For text content</li>
            <li>For media, or other content</li>
            {/* <li>Inspiring Image</li> */}
          </ul>
        </li>
        <li>
          Infographic:
          <ul>
            <li>Mentoring Benefits for youth</li>
            <li>Mentoring Impact</li>
            <li>4 sections (Coming)</li>
          </ul>
        </li>
        <li>
          Guidelines:
          <ul>
            <li>For template use</li>
            <li>For content</li>
          </ul>
        </li>
      </StyledUl>
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
      <h2>Guidelines & Advice</h2>
      <h3
        style={{
          textDecoration: 'underline',
        }}
      >
        Template form (editing)
      </h3>
      <StyledUl
        bullets
        style={{
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <li>
          There are two editing modes for text and media
          <ul>
            <li>Use text mode for longer paragraphs.</li>
            <li>You can use one of our images or upload your own in the media mode.</li>
          </ul>
        </li>
        <li>Preferably post in English, but you can also use your native language.</li>
        <li>Several templates can be used in one post; Graphics preferably come first.</li>
      </StyledUl>
      <h3
        style={{
          marginTop: '.5rem',
          textDecoration: 'underline',
        }}
      >
        Content
      </h3>
      <p>
        To use the provided template, please follow these guidelines regarding the type and
        relevancy of this topic:
      </p>
      <StyledUl
        bullets
        style={{
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <li>Stories and Quotes of Mentors, testimonials.</li>
        <li>Mentees&apos; Perspectives.</li>
        <li>Testimonies of Powerful Relationships</li>
        <li>Annual Matching Statistics for Your Organization</li>
        <li>
          <i>...Similar topics</i>
        </li>
      </StyledUl>
      <MovingH2>Download content</MovingH2>
      <MovingH3>Transparent images for use on other designs</MovingH3>
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
