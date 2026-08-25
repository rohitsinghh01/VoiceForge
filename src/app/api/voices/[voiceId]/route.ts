import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { proxyAudioFromUpstream } from "@/lib/proxy-audio-response";
import { getSignedAudioUrl } from "@/lib/r2";

const FETCH_VOICE_AUDIO_TIMEOUT_MS = 30_000;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ voiceId: string }> },
) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { voiceId } = await params;

  const voice = await prisma.voice.findUnique({
    where: { id: voiceId },
    select: {
      variant: true,
      orgId: true,
      r2ObjectKey: true,
    },
  });

  if (!voice) {
    return new Response("Not found", { status: 404 });
  }

  if (voice.variant === "CUSTOM" && voice.orgId !== orgId) {
    return new Response("Not found", { status: 404 });
  }

  if (!voice.r2ObjectKey) {
    return new Response("Voice audio is not available yet", { status: 409 });
  }

  let signedUrl: string;
  try {
    signedUrl = await getSignedAudioUrl(voice.r2ObjectKey);
  } catch (cause) {
    const detail =
      cause instanceof Error ? cause.message : String(cause);
    return new Response(
      `Failed to generate signed URL: ${detail}`,
      { status: 502 },
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    FETCH_VOICE_AUDIO_TIMEOUT_MS,
  );

  let audioResponse: Response;
  try {
    audioResponse = await fetch(signedUrl, { signal: controller.signal });
  } catch {
    clearTimeout(timeoutId);
    if (controller.signal.aborted) {
      return new Response(
        "Timed out while fetching voice audio from storage",
        { status: 504 },
      );
    }
    return new Response("Failed to fetch voice audio from storage", {
      status: 502,
    });
  }
  clearTimeout(timeoutId);

  if (!audioResponse.ok) {
    return new Response(
      `Failed to fetch voice audio: storage returned ${audioResponse.status}`,
      { status: 502 },
    );
  }

  const cacheControl =
    voice.variant === "SYSTEM"
      ? "public, max-age=86400"
      : "private, max-age=3600";

  return proxyAudioFromUpstream(audioResponse, cacheControl);
};