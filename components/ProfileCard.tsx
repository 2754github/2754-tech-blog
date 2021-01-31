import { FC } from 'react';
import Image from 'next/image';
import {
  AUTHOR,
  JOB,
  TWITTER_URL,
  TWITTER_ICON,
  GITHUB_URL,
  GITHUB_ICON,
  GITHUB_IMG_LINK,
  MAIL_URL,
  MAIL_ICON,
  SELF_INTRODUCTION,
  ADDITIONAL_SELF_INTRODUCTION,
} from 'lib/constants';
import Anchor from 'components/Anchor';
import styles from './ProfileCard.module.css';

const ProfileCard: FC = () => (
  <div className="paper">
    <div className={styles.header}>
      <Anchor className="my-icon" href={GITHUB_IMG_LINK}>
        <Image src={GITHUB_IMG_LINK} alt="my icon" width={460} height={460} />
      </Anchor>
      <div>
        <div className={styles.author}>{AUTHOR}</div>
        <div className={`sumaho-none ${styles.job}`}>{JOB}</div>
        <IconButton href={TWITTER_URL} d={TWITTER_ICON} />
        <IconButton href={GITHUB_URL} d={GITHUB_ICON} />
        <IconButton href={MAIL_URL} d={MAIL_ICON} />
      </div>
    </div>
    <hr />
    <div>{SELF_INTRODUCTION}</div>
    <div className="sumaho-none">{ADDITIONAL_SELF_INTRODUCTION}</div>
  </div>
);

// TODO: コンポーネント分ける
type Props = {
  href: string;
  d: string;
};

const IconButton: FC<Props> = ({ href, d }) => (
  <Anchor className={styles.iconButton} href={href}>
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  </Anchor>
);

// eslint-disable-next-line import/no-default-export
export default ProfileCard;
