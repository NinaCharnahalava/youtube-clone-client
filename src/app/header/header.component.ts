import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }
  
  public handleLogin(): void {
    console.log('LOGIN');
    
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }

  public handleLogout(): void {
    console.log('LOGOUT');
    
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
