import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { FriendDetails } from 'src/app/models/friend-details.model';
import { Friendrequest } from 'src/app/models/friendrequest.model';
import { FriendsService } from 'src/app/services/friends.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.css'],
})
export class ViewProfilePage implements OnInit {

  actUserId: string = "";
  friends: FriendDetails[] = [];
  actUser: FriendDetails | undefined;
   //action sheet

  constructor(private route: ActivatedRoute, private router: Router,private friendsService: FriendsService, private actionSheetCtrl: ActionSheetController,private loadingCtrl: LoadingController) { }
  ngOnInit() {
   
    this.route.params.subscribe(
      (params: Params) => {

        this.actUserId = (params['id']);
      }
    )
    console.log(this.actUserId);
    this.loadUser();
    }

    async presentActionSheet(){
      const actionSheet = await this.actionSheetCtrl.create({
        header: this.actUser?.username,
        buttons: [{
          text: 'Unfriend',
          role: 'destructive',
          data:{
            action: 'delete',
          },
          handler: ()=>{

            this.deleteFriend(this.actUser?.friendshipId.toString())           
            this.router.navigate(['/tabs/social'])
          },
        },
      {
        text: 'Cancel',
        role: 'cancel',
        data:{
          action: 'cancel'
        },
      },],
      })

      await actionSheet.present();
    }

    async loadUser(){

      const loading = await this.loadingCtrl.create({

        message: 'Fetching user'

      });

      loading.present();
      this.friendsService.getAllRequests().subscribe({
        next: data =>{
           this.friends = data;  
           console.log(data);

           this.friends.forEach(element => {

              if(element.userId == this.actUserId)

              this.actUser = element;
              console.log("This thing actually works")
              console.log(this.actUser?.picture);
              console.log(this.actUser?.username)
              loading.dismiss();
              
           });
        },
        error: err =>{

          console.log("User konnte nicht geladen werden!" + err.message)
          loading.dismiss();
        }
      })
    }

    deleteFriend(id: string |undefined){
      
      this.friendsService.deleteFriend(id!).subscribe({

        next: data =>{
  
            console.log("Das Löschen war erfolgreich!" + data)

        },
        error: err =>{

          console.log("User konnte nicht entfreundet werden!" + err.message)
        }
      })
    }

   

 
  }




