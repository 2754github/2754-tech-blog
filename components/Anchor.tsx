import { FC } from 'react';

type Props = {
  href: string;
  className?: string;
};

const Anchor: FC<Props> = ({ href, className, children }) => (
  <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

// eslint-disable-next-line import/no-default-export
export default Anchor;
