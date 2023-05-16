import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto-js';
function base64URLEncode(str) {
  return str
    .toString(Base64)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function generateCodeVerifier() {
  return base64URLEncode(Base64.stringify(crypto.lib.WordArray.random(32)));
}

export function generateCodeChallenge(verifier) {
  return base64URLEncode(sha256(verifier));
}
