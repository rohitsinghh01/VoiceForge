"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeroPattern } from "@/features/dashboard/components/hero-pattern";
import { PromptSuggestions } from "@/features/text-to-speech/components/prompt-suggestions";
import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";

export function LandingHero() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleTry = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const redirectUrl = `/text-to-speech?text=${encodeURIComponent(trimmed)}`;
    router.push(`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <HeroPattern />
      <div className="relative mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <Badge variant="outline" className="border-dashed">
              AI text-to-speech & voice cloning
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Turn text into{" "}
              <span className="bg-linear-to-r from-[#ff8ee3] via-[#57d7e0] to-[#818CF8] bg-clip-text text-transparent">
                lifelike speech
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Write a script, choose a voice, and generate studio-quality audio in
              seconds. Perfect for stories, ads, podcasts, games, and more.
            </p>
          </div>

          <div className="text-left">
            <div className="rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5 shadow-[0_0_0_4px_white]">
              <div className="rounded-[20px] bg-[#F9F9F9] p-1">
                <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">
                  <Textarea
                    placeholder="Try it now — paste your text here..."
                    className="min-h-35 resize-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={TEXT_MAX_LENGTH}
                  />

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="gap-1.5 border-dashed">
                      <Coins className="size-3 text-chart-5" />
                      <span className="text-xs">
                        {text.length === 0 ? (
                          "From $0.30 per 1,000 characters"
                        ) : (
                          <>
                            <span className="tabular-nums">
                              ${(text.length * COST_PER_UNIT).toFixed(4)}
                            </span>{" "}
                            estimated
                          </>
                        )}
                      </span>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {text.length.toLocaleString()} /{" "}
                      {TEXT_MAX_LENGTH.toLocaleString()} characters
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end p-3">
                  <Button
                    size="lg"
                    disabled={!text.trim()}
                    onClick={handleTry}
                    className="w-full sm:w-auto"
                  >
                    Try for free
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <PromptSuggestions onSelect={setText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
