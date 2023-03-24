import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const VideoDiscovery = ({ ytbEmbeddedUrl = null, video = null, isVisible = false }) => {
  const [isPlaying, setIsPlaying] = useState(isVisible);
  useEffect(() => {
    setIsPlaying(isVisible);
  }, [isVisible]);
  return (
    <div className={styles.play_wrapper}>
      <ReactPlayer className={styles.react_player} controls width="100%" height="100%" playing={isPlaying} url={video || ytbEmbeddedUrl} />
    </div>
  );
};
export default VideoDiscovery;
