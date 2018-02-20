import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';

import {PhotoService} from "./photo.service";
import {PhotosComponent} from './photos/photos.component';

import {UserService} from "./user.service";
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserSearchComponent} from './user-search/user-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UserFormComponent} from './user-form/user-form.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        PhotosComponent,
        UsersComponent,
        UserDetailComponent,
        UserSearchComponent,
        DashboardComponent,
        UserFormComponent
    ],
    providers: [PhotoService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
