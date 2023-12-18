'use client';
import { useRef, useState, useEffect, useMemo, use } from 'react';
import { useSearchParams } from 'next/navigation';

import butterfly from '../files/butterfly1.svg';
import line1 from '../files/line1.svg';
import line2 from '../files/line2.svg';
import quoteIcon from '../files/quote.svg';
import watermark from '../files/watermark.svg';

// presets
// import mentoringImpact from '../files/presets/mentoringImpact.svg';

import exampleImage from '../files/example2.png';
import NextImage from 'next/image';

const presets = [
  {
    name: 'Mentoring Impact',
    src: '/presets/mentoringImpact.svg',
  },
  {
    name: 'Mentoring Benefits for Youth',
    src: '/presets/mentoringBenefits.svg',
  },
];

import {
  HeadContainer,
  HomeContainer,
  PreviewContainer,
  PreviewCanvasContainer,
  StyledButton,
  CopyrightSpan,
  PresetImageContainer,
} from './page.styled';
import { createImage, drawLayout, parseStringIntoLines, reDrawOnCanvas } from './draw';
import MyDropzone from './DropZone';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const canvasSize = 1280;
const imageSize = 330;
const titleSize = 100;
const userTitleSize = 50;
const customTextSize = 30;
const quoteSize = 50;

export type EditorMode = 'text' | 'media';
const editorModes = ['text', 'media'] as EditorMode[];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [userTitle, setUserTitle] = useState<string>('Text Title');
  const [customText, setCustomText] = useState<string>('Any text');
  const [parsedCustomText, setParsedCustomText] = useState<string[]>(['Any text']);
  const [quoteText, setQuoteText] = useState<string>('text of the quote');
  const [parsedQuoteText, setParsedQuoteText] = useState<string[]>(['text of the quote']);

  const searchParams = useSearchParams();
  // const router = useRouter();

  const [editingMode, setEditingMode] = useState<EditorMode>(
    searchParams.has('mode') && editorModes.includes(searchParams.get('mode') as EditorMode)
      ? (searchParams.get('mode') as EditorMode)
      : 'text',
  );
  // media
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | undefined>(undefined);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | undefined>(undefined);
  const [selectedImageSize, setSelectedImageSize] = useState<number>(40);

  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
  // const [loadedPresets, setLoadedPresets] = useState<Record<string, HTMLImageElement>>({});

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
        editingMode,
      );
      setCtx(ctx);
      console.log('ctx', ctx);
    }
  }, [canvasRef, editingMode, loadedImages.butterfly, loadedImages.line1, loadedImages.watermark]);

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
          editMode: editingMode,
        }),
    [ctx, editingMode, loadedImages],
  );
  // update selected image when new src is received

  // redirect with ?mode=mode when mode changes
  // useEffect(() => {
  //   redirect(`?mode=${editingMode}`);
  // }, [editingMode]);

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
        // paddingBottom: '5rem',
        position: 'relative',
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
              <StyledButton
                small
                key={mode}
                onClick={() => setEditingMode(mode)}
                style={{
                  borderColor: editingMode === mode ? 'var(--main-color)' : '',
                  color: editingMode === mode ? 'var(--main-color)' : '',
                }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </StyledButton>
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
            </>
          ) : (
            <>
              {/* if selected src is from presets don't show drop zone */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  rowGap: '0.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <h3>Image</h3>
                {/* <h4>Select from presets</h4> */}
                {(!selectedImageSrc ||
                  presets.find((preset) => preset.src === selectedImageSrc)) && (
                  <>
                    {/* <h4
                      style={{
                        marginTop: '1rem',
                        marginBottom: '.25rem',
                      }}
                    >
                      Or choose from presets:
                    </h4> */}
                    <div
                      style={{
                        // outline: '1px solid red',
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        rowGap: '1.5rem',
                        columnGap: '1.5rem',
                        padding: '1rem 0',
                        borderTop: '1px solid var(--border-color)',
                        borderBottom: '1px solid var(--border-color)',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                      }}
                    >
                      {presets.map((preset) => (
                        <div
                          key={preset.name}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '.5rem',
                            alignItems: 'center',
                          }}
                        >
                          <PresetImageContainer
                            onClick={() => {
                              setSelectedImageSrc(preset.src);
                            }}
                            selected={selectedImageSrc === preset.src}
                          >
                            <NextImage
                              src={preset.src}
                              fill
                              alt={preset.name}
                              quality={20}
                              style={{
                                padding: '.5rem',
                                objectFit: 'contain',
                              }}
                            />
                          </PresetImageContainer>
                          <h4
                            style={{
                              width: '8rem',
                              textAlign: 'center',
                            }}
                          >
                            {preset.name}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '0.5rem',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                {presets.find((preset) => preset.src === selectedImageSrc) ? null : (
                  <>
                    <h4>Or upload your own:</h4>

                    <MyDropzone selectedImage={selectedImage} setImage={setSelectedImageSrc} />
                  </>
                )}

                {selectedImageSrc && (
                  <StyledButton onClick={() => setSelectedImageSrc(undefined)} red small>
                    Remove
                  </StyledButton>
                )}
              </div>

              {selectedImage && (
                <label>
                  <h3>Image size</h3>
                  <input
                    type="range"
                    min={20}
                    max={60}
                    value={selectedImageSize}
                    onChange={(e) => setSelectedImageSize(+e.target.value)}
                  />
                </label>
              )}
            </>
          )}
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

          <StyledButton
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
            green
          >
            Download
          </StyledButton>
        </PreviewContainer>
      </HomeContainer>
      <CopyrightSpan>
        ©{' '}
        <Link href="https://github.com/makskornakov" target="_blank">
          Max Kornakov
        </Link>
        ,{' '}
        <Link href="https://www.mentoringeurope.eu" target="_blank">
          Mentoring Europe
        </Link>
        , 2023
      </CopyrightSpan>
    </main>
  );
}
