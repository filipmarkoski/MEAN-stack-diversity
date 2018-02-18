import {Component, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();

        //this.postUser("Ball", "ball@gmail.com", "ballPass");
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                error => console.error(error),
                () => console.log("Users: ", this.users)
            );
    }

    postUser(name: string, email: string, password: string): void {
        this.userService.postUser(name, email, password);
    }
}
