import { Component, OnInit } from '@angular/core';
import { Friendrequest } from 'src/app/models/friendrequest.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  filteredProfiles: User[] = [];
  requestedProfiles: Friendrequest[] = [];
  private _filter: string = "";
  public get filter(): string {
    return this._filter;
  }
  public set filter(value: string) {
    this._filter = value;
    this.loadFilteredUsers(this.filter);
  }
  constructor(private friendsService: FriendsService) { }

  ngOnInit() {

  }



  sendRequest(userId:string){

    this.friendsService.postFriendRequest(userId).subscribe({

      next: data =>
      { 
          console.log("Request wurde erfolgreich gesendet")
      },
      error: (error) =>

      console.log(error.message)
    });


  }


  loadFilteredUsers(username: string){

    if(username == ""){

      this.filteredProfiles = [];
    }
    else
    this.friendsService.getFilteredProfiles(username).subscribe({
      next: data=>{

        this.filteredProfiles = data;
      },
      error: err =>{

        console.log(err)
      }
    })
  }
} 
