export const environment = {
  production: false,
    auth0: {
      domain: 'youtube-clone-test-auth.eu.auth0.com',
      clientId: 'Qe9Onq2b85dCytkdDin57Nd0CDCkqTSd',
      authorizationParams: {
        audience: 'http://localhost:8080',
        redirect_uri: 'http://localhost:4200/callback',
      },
      errorPath: '/callback',
    },
    api: {
      serverUrl: 'http://localhost:8080',
    },
};
  