import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SingUpComponent } from './user/sing-up/sing-up.component';
import { SingInComponent } from './user/sing-in/sing-in.component';
import { HomeGuard } from './home.guard';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { DialogsComponent } from './message/dialogs/dialogs.component';
import { AreaMessageComponent } from './message/area-message/area-message.component';

export const appRoutes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [HomeGuard] },
    {
        path: "singup", component: UserComponent,
        children:
            [
                { path: "", component: SingUpComponent }
            ]
    },
    {
        path: "login", component: UserComponent,
        children:
            [
                { path: "", component: SingInComponent }
            ]
    },
    {
        path: "messages", component: HomeComponent,
        children:
            [
                { path: "", component: MessageComponent }
            ]
    },

    {
        path: "profile", component: HomeComponent,
        children:
            [
                { path: "", component: ProfileComponent }
            ]
        , canActivate: [HomeGuard]

    },
    { path: "", redirectTo: "/login", pathMatch: "full" }

];
