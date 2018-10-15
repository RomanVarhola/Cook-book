import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser;
  public headerData: number = 0;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.getCurrentUser();
    }
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser()
      .subscribe(res => {
        this.currentUser = res.data.user;
      });
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.currentUser = null;
  }
}
