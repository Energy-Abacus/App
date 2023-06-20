import { Component, OnInit } from '@angular/core';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {

  constructor(private friendsService: FriendsService) { }

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
