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
import MyDropzone from './DropZone';

const canvasSize = 1280;
const imageSize = 330;
const titleSize = 100;
const userTitleSize = 50;
const customTextSize = 30;
const quoteSize = 50;

const editorModes = ['text', 'media'] as const;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [userTitle, setUserTitle] = useState<string>('Text Title');
  const [customText, setCustomText] = useState<string>('Any text');
  const [parsedCustomText, setParsedCustomText] = useState<string[]>(['Any text']);
  const [quoteText, setQuoteText] = useState<string>('text of the quote');
  const [parsedQuoteText, setParsedQuoteText] = useState<string[]>(['text of the quote']);

  const [editingMode, setEditingMode] = useState<(typeof editorModes)[number]>('text');
  // media
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | undefined>(undefined);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | undefined>(undefined);
  const [selectedImageSize, setSelectedImageSize] = useState<number>(40);

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
    () =>
      (
        userTitle: string,
        customText: string[],
        quote: string[],
        selectedImageSrc?: string | undefined,
        selectedImageSize?: number,
      ) =>
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
          selectedImageSrc,
          selectedImageSize,
        }),
    [ctx, loadedImages],
  );
  // update selected image when new src is received

  useEffect(() => {
    if (!selectedImageSrc) {
      setSelectedImage(undefined);
      return;
    }
    const image = new Image();
    image.src = selectedImageSrc;
    image.onload = () => {
      setSelectedImage(image);
    };
  }, [selectedImageSrc]);

  useEffect(() => {
    // console.log('selectedImage', selectedImage);
    reDraw(userTitle, parsedCustomText, parsedQuoteText, selectedImageSrc, selectedImageSize);
  }, [userTitle, reDraw, parsedCustomText, parsedQuoteText, selectedImageSrc, selectedImageSize]);

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '1rem',
              // outline: '1px solid red',
            }}
          >
            <h3>Mode: </h3>
            {editorModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setEditingMode(mode)}
                style={{
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '400',
                  padding: '0.25rem 0.5rem',
                  outline: 'none',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  opacity: editingMode === mode ? 1 : 0.5,
                }}
              >
                {mode}
              </button>
            ))}
          </div>
          {editingMode === 'text' ? (
            <>
              <label>
                <h3>Title</h3>
                <input
                  type="text"
                  value={userTitle}
                  onChange={(e) => setUserTitle(e.target.value)}
                />
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
            </>
          ) : (
            <>
              {/* <label>
                <h3>Image</h3>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const image = new Image();
                    image.src = URL.createObjectURL(file);
                    image.onload = () => {
                      setSelectedImage(image);
                    };
                  }}
                />
              </label> */}
              <MyDropzone selectedImage={selectedImage} setImage={setSelectedImageSrc} />
              {selectedImage && (
                <label>
                  <h3>Image size</h3>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    value={selectedImageSize}
                    onChange={(e) => setSelectedImageSize(+e.target.value)}
                  />
                </label>
              )}
            </>
          )}
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
