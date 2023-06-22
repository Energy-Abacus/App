import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialPageRoutingModule } from './social-routing.module';

import { SocialPage } from './social.page';
import { ExploreContainerComponentModule } from '../components/explore-container/explore-container.module';
import { AddComponent } from '../components/social-system/add/add.component';
import { FriendsComponent } from '../components/social-system/friends/friends.component';
import { RequestsComponent } from '../components/social-system/requests/requests.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SocialPageRoutingModule,
  ],
  declarations: [SocialPage, AddComponent, FriendsComponent, RequestsComponent]
})
export class SocialPageModule {}
