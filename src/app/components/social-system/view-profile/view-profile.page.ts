import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { Friendrequest } from 'src/app/models/friendrequest.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.css'],
})
export class ViewProfilePage implements OnInit {

  actUserId: string = "";
  friends: FriendDetails[] = [];
  actUser: FriendDetails | undefined = undefined;
  constructor(private route: ActivatedRoute, private router: Router,private friendsService: FriendsService) { }
  ngOnInit() {
   
    this.route.params.subscribe(
      (params: Params) => {

        this.actUserId = (params['id']);
      }
    )
    console.log(this.actUserId);
    this.loadUser();
    }

    loadUser(){

      this.friendsService.getAllRequests().subscribe({
        next: data =>{
           this.friends = data;  
           console.log(data);

           this.friends.forEach(element => {

              if(element.userId == this.actUserId)

              this.actUser = element;
              console.log("This thing actually works")
              console.log(this.actUser?.picture);
              
           });
        },
        error: err =>{

          console.log("User konnte nicht geladen werden!" + err.message)
        }
      })
    }
    
  }




