'use client';
import { useRef, useState, useEffect, useMemo } from 'react';

import butterfly from '../files/butterfly1.svg';
import line1 from '../files/line1.svg';
import line2 from '../files/line2.svg';
import quoteIcon from '../files/quote.svg';
import watermark from '../files/watermark.svg';

import exampleImage from '../files/example1.png';
import NextImage from 'next/image';
import {
  HeadContainer,
  HomeContainer,
  PreviewContainer,
  PreviewCanvasContainer,
} from './page.styled';

const canvasSize = 1280;
const imageSize = 330;
const titleSize = 100;
const userTitleSize = 50;
const customTextSize = 30;
const quoteSize = 50;

const createImage = (src: string) => {
  const image = new Image();
  image.src = src;
  return image;
};

function drawLayout(
  ctx: CanvasRenderingContext2D,
  line1: HTMLImageElement,
  butterfly: HTMLImageElement,
  watermark: HTMLImageElement,
) {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = '#EEFCFA';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.drawImage(butterfly, canvasSize / 2 - imageSize / 2, imageSize / 10, imageSize, imageSize);

  ctx.fillStyle = '#A18BF8';
  ctx.font = `${titleSize}px Poor Story`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THE FORCE OF', canvasSize / 2, canvasSize / 3);
  ctx.fillText('MENTORING', canvasSize / 2, canvasSize / 3 + titleSize * 1.1);

  const mainTitleLength = canvasSize * 0.8;

  ctx.drawImage(
    line1,
    canvasSize / 2 - mainTitleLength / 2,
    canvasSize / 2.15,
    mainTitleLength,
    25,
  );

  // footer
  ctx.fillStyle = '#fff';
  ctx.font = `400 ${quoteSize * 0.65}px Gaegu`;
  ctx.rect(0, canvasSize - titleSize * 0.9, canvasSize, titleSize * 0.9);
  ctx.fill();

  const hashY = canvasSize - titleSize * 0.42;

  ctx.fillStyle = '#5A69AF';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('Empowering people with', canvasSize - canvasSize / 3.7, hashY);
  ctx.font = `700 ${quoteSize * 0.65}px Gaegu`;
  ctx.fillText('#TheForceOfMentoring', canvasSize - titleSize / 3.5, hashY);

  const watermarkSize = 290;
  const aspectRatio = 0.18;

  ctx.drawImage(
    watermark,
    watermarkSize * aspectRatio * 0.5,
    canvasSize - watermarkSize * aspectRatio * 1.3,
    watermarkSize,
    watermarkSize * aspectRatio,
  );
}

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

  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});

  // load images
  useEffect(() => {
    const images = {
      butterfly: createImage(butterfly.src),
      line1: createImage(line1.src),
      line2: createImage(line2.src),
      quoteIcon: createImage(quoteIcon.src),
      watermark: createImage(watermark.src),
    };
    const loadedImages: Record<string, HTMLImageElement> = {};
    const imagesAmount = Object.keys(images).length;
    let loadedImagesAmount = 0;
    for (const key in images) {
      const image = images[key as keyof typeof images];
      image.onload = () => {
        loadedImages[key] = image;
        loadedImagesAmount++;
        if (loadedImagesAmount === imagesAmount) {
          setLoadedImages(loadedImages);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      // set canvas size
      canvasRef.current.width = canvasSize;
      canvasRef.current.height = canvasSize;
      const ctx = canvasRef.current.getContext('2d');
      if (
        !ctx ||
        !loadedImages.line1?.complete ||
        !loadedImages.butterfly?.complete ||
        !loadedImages.watermark?.complete
      )
        return;

      drawLayout(ctx, loadedImages.line1, loadedImages.butterfly, loadedImages.watermark);
      setCtx(ctx);
      console.log('ctx', ctx);
    }
  }, [canvasRef, loadedImages.butterfly, loadedImages.line1, loadedImages.watermark]);

  const reDraw = useMemo(
    () => (userTitle: string, customText: string[], quote: string[]) => {
      if (!ctx) return;
      Object.keys(loadedImages).forEach((key) => {
        if (!loadedImages[key].complete) return;
      });

      console.log('reDraw', loadedImages);

      drawLayout(ctx, loadedImages.line1, loadedImages.butterfly, loadedImages.watermark);

      ctx.fillStyle = '#2AB09A';
      ctx.font = `${userTitleSize}px New Sun`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userTitle.toLocaleUpperCase(), canvasSize / 2, canvasSize / 1.9);
      // letter spacing

      const minUserTitleLength = 350;
      const userTitleLength = Math.max(userTitleSize * userTitle.length * 0.45, minUserTitleLength);

      ctx.drawImage(
        loadedImages.line2,
        canvasSize / 2 - userTitleLength / 2,
        canvasSize / 1.9 + userTitleSize * 0.6,
        userTitleLength,
        15,
      );

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

      // const quoteIconImage = new Image();
      // quoteIconImage.src = quoteIcon.src;
      const quoteIconSize = 40;
      const iconX = canvasSize / 2 - quoteTextLength - quoteIconSize / 2;

      ctx.drawImage(
        loadedImages.quoteIcon,
        iconX,
        quoteTextY - quoteIconSize / 2 + ((quote?.length - 1) / 2) * quoteSize,
        quoteIconSize,
        quoteIconSize,
      );
      ctx.drawImage(
        loadedImages.quoteIcon,
        canvasSize - iconX - quoteIconSize,
        quoteTextY - quoteIconSize / 2 + ((quote?.length - 1) / 2) * quoteSize,
        quoteIconSize,
        quoteIconSize,
      );
    },
    [ctx, loadedImages],
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
          <label>
            <h3>Title</h3>
            <input type="text" value={userTitle} onChange={(e) => setUserTitle(e.target.value)} />
          </label>
          <label>
            <h3>Custom text</h3>
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
          </label>
          <label>
            <h3>Quote</h3>
            <textarea
              style={{
                height: '4.5rem',
              }}
              value={quoteText}
              onChange={(e) => {
                const maxLines = 3;
                const lines = parseStringIntoLines(e.target.value, 40);
                if (lines.length > maxLines) return;
                setParsedQuoteText(lines);
                setQuoteText(e.target.value);
              }}
            />
          </label>
        </div>
        <PreviewContainer>
          <h2>Preview</h2>
          <PreviewCanvasContainer>
            <canvas ref={canvasRef} />
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
          </PreviewCanvasContainer>

          <button
            onClick={() => {
              if (canvasRef.current) {
                const dataUrl = canvasRef.current.toDataURL('image/png');
                console.log('dataUrl', dataUrl);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `${userTitle || 'title'}.png`;
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
