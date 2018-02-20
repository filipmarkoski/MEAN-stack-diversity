import {Component, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                error => console.error(error),
                () => console.log("Users: ", this.users)
            );
    }

    appendUser(user: User): void {
        console.log("From UsersComponent: ", user);
        this.users.push(user);
    }

}
