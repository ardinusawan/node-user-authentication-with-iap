const {OAuth2Client} = require('google-auth-library');

const projectNumber = '' //TODO: Change this
const projectId = '' //TODO: change this

// Expected Audience for App Engine.
const expectedAudience = `/projects/${projectNumber}/apps/${projectId}`;

const oAuth2Client = new OAuth2Client();

async function verify(iapJwt) {
  // Verify the id_token, and access the claims.
  const response = await oAuth2Client.getIapPublicKeys();
  const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
    iapJwt,
    response.pubkeys,
    expectedAudience,
    ['https://cloud.google.com/iap']
  );
  // Print out the info contained in the IAP ID token
  console.log(ticket);
  return ticket
}

module.exports = {verify};
