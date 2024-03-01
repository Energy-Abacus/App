import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoadingController } from '@ionic/angular';
import { profile } from 'console';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { Friendrequest } from 'src/app/models/friendrequest.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  sentRequests: string[] = [];
  filteredProfiles: User[] = [];
  clicked: boolean = false;
  currentFriends: FriendDetails[] = [];
  requestedProfiles: Friendrequest[] = [];
  currentUser: string | undefined;
  private _filter: string = "";
  public get filter(): string {
    return this._filter;
  }
  public set filter(value: string) {
    this._filter = value;
    this.loadFilteredUsers(this.filter);
  }
  constructor(private friendsService: FriendsService, private auth: AuthService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
      this.loadFriends();
      this.auth.user$.subscribe(userProfile => {
        this.currentUser = userProfile?.sub
      })
  }



  sendRequest(userId:string){

    this.friendsService.postFriendRequest(userId).subscribe({

      next: data =>
      { 
          console.log("Request wurde erfolgreich gesendet");
          this.sentRequests.push(userId);
      },
      error: (error) =>

      console.log(error.message)
    });

   var btn = document.getElementById("requestButton"+userId);
   btn!.innerHTML = "Pending";
   btn?.setAttribute("disabled","disabled");

  }

  async loadFriends(){
    const loading = await this.loadingCtrl.create({

      message: 'Fetching data'
    });

    loading.present();


    this.friendsService.getAllRequests().subscribe({
      next: data =>{
        
        this.currentFriends = data;
        loading.dismiss();
      },
      error: err =>{
        console.log(err.message);

        loading.dismiss();
      }
    })
  }


  loadFilteredUsers(username: string){

    if(username == ""){

      this.filteredProfiles = [];
    }
    else
    this.friendsService.getFilteredProfiles(username).subscribe({
      next: data=>{

        console.log(this.currentUser)
        this.filteredProfiles = data;
          
        for (let indexI = 0; indexI < this.filteredProfiles.length; indexI++) {
          
          for (let indexJ = 0; indexJ < this.currentFriends.length; indexJ++) {
            
            if(this.filteredProfiles[indexI].user_id == this.currentFriends[indexJ].userId && this.currentFriends[indexJ].accepted || this.filteredProfiles[indexI].user_id == this.currentUser)  {

              this.filteredProfiles.splice(indexI,1);
            }
          }
        }

        

       
      
      },
      error: err =>{

        console.log(err)
      }
    })

      setTimeout(()=>{for (let index = 0; index < this.sentRequests.length; index++) {
          
        console.log(this.sentRequests[index])
        var btn = document.getElementById("requestButton"+this.sentRequests[index]);
        btn!.innerHTML = "Pending";
        btn?.setAttribute("disabled","disabled");
        
      } },350)
    
  }
} 
