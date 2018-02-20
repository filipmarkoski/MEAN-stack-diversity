import {Component, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";
import {UserDetailComponent} from "../user-detail/user-detail.component";

import {Observable} from 'rxjs/observable';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [UserDetailComponent]
})
export class DashboardComponent implements OnInit {

    users: User[] = [];
    public users$: Observable<User[]>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => this.users = users.slice(0, 5));
    }
}
