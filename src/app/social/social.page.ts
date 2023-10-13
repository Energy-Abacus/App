import { Component, OnInit } from '@angular/core';
import { FriendDetails } from '../models/friend-details.model';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.css'],
})
export class SocialPage implements OnInit {

  constructor(private friendsService: FriendsService) { }

  viewPage: string = "";
  requests: FriendDetails[] = [];
  friends: FriendDetails[] = [];

  ngOnInit() {
  }

  segmentChanged(event: any){

    if(this.viewPage == "Friends"){

      this.loadFriends();
      console.log("Segment has changed to Friends")
    }
  
  }

  
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
    // this.auth.user$.subscribe(user => {this.currentUser = user}) 
    this.requests.forEach(element => {

      if(element.accepted){

        this.friends.push(element);
        console.log(element);
      }
      
    });
  }



}
