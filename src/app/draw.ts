import { EditorMode } from './edit/page';

export function drawLayout(
  ctx: CanvasRenderingContext2D,
  line1: HTMLImageElement,
  butterfly: HTMLImageElement,
  watermark: HTMLImageElement,
  logoSize: number,
  titleSize: number,
  quoteSize: number,
  editMode: EditorMode,
) {
  const canvasSize = ctx.canvas.width;
  console.log('drawLayout', canvasSize);
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = '#EEFCFA';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  if (editMode === 'text') {
    ctx.drawImage(butterfly, canvasSize / 2 - logoSize / 2, logoSize / 10, logoSize, logoSize);
  } else {
    // draw 2 smaller ones one top left and one top right corner
    const smallLogoSize = logoSize * 0.5;
    ctx.drawImage(butterfly, smallLogoSize / 8, smallLogoSize * 0.05, smallLogoSize, smallLogoSize);
    ctx.save();
    ctx.translate(canvasSize, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(butterfly, smallLogoSize / 8, smallLogoSize * 0.05, smallLogoSize, smallLogoSize);
    ctx.restore();
  }

  ctx.fillStyle = '#A18BF8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${titleSize}px Poor Story`;
  if (editMode === 'text') {
    ctx.fillText('THE FORCE OF', canvasSize / 2, canvasSize / 3);
    ctx.fillText('MENTORING', canvasSize / 2, canvasSize / 3 + titleSize * 1.1);
  } else {
    ctx.fillText('THE FORCE OF MENTORING', canvasSize / 2, titleSize * 1.9);
  }

  const mainTitleLength = canvasSize * (editMode === 'text' ? 0.8 : 0.94);

  ctx.drawImage(
    line1,
    canvasSize / 2 - mainTitleLength / 2,
    editMode === 'text' ? canvasSize / 2.15 : titleSize * 1.9 + titleSize * 0.9,
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
type LoadedImages = Record<string, HTMLImageElement>;

// export function reDraw(ctx: CanvasRenderingContext2D, loadedImages: LoadedImages, imageSize: number, titleSize: number, quoteSize: number, userTitle: string, customText: string[], quote: string[])  {
export function reDrawOnCanvas({
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
  selectedImage,
  selectedImageSize,
  editMode,
}: {
  ctx: CanvasRenderingContext2D | undefined;
  loadedImages: LoadedImages;
  imageSize: number;
  titleSize: number;
  userTitleSize: number;
  customTextSize: number;
  quoteSize: number;
  userTitle: string;
  customText: string[];
  quote: string[];
  selectedImage?: HTMLImageElement;
  selectedImageSize?: number;
  editMode: EditorMode;
}) {
  if (!ctx) return;
  const canvasSize = ctx.canvas.width;

  Object.keys(loadedImages).forEach((key) => {
    if (!loadedImages[key].complete) return;
  });

  console.log('reDraw', loadedImages, selectedImage);

  drawLayout(
    ctx,
    loadedImages.line1,
    loadedImages.butterfly,
    loadedImages.watermark,
    imageSize,
    titleSize,
    quoteSize,
    editMode,
  );

  // draw user image

  if (selectedImage && editMode === 'media') {
    console.log('file', selectedImage);

    const userImagePercent = selectedImageSize || 50;
    const aspectRatio = selectedImage.height / selectedImage.width;
    const userImageSizeY = canvasSize * (userImagePercent / 100);
    const userImageSizeX = userImageSizeY / aspectRatio;

    ctx.drawImage(
      selectedImage,
      canvasSize / 2 - userImageSizeX / 2,
      canvasSize / 2 - userImageSizeY / 2.5,
      userImageSizeX,
      userImageSizeY,
    );
  }
  if (editMode === 'text') {
    ctx.fillStyle = '#2AB09A';
    ctx.font = `${userTitleSize}px New Sun`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(userTitle.toLocaleUpperCase(), canvasSize / 2, canvasSize / 1.9);

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
  }
  if (quote.length === 0) return;
  ctx.fillStyle = '#545454';
  ctx.font = `${quoteSize}px Gaegu`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // draw under the main text, so we need to know how many lines we have
  const linesAmount = customText?.length || 0;
  const quoteTextY =
    editMode === 'text'
      ? canvasSize / 1.68 + customTextSize * 1.3 * linesAmount + quoteSize
      : canvasSize - titleSize * Math.sqrt(Math.max(quote.length, 1)) * 1.3;

  quote?.forEach((line, index) => {
    ctx.fillText(line, canvasSize / 2, quoteTextY + quoteSize * index);
  });

  const minQuoteTextLength = 150;
  const maxQuoteTextLengthFromLines = Math.max(...quote.map((line) => line.length));
  const quoteTextLength = Math.max(
    quoteSize * maxQuoteTextLengthFromLines * 0.26,
    minQuoteTextLength,
  );

  const quoteIconSize = 40;
  const iconX = canvasSize / 2 - quoteTextLength - quoteIconSize / 2;
  // console.log('quoteTextLength', quote.length);
  const quoteTextYSize = ((Math.max(quote.length, 1) - 1) / 2) * quoteSize;

  ctx.save();
  ctx.translate(canvasSize / 2, canvasSize / 2);
  ctx.rotate(Math.PI);
  ctx.translate(-canvasSize / 2, -canvasSize / 2);
  ctx.drawImage(
    loadedImages.quoteIcon,
    canvasSize - iconX - quoteIconSize,
    canvasSize - quoteTextY - quoteIconSize / 2 - quoteTextYSize,
    quoteIconSize,
    quoteIconSize,
  );
  ctx.restore();

  ctx.drawImage(
    loadedImages.quoteIcon,
    canvasSize - iconX - quoteIconSize,
    quoteTextY - quoteIconSize / 2 + quoteTextYSize,
    quoteIconSize,
    quoteIconSize,
  );
}

export const createImage = (src: string, alt?: string) => {
  const image = new Image();
  image.src = src;
  image.alt = alt || '';
  return image;
};

export function parseStringIntoLines(inputString: string, restriction: number): string[] {
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
