import Link from 'next/link';
import { CopyrightSpan, HeadContainer } from './edit/page.styled';
import './globals.linaria.global';
import { Inter } from 'next/font/google';
import LinksList from '~/components/LinksNav';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Force Of Mentoring',
  description: 'Force of Mentoring, a communication campaign by Mentoring Europe',
  // icons: [
  //   {
  //     rel: 'icon',
  //     href: '/favicon-white.ico',
  //     url: '/favicon-white.ico',
  //     media: '(prefers-color-scheme: dark)',
  //   },
  //   {
  //     rel: 'icon',
  //     href: '/favicon-black.ico',
  //     url: '/favicon-black.ico',
  //     media: '(prefers-color-scheme: light)',
  //   },
  // ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          style={{
            minHeight: '100vh',
            padding: '2rem 0',
            paddingBottom: '4rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '2rem',
          }}
        >
          <HeadContainer>
            <Link href="/">
              <h1>Force Of Mentoring</h1>
            </Link>
            <LinksList />
            {/* <h2>Template editor</h2> */}
          </HeadContainer>
          {children}
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
        <SpeedInsights />
      </body>
    </html>
  );
}
