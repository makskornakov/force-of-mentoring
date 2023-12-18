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
import { createImage, drawLayout, parseStringIntoLines, reDrawOnCanvas } from './draw';

const canvasSize = 1280;
const imageSize = 330;
const titleSize = 100;
const userTitleSize = 50;
const customTextSize = 30;
const quoteSize = 50;

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

      drawLayout(
        ctx,
        loadedImages.line1,
        loadedImages.butterfly,
        loadedImages.watermark,
        imageSize,
        titleSize,
        quoteSize,
      );
      setCtx(ctx);
      console.log('ctx', ctx);
    }
  }, [canvasRef, loadedImages.butterfly, loadedImages.line1, loadedImages.watermark]);

  const reDraw = useMemo(
    () => (userTitle: string, customText: string[], quote: string[]) =>
      reDrawOnCanvas({
        ctx,
        loadedImages,
        imageSize,
        titleSize,
        userTitleSize,
        customTextSize,
        quoteSize,
        userTitle,
        customText,
        quote,
      }),
    [ctx, loadedImages],
  );

  useEffect(() => {
    reDraw(userTitle, parsedCustomText, parsedQuoteText);
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
        <h1>Force Of Mentoring</h1>
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
