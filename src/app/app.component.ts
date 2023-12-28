import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'youtube-clone-cli';
  isAuth0Loading$!: Observable<boolean>
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isAuth0Loading$ = this.auth.isLoading$;
  }
}
