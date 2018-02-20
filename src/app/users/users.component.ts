import {Component, Input, NgZone, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    users: User[];

    constructor(private zone: NgZone, private userService: UserService) {
        this.users = [];
    }

    ngOnInit() {
        this.getUsers();
        //let timer = Observable.timer(2000, 5000);
        //timer.subscribe(() => this.getUsers());
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users;
                    console.log("Users: ", this.users);
                },
                error => console.error(error),
                () => console.log("Users: ", this.users)
            );
    }

    appendUser(user: User): void {
        this.users.push(user);
        console.log("UsersComponent.appendUser(): ", this.users);
    }

    logUsers(): void {
        console.log("logUsers(): ", this.users);
    }

    check(msg: string): void {
        console.log("check(): ", msg);
    }

    @Input() numbers: number[] = [1, 2];

    logNumbers(): void {
        console.log("logNumbers(): ", this.numbers);
    }

    appendNumber(number: number): void {
        console.log("UsersComponent.appendNumber(): ", number);
        this.numbers.push(number);
    }

}
