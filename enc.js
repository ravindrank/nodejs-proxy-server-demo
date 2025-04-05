const apim = require("apim");
const jose = require("jose");
const crypto = require("crypto");

var kblCertinfo2 = apim.getvariable("kblcertinfo1");

apim.readInputAsJSON(function (error, payload) {
  if (error) {
    session.reject("Backend Response not a JSON: " + error);
  } else {
    var plainText = JSON.stringify(payload);

    // Creates a JWSHeader object.
    var jweHdr = jose.createJWEHeader("A256GCM");

    //  Sets a protected header name.
    jweHdr.setProtected("alg", "RSA-OAEP-256");

    // Sets a key object to process the Content Encryption Key (CEK) and output as a JWE Encrypted Key.
    jweHdr.setKey(kblCertinfo2);

    jose
      .createJWEEncrypter(jweHdr)
      // Populates the payload into a JWE encryption object.
      .update(plainText)
      // Encrypts the JWE encryption object.
      .encrypt("compact", function (error, jweCompactObj) {
        if (error) {
          session.reject("Backend Response Encryption Failed: " + error);
          return;
        } else {
          var requestconstruction = { Request: jweCompactObj };
          session.output.write(requestconstruction);
          apim.output("application/json");
          console.info("Request Encryption completed: " + requestconstruction);
        }
      });
  }
});
