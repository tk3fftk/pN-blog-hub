import { useState } from "react";

type AvatarProps = {
  memberId: string;
  originalSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const getAvatarSrc = (memberId: string, originalSrc: string, fallbackLevel: number = 0): string => {
  if (fallbackLevel === 0) {
    // 1. ローカル画像を最初に試す（最も一般的な拡張子から）
    const commonExtensions = ['.jpg', '.png', '.jpeg'];
    return `/avatars/${memberId}${commonExtensions[0]}`;
  } else if (fallbackLevel === 1) {
    // 2. 元のSNS画像を試す
    return originalSrc;
  } else {
    // 3. デフォルト画像
    return '/logo_mark.png';
  }
};

export const Avatar: React.FC<AvatarProps> = ({
  memberId,
  originalSrc,
  alt,
  width,
  height,
  className,
}) => {
  const [fallbackLevel, setFallbackLevel] = useState(0);
  const currentSrc = getAvatarSrc(memberId, originalSrc, fallbackLevel);

  const handleError = () => {
    if (fallbackLevel < 2) {
      setFallbackLevel(fallbackLevel + 1);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
};