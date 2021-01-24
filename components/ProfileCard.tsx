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
import styles from './ProfileCard.module.css';

const ProfileCard: FC = () => (
  <div className={styles.card}>
    <div className={styles.flex}>
      <a className={styles.myIcon} href={GITHUB_IMG_LINK} target="_blank" rel="noopener noreferrer">
        <Image src={GITHUB_IMG_LINK} alt="my icon" width={460} height={460} />
      </a>
      <div>
        <div className={styles.author}>{AUTHOR}</div>
        <div className={styles.job}>{JOB}</div>
        <IconButton url={TWITTER_URL} icon={TWITTER_ICON} />
        <IconButton url={GITHUB_URL} icon={GITHUB_ICON} />
        <IconButton url={MAIL_URL} icon={MAIL_ICON} />
      </div>
    </div>
    <hr />
    <div>{SELF_INTRODUCTION}</div>
    <div className={styles.add}>{ADDITIONAL_SELF_INTRODUCTION}</div>
  </div>
);

// TODO: コンポーネント分ける
type Props = {
  url: string;
  icon: string;
};

const IconButton: FC<Props> = ({ url, icon }) => (
  <a className={styles.iconButton} href={url} target="_blank" rel="noopener noreferrer">
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <path d={icon} />
    </svg>
  </a>
);

// eslint-disable-next-line import/no-default-export
export default ProfileCard;
