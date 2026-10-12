const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeVerificationId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let body = "";
  for (const byte of bytes) body += alphabet[byte % alphabet.length];
  return `PMX-DEMO-${body}`;
}
