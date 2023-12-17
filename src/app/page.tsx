'use client';
import { styled } from '@linaria/react';
import { useRef, useState, useEffect, useMemo } from 'react';

import butterfly from '../files/butterfly1.svg';
import line1 from '../files/line1.svg';
import line2 from '../files/line2.svg';
import exampleImage from '../files/example1.png';
import quoteIcon from '../files/quote.svg';
import watermark from '../files/watermark.svg';

import NextImage from 'next/image';

const canvasSize = 1280;
const imageSize = 330;
const titleSize = 100;
const userTitleSize = 50;
const customTextSize = 30;
const quoteSize = 50;

function drawLayout(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = '#EEFCFA';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const img = new Image();
  img.src = butterfly.src;
  img.onload = () => {
    ctx.drawImage(img, canvasSize / 2 - imageSize / 2, imageSize / 10, imageSize, imageSize);
  };

  ctx.fillStyle = '#A18BF8';
  ctx.font = `${titleSize}px Poor Story`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THE FORCE OF', canvasSize / 2, canvasSize / 3);
  ctx.fillText('MENTORING', canvasSize / 2, canvasSize / 3 + titleSize * 1.1);

  const lineImage1 = new Image();
  lineImage1.src = line1.src;
  const mainTitleLength = canvasSize * 0.8;
  lineImage1.onload = () => {
    ctx.drawImage(
      lineImage1,
      canvasSize / 2 - mainTitleLength / 2,
      canvasSize / 2.15,
      mainTitleLength,
      25,
    );
  };

  // footer
  ctx.fillStyle = '#fff';
  // font weight 400
  ctx.font = `400 ${quoteSize * 0.65}px Gaegu`;
  ctx.rect(0, canvasSize - titleSize * 0.9, canvasSize, titleSize * 0.9);
  ctx.fill();

  const hashY = canvasSize - titleSize * 0.42;

  ctx.fillStyle = '#5A69AF';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('Empowering people with', canvasSize - canvasSize / 3.7, hashY);
  ctx.font = `700 ${quoteSize * 0.65}px Gaegu`;
  // make the thext drop shadow
  ctx.fillText('#TheForceOfMentoring', canvasSize - titleSize / 3.5, hashY);

  const watermarkImage = new Image();
  watermarkImage.src = watermark.src;
  const watermarkSize = 290;
  const aspectRatio = 0.18;
  watermarkImage.onload = () => {
    ctx.drawImage(
      watermarkImage,
      watermarkSize * aspectRatio * 0.5,
      canvasSize - watermarkSize * aspectRatio * 1.3,
      watermarkSize,
      watermarkSize * aspectRatio,
    );
  };
}

// const maxLineSymbolLength = 70;

function parseStringIntoLines(inputString: string, restriction: number): string[] {
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < inputString.length; i++) {
    const currentChar = inputString[i];

    if (currentChar === '\n' || currentLine.length === restriction) {
      lines.push(currentLine.trim());
      currentLine = '';

      // Skip consecutive newline characters
      while (inputString[i + 1] === '\n') {
        i++;
      }
    } else {
      currentLine += currentChar;
    }
  }
  // Add the last line if there's any content left
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }
  return lines;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [userTitle, setUserTitle] = useState<string>('Text Title');
  const [customText, setCustomText] = useState<string>('Any text');
  const [parsedCustomText, setParsedCustomText] = useState<string[]>(['Any text']);
  const [quoteText, setQuoteText] = useState<string>('text of the quote');
  const [parsedQuoteText, setParsedQuoteText] = useState<string[]>(['text of the quote']);

  useEffect(() => {
    if (canvasRef.current) {
      // set canvas size
      canvasRef.current.width = canvasSize;
      canvasRef.current.height = canvasSize;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      drawLayout(ctx);
      setCtx(ctx);
      console.log('ctx', ctx);
    }
  }, [canvasRef]);

  const reDraw = useMemo(
    () => (userTitle: string, customText: string[], quote: string[]) => {
      if (!ctx) return;
      drawLayout(ctx);

      ctx.fillStyle = '#2AB09A';
      ctx.font = `${userTitleSize}px New Sun`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userTitle, canvasSize / 2, canvasSize / 1.9);

      const lineImage2 = new Image();
      lineImage2.src = line2.src;
      const minUserTitleLength = 350;
      const userTitleLength = Math.max(userTitleSize * userTitle.length * 0.45, minUserTitleLength);
      lineImage2.onload = () => {
        ctx.drawImage(
          lineImage2,
          canvasSize / 2 - userTitleLength / 2,
          canvasSize / 1.9 + userTitleSize * 0.6,
          userTitleLength,
          15,
        );
      };

      ctx.fillStyle = '#1C2435';
      ctx.font = `${customTextSize}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      customText?.forEach((line, index) => {
        ctx.fillText(line, canvasSize / 2, canvasSize / 1.68 + customTextSize * 1.3 * index);
      });

      ctx.fillStyle = '#545454';
      ctx.font = `${quoteSize}px Gaegu`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // draw under the main text, so we need to know how many lines we have
      const linesAmount = customText?.length || 0;
      const quoteTextY = canvasSize / 1.68 + customTextSize * 1.3 * linesAmount + quoteSize;
      quote?.forEach((line, index) => {
        ctx.fillText(line, canvasSize / 2, quoteTextY + quoteSize * index);
      });
      // ctx.fillText(quote, canvasSize / 2, quoteTextY);
      const minQuoteTextLength = 150;
      const maxQuoteTextLengthFromLines = Math.max(...quote.map((line) => line.length));
      const quoteTextLength = Math.max(
        quoteSize * maxQuoteTextLengthFromLines * 0.26,
        minQuoteTextLength,
      );

      const quoteIconImage = new Image();
      quoteIconImage.src = quoteIcon.src;
      const quoteIconSize = 40;
      const iconX = canvasSize / 2 - quoteTextLength - quoteIconSize / 2;
      quoteIconImage.onload = () => {
        ctx.drawImage(
          quoteIconImage,
          iconX,
          quoteTextY - quoteIconSize / 2 + ((quote?.length - 1) / 2) * quoteSize,
          quoteIconSize,
          quoteIconSize,
        );
        ctx.drawImage(
          quoteIconImage,
          canvasSize - iconX - quoteIconSize,
          quoteTextY - quoteIconSize / 2 + ((quote?.length - 1) / 2) * quoteSize,
          quoteIconSize,
          quoteIconSize,
        );
      };
    },
    [ctx],
  );

  useEffect(() => {
    reDraw(userTitle, parsedCustomText, parsedQuoteText);
    // console.log(customText);
    // console.log('parsed', parseStringIntoLines(customText));
  }, [userTitle, reDraw, parsedCustomText, parsedQuoteText]);

  return (
    <main
      style={{
        padding: '3rem 0',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
      }}
    >
      <HeadContainer>
        <h1
          style={
            {
              // fontFamily: 'New Sun',
            }
          }
        >
          Force Of Mentoring
        </h1>
        <h2>Template editor</h2>
      </HeadContainer>
      <HomeContainer>
        <div
          style={{
            alignItems: 'flex-start',
          }}
        >
          <h2>Editor</h2>
          <h3>Title</h3>
          <input type="text" value={userTitle} onChange={(e) => setUserTitle(e.target.value)} />
          <h3>Custom Text</h3>
          <textarea
            style={{
              height: '10rem',
            }}
            value={customText}
            onChange={(e) => {
              const maxLines = 6;
              const lines = parseStringIntoLines(e.target.value, 70);
              if (lines.length > maxLines) return;

              setCustomText(e.target.value);
              setParsedCustomText(lines);
            }}
          />
          <h3>Quote</h3>
          <textarea
            value={quoteText}
            onChange={(e) => {
              const maxLines = 3;
              const lines = parseStringIntoLines(e.target.value, 40);
              if (lines.length > maxLines) return;
              setParsedQuoteText(lines);
              setQuoteText(e.target.value);
            }}
          />
        </div>
        <PreviewContainer>
          <h2>Preview</h2>
          <div
            style={{
              // outline: '1px solid red',
              position: 'relative',
              width: '60%',
              aspectRatio: '1',
            }}
          >
            <PreviewCanvas ref={canvasRef} />
            {/* <NextImage
              src={exampleImage}
              fill
              alt="example"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0.3,
              }}
            /> */}
          </div>

          <button
            onClick={() => {
              if (canvasRef.current) {
                const dataUrl = canvasRef.current.toDataURL('image/png');
                console.log('dataUrl', dataUrl);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'template.png';
                a.click();
              }
            }}
          >
            Download
          </button>
        </PreviewContainer>
      </HomeContainer>
    </main>
  );
}
export const PreviewCanvas = styled.canvas`
  outline: 1px solid var(--main-color);

  width: 100%;
  aspect-ratio: 1;

  font-family: 'New Sun', sans-serif;
`;
export const HeadContainer = styled.div`
  border-bottom: 1px solid var(--main-color);
  border-top: 1px solid var(--main-color);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: center;
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
    width: 48%;
    flex-direction: column;
    row-gap: 1rem;
  }
  /* all inputs and texareas */
  input,
  textarea {
    width: 90%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    outline: none;
    font-size: 1rem;

    &:focus,
    &:active {
      border: 1px solid var(--main-color);
    }
  }
`;
const PreviewContainer = styled.div`
  align-items: center;

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

    &:hover {
      border-color: #03ba00;
    }
  }
`;
