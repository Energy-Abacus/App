import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {

  constructor(private friendsService: FriendsService,private router: Router) { }

  ngOnInit() {
    this.loadFriends();
  }


  requests: FriendDetails[] = [];
  friends: FriendDetails[] = [];


  loadFriends(){

    this.friendsService.getAllRequests().subscribe({
      next: data =>{
        this.requests = data;
        console.log("Freunde wurden erfolgreich geladen!")
        this.filterFriends();
      },
      error: err =>{
        console.log("Freunde konnten nicht geladen werden!" + err.message)
      }
    }
      
    )
  }

  buttonClicked(id:string){

    this.router.navigate(['/view-profile/',id])
  }


  filterFriends(){

    this.friends = [];

    this.requests.forEach(element => {

      if(element.accepted){

        this.friends.push(element);
        console.log(element);
      }
      
    });
  }
}
