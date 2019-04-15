import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SingUpComponent } from './user/sing-up/sing-up.component';
import { SingInComponent } from './user/sing-in/sing-in.component';
import { HomeGuard } from './home.guard';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { FriendsComponent } from './friends/friends.component';
import { AdminComponent } from './admin/admin.component';
import { BlockUserComponent } from './block-user/block-user.component';

export const appRoutes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [HomeGuard] },
    { path: "blocked", component: BlockUserComponent},
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
        path: 'adminPanel', component: HomeComponent, canActivate: [HomeGuard], data: { roles: ['admin'] },
        children:
            [
                { path: "", component: AdminComponent }

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
    {
        path: "friends", component: HomeComponent,
        children:
            [
                { path: "", component: FriendsComponent }
            ]
        , canActivate: [HomeGuard]

    },
    { path: "", redirectTo: "/profile", pathMatch: "full" }

];
