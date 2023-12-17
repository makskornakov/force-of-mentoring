import { css } from '@linaria/core';

import { media } from './utils/media-queries';
import { reset } from './utils/reset';

export const globals = css`
  :global() {
    /* @font-face {
  font-family: 'Poor Story';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poorstory/v20/jizfREFUsnUct9P6cDfd4OynKj0YuSA5hTWm-r7AiNnQYpatEo8rx9k.0.woff2) format('woff2');
  unicode-range: U+f9ca-fa0b, U+ff03-ff05, U+ff07, U+ff0a-ff0b, U+ff0d-ff19, U+ff1b, U+ff1d, U+ff20-ff5b, U+ff5d, U+ffe0-ffe3, U+ffe5-ffe6;
} */
    @font-face {
      font-family: 'New Sun';
      font-style: normal;
      src: url('/fonts/New Sun.ttf');
    }
    /* import inter */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Poor+Story&display=swap');

    :root {
      --background-color: #f5f5f5;
      --main-color: #111111;
      --border-color: #a1a1a1;

      ${media.prefersColorSchemeDark} {
        --background-color: #111111;
        --main-color: #f5f5f5;
        --border-color: #a1a1a1;
      }
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html,
    body {
      max-width: 100vw;
      overflow-x: hidden;
    }

    body {
      color: var(--main-color);
      background: var(--background-color);
    }

    a {
      ${reset.a}
    }
    h1 {
      font-weight: 400;
    }
    h2 {
      font-weight: 300;
    }

    ${media.prefersColorSchemeDark} {
      html {
        color-scheme: dark;
      }
    }
  }
`;
