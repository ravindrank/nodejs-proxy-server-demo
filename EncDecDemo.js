var encoded = new TextEncoder().encode("Hello World");
var keyPair = await window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"],
);
console.log(keyPair);
var cipherText = await window.crypto.subtle.encrypt({name: "RSA-OAEP"},keyPair.publicKey, encoded);
var originalMessage = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, keyPair.privateKey, cipherText);
console.log(new TextDecoder().decode(originalMessage));
