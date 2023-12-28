import { NgModule } from '@angular/core';
import { AuthModule, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';

@NgModule({
    imports: [
        AuthModule.forRoot({
            config: {
                authority: 'https://youtube-clone-test-auth.eu.auth0.com',
                redirectUrl: window.location.origin,
                clientId: 'Qe9Onq2b85dCytkdDin57Nd0CDCkqTSd',
                scope: 'openid profile offline_access email',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                secureRoutes: ['http://localhost:8080/'],
                customParamsAuthRequest: {
                    audience: 'http://localhost:8080/'
                }
              }
            })
        ],
        exports: [AuthModule],
})
export class AuthConfigModule {}