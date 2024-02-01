import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { stat } from 'fs';
import { PlugsService } from 'src/app/services/plugs.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  public progress = 0;
  isFirstButtonDisabled: boolean = true;
  isSecondButtonDisabled: boolean = false;
  isHidden: boolean = true;
  isInvalid: boolean = false;

  private _ssid: string = "";
  public get ssid(): string {
    return this._ssid;
  }
  public set ssid(value: string) {
    this._ssid = value;
    this.checkCredentials();
  }
  private _password: string = "";
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
    this.checkCredentials();
  }
  isTutorialDone: boolean = false;

  cardTitle: string = "Welcome !";
  cardText: string =  "Have you ever wondered how much energy your house produces? Energy Abacus was designed to help you in any aspect regarding energy usage."
  currentCount: number = 0;
  errorMessage: string;

  ngOnInit(): void {
    
  }

  async showLoading(){

    
    if(this.progress == 1){

      const loading = await this.loadingCtrl.create({
        message: "Connecting to plug...",
      
  
      });
      await loading.present();
  
       (await this.plugService.connectToPlug(this.ssid,this.password)).subscribe({
      next: data =>{
  
        console.log("Verbindung war erfolgreich!" + data);
         loading.dismiss();

        
      },
      error: err=>{

        this.errorMessage = "Your Wifi credentials are wrong! " + err;
        
         loading.dismiss();
         this.isInvalid = true;
        this.changeText(-1);    
      
      }
      })
      
    }

    
   
  }

  constructor(private plugService: PlugsService, private loadingCtrl: LoadingController) { }

  
  changeText(count: number) {

    this.currentCount+= count;

    
    switch(this.currentCount){

      case 0:

        this.progress = 0;
        this.isFirstButtonDisabled = true;
        this.cardTitle = "Welcome !";
        this.cardText="Have you ever wondered how much energy your house produces? Energy Abacus was designed to help you in any aspect regarding energy usage.";
        console.log(this.progress);
        break;

      case 1:

        if(this.isFirstButtonDisabled){

          this.isFirstButtonDisabled = false;
        }

      this.progress = 0.2;
      this.cardTitle= "Tutorial";
      this.cardText="This tuorial is meant to help you setup your first plug in the app so follow the steps accordingly!"
      console.log(this.progress);
      break;

      case 2: 

      this.progress = 0.4;
      this.cardTitle = "1. Step"
      this.cardText="First step is connecting your smart plug to any circuit in order to turn it on."
      break;

      case 3:

      this.progress = 0.6;
      this.cardTitle = "2. Step"
      this.cardText= "Next step is making sure that the Wifi of your device is connected to that of the plug that is currently being used."
      this.isHidden = true;

      break;

      case 4:

      this.isSecondButtonDisabled = true;

      this.progress = 0.8;
      this.cardTitle = "3. Step"
      this.cardText = "Let's configure our shelly plug! Type in your wifi credentials to continue the setup."
        
      
     
      this.isHidden = false;
      break;

      case 5:

      this.isSecondButtonDisabled = true;

      this.progress = 1;
      this.cardTitle = "4. Step"
      this.cardText = "Now you have to make sure, that the Wifi of your mobile is connected to the same Wifi that is being used by the hub."
      this.isHidden = true;
      break;

      case 6:
  
      this.isTutorialDone = true;
    }
    
    
  }

  checkCredentials(){

    if(this.ssid.length > 0 && this.password.length > 0){

      this.isSecondButtonDisabled = false;
    }
  }

 
  
}
