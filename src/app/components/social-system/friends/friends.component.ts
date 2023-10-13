import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {

  constructor(private friendsService: FriendsService,private router: Router, private refreshService: RefreshService,private auth: AuthService, private renderer: Renderer2  ) { }



  ngOnInit() {
  }

  requests: FriendDetails[] = [];
  @Input()  friends: FriendDetails[] = [];

    

  





  buttonClicked(id:string){

    this.router.navigate(['/view-profile/',id])
  }

  isComponentHidden(): boolean {
    const element = this.renderer.selectRootElement('app-friends');
    const computedStyle = window.getComputedStyle(element);
  
    // Check for display property
    const displayProperty = computedStyle.getPropertyValue('display');
    if (displayProperty === 'none') {
      return true;
    }
  
    // Check for visibility property
    const visibilityProperty = computedStyle.getPropertyValue('visibility');
    return visibilityProperty === 'hidden';
  }



}
