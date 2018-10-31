import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.currentUser = null;
  }
}
