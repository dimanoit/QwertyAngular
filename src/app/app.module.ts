import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {FormsModule,ReactiveFormsModule } from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ToastrModule} from "ngx-toastr"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingUpComponent } from './user/sing-up/sing-up.component';
import { from } from 'rxjs';
import { UserService } from './user/shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SingInComponent } from './user/sing-in/sing-in.component';
import { HomeComponent } from './home/home.component';
import { RouterModule} from "@angular/router"
import { appRoutes } from './routes';
import { HomeGuard } from './home.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/ProfileService/profile.service';
import { ChangeProfileComponent } from './profile/change-profile/change-profile.component';
import 'materialize-css';
import { MaterializeModule } from "angular2-materialize";
import { MessageComponent } from './message/message.component';
import { SmsService } from 'src/app/message/sms/sms.service'
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { FriendsComponent } from './friends/friends.component';
import { FriendshipRequestServiceService } from './friends/friendshipRequestService/friendship-request-service.service';
import { FriendService } from './friends/friendService/friend.service';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/adminService/admin.service';
import { BlockUserComponent } from './block-user/block-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    UserComponent,
    SingInComponent,
    HomeComponent,
    ProfileComponent,
    ChangeProfileComponent,
    MessageComponent,
    FriendsComponent,
    AdminComponent,
    BlockUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    ScrollDispatchModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut : 1500,
      positionClass : "toastr-top-right",
      preventDuplicates : false
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserService,HomeGuard,ProfileService,SmsService,
    FriendshipRequestServiceService,FriendService,AdminService],
  bootstrap: [AppComponent],
  entryComponents: [ChangeProfileComponent]
})
export class AppModule { }
