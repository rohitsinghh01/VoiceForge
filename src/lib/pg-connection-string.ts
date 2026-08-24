const LEGACY_STRICT_SSL_MODES = new Set(["prefer", "require", "verify-ca"]);

/**
 * pg v8 treats prefer/require/verify-ca as verify-full. Make that explicit so
 * connections stay strict and pg-connection-string v3 / pg v9 do not warn.
 */
export function normalizePgConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslmode = url.searchParams.get("sslmode");

    if (sslmode && LEGACY_STRICT_SSL_MODES.has(sslmode)) {
      url.searchParams.set("sslmode", "verify-full");
      return url.toString();
    }

    return connectionString;
  } catch {
    return connectionString.replace(
      /([?&]sslmode=)(prefer|require|verify-ca)(?=&|$)/,
      "$1verify-full",
    );
  }
}