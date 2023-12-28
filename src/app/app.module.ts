import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from "ngx-file-drop";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthConfigModule } from './auth/auth-config.module';
import { environment as env } from '../environments/environment';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { PageLoaderComponent } from './shared/page-loader.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeaturedVideosComponent } from './featured-videos/featured-videos.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CallbackComponent } from './callback/callback.component';
import { CommentsComponent } from './comments/comments.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    SaveVideoDetailsComponent,
    VideoPlayerComponent,
    PageLoaderComponent,
    VideoDetailComponent,
    HomeComponent,
    HistoryComponent,
    SubscriptionsComponent,
    LikedVideosComponent,
    SidebarComponent,
    FeaturedVideosComponent,
    VideoCardComponent,
    CallbackComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    FlexLayoutModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AuthConfigModule,
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: [`${env.api.serverUrl}/*`]
      },
    }),
  ],
  providers: [
    {provide: 
      HTTP_INTERCEPTORS, 
      useClass: AuthHttpInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private oidcSecurityService: OidcSecurityService) {}
}
