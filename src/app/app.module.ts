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
import { AreaMessageComponent } from './message/area-message/area-message.component';
import { DialogsComponent } from './message/dialogs/dialogs.component';
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
    DialogsComponent,
    AreaMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut : 1500,
      positionClass : "toastr-top-right",
      preventDuplicates : false
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserService,HomeGuard,ProfileService],
  bootstrap: [AppComponent],
  entryComponents: [ChangeProfileComponent]
})
export class AppModule { }
