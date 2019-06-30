import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly rootUrl = "http://localhost:52534/api/Account/";

  constructor(private http: HttpClient) { }

  GetUserProfile() {
    return this.http.get(this.rootUrl + localStorage.getItem("UserId"),
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

  ChangeProfile(profile: Profile) {
    return this.http.put(this.rootUrl, profile,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }
  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.http.post(this.rootUrl + localStorage.getItem("UserId") + "/uploadImage", formData,
     { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

}
