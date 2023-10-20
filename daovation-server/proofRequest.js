const { KYCAgeCredential } = require("./vcHelpers/KYCAgeCredential");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
/*   birthday: {
    // users must be born before this year
    // birthday is less than Jan 1, 2023
    $lt: 20230101,
  }, */

const humanReadableAuthReason = "Must be born before this year";

const credentialSubject = {
  countryCode: { $nin: [840, 120, 340, 509], },
};

const proofRequest = KYCAgeCredential(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
