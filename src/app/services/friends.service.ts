import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';
import { Friendrequest } from '../models/friendrequest.model';
import { FriendDetails } from '../models/friend-details.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}





@Injectable({
  providedIn: 'root'
})


export class FriendsService {

  private url="https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/elig-add-test-coverage/api/v1/friendship"


  constructor(private http: HttpClient, private auth: AuthService) { }

  getFilteredProfiles(username: string){

    let httpParams = new HttpParams({ fromObject: { username: username } });

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<User[]>(this.url+"/search",{
        headers: {'Authorization': 'Bearer ' + token}, params: httpParams
      }))
    )
  }

  getProfiles(){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Friendrequest[]>(this.url,{
        headers: {'Authorization': 'Bearer ' + token}
      }))
    )
  }

  postFriendRequest(userId: string){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.post<string>(this.url,userId, {
        headers: {'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
      }))
    )
  }

  updateRequest(accept: boolean, receiverId: string){



    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.post<any>(this.url + '/reaction', { sender: receiverId, accept: accept }, {
        headers: {
          'Authorization': 'Bearer ' + token

        }
      }) )
    )
  }


  
  getProfile(){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<User>(this.url, {
        headers: {'Authorization': 'Bearer ' + token}
      }))
    )

  }

  getAllRequests(){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<FriendDetails[]>(this.url+"/friend-details",{
        headers: {'Authorization': 'Bearer ' + token}
      }))
    )
  }

}
