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

  constructor(private router: Router) { }



  ngOnInit() {
  }

  requests: FriendDetails[] = [];
  @Input()  friends: FriendDetails[] = [];

    
  buttonClicked(id:string){

    this.router.navigate(['/view-profile/',id])
  }




}
