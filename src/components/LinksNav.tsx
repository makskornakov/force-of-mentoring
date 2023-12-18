'use client';

import { styled } from '@linaria/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Editing', path: '/edit' },
];
export default function LinksList() {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem' }}>
      {pages.map((page) => (
        <StyledLink href={page.path} key={page.path} selected={pathname === page.path}>
          {page.name}
        </StyledLink>
      ))}
    </div>
  );
}

const StyledLink = styled(Link)<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? 'var(--main-color)' : 'var(--secondary-color)')};
  transition-duration: 0.3s;
  transition-property: color;

  &:hover {
    color: var(--main-color);
  }
`;
