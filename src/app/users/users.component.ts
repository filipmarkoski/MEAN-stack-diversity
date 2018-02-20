import {Component, Injectable, Input, NgZone, OnChanges, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})

@Injectable()
export class UsersComponent implements OnInit, OnChanges {
    users: User[];


    searchCaseUser: User;
    constructor(private zone: NgZone, private userService: UserService) {
        this.users = [];
        this.userService.caseUser$
            .subscribe(user => {
                this.searchCaseUser = user;
                let copy = Object.assign({}, user);
                this.users.push(copy);
            });

    }

    ngOnInit() {
        this.getUsers();
    }

    ngOnChanges() {
        this.getUsers();

    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.zone.run(() => this.users = users);
                    console.log("Users: ", this.users);

                },
                error => console.error(error),
                () => console.log("Users: ", this.users)
            );
    }

    logUsers(): void {
        this.getUsers();
        console.log("logUsers(): ", this.users);
    }


}
