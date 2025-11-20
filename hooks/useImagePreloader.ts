"use client";

import { useState, useEffect } from "react";

interface UseImagePreloaderOptions {
  images: string[];
  onLoadComplete?: () => void;
}

export const useImagePreloader = ({
  images,
  onLoadComplete,
}: UseImagePreloaderOptions) => {
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setLoading(false);
      return;
    }

    let mounted = true;
    let loaded = 0;

    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();

        img.onload = () => {
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
            setProgress((loaded / images.length) * 100);
          }
          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
            setProgress((loaded / images.length) * 100);
          }
          resolve(); // Resolve anyway to not block loading
        };

        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      if (mounted) {
        setLoading(false);
        onLoadComplete?.();
      }
    });

    return () => {
      mounted = false;
    };
  }, [images, onLoadComplete]);

  return { loading, loadedCount, progress, totalImages: images.length };
};
