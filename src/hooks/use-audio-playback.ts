"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayback(src: string | File | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current = null;
      }
    };
  }, [src]);

  const togglePlay = useCallback(() => {
    if (!src) return;

    if (!audioRef.current) {
      const url = src instanceof File ? URL.createObjectURL(src) : src;
      const audio = new Audio(url);
      audio.preload = "auto";
      audioRef.current = audio;
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener(
        "canplaythrough",
        () => setIsLoading(false),
        { once: true },
      );
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      void audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  }, [src, isPlaying]);

  return { isPlaying, isLoading, togglePlay };
};