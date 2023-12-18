import Link from 'next/link';
import { HeadContainer, HomeContainer } from './edit/page.styled';

export default function Page() {
  return (
    <HomeContainer>
      <div
        style={{
          outline: '1px solid var(--border-color)',
        }}
      ></div>
      <div
        style={{
          outline: '1px solid var(--border-color)',
        }}
      ></div>
    </HomeContainer>
  );
}
