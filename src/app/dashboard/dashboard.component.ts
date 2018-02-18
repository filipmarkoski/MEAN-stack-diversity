import {Component, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";
import {UserDetailComponent} from "../user-detail/user-detail.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [UserDetailComponent]
})
export class DashboardComponent implements OnInit {

    users: User[] = [];

    constructor(private userService: UserService, private userDetailComponent: UserDetailComponent) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users.slice(0, 5));
    }

    public refreshUserDetailComponent(): void {
        this.userDetailComponent.refresh();
    }

}
