import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { Friendrequest } from 'src/app/models/friendrequest.model';
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {

  constructor(private friendsService: FriendsService, private refreshService: RefreshService) { }
  

  ngOnInit() {

    this.loadRequestedProfiles();
  
  }

  requests: FriendDetails[] = [];
  filteredRequests: FriendDetails[] = [];


    loadRequestedProfiles(){

      this.friendsService.getAllRequests().subscribe({
        next: data =>{
          this.requests = data;
          console.log("Daten wurden erfolgreich geladen!" +data.length)
         this.filterRequests();


        },
        error: err => {

          console.log("Daten konnten nicht geladen werden!" + err.message);
        }
      })
       
    }

    Accepted(receiverId: string){

      this.friendsService.updateRequest(true,receiverId).subscribe({
        next: data => {
          
          console.log("Die Freundschaftsanfrage wurde erfolgreich akzeptiert" + data)
        },
        error: err =>{

          console.log("Konnte dies nicht ausführen" + err)
        }
      })


        this.filteredRequests = this.filteredRequests.filter(user => user.userId !== receiverId);
    }




    Declined(receiverId: string){

      this.friendsService.updateRequest(false,receiverId).subscribe({
        next: data => {
          
          console.log("Die Freundschaftsanfrage wurde erfolgreich abgelehnt" + data)
        },
        error: err =>{

          console.log("Konnte dies nicht ausführen")
        }
      })

      this.filteredRequests = this.filteredRequests.filter(user => user.userId !== receiverId);

    }


    filterRequests(){

        this.requests.forEach(element => {

            if(!element.accepted && !element.outgoing ){

              this.filteredRequests.push(element);
            }
          
        });


        console.log(this.filteredRequests)
    }

   

}
