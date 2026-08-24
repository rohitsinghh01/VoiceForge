/**
 * Proxies upstream audio for same-origin playback. Safari requires a known
 * Content-Length (chunked responses without it often make HTMLAudioElement.play()
 * reject with NotSupportedError); Chrome is more forgiving.
 */
export async function proxyAudioFromUpstream(
  audioResponse: Response,
  cacheControl: string,
): Promise<Response> {
  const rawType = audioResponse.headers.get("content-type");
  const contentType =
    rawType?.split(";")[0]?.trim() || "audio/wav";

  const contentLength = audioResponse.headers.get("content-length");

  if (contentLength) {
    return new Response(audioResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": contentLength,
        "Cache-Control": cacheControl,
      },
    });
  }

  const buffer = await audioResponse.arrayBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": cacheControl,
    },
  });
}