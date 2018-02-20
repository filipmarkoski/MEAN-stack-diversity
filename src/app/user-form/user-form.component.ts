import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {UsersComponent} from "../users/users.component";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
    providers: [UsersComponent]
})
export class UserFormComponent implements OnInit {

    /**
     * User-Form is a child of Users, therefore
     * https://angular.io/guide/component-interaction#parent-listens-for-child-event
     * The event to listen to is the ngSubmit
     * */

    @ViewChild('userForm') userForm: NgForm;

    user = new User(null, "X", "jim@gmail.com", "jimPass");
    submitted = false;

    constructor(private userService: UserService, private usersComponent: UsersComponent) {
    }

    ngOnInit() {
    }

    get diagnostic() {
        return JSON.stringify(this.user);
    }

    onSubmit() {
        this.submitted = true;
        this.addUser(this.user);
        this.userService.publishUser(this.user);
        //this.userForm.reset();
        console.log("UserFormComponent.onSubmit(): ", this.user);
    }

    clear() {
        this.user = new User(null, "", "", "");
    }

    addUser(user: User): void {
        this.userService.postUserObject(user)
            .subscribe(
                res => {
                    this.usersComponent.logUsers();
                    console.log("addUser() next: ", res);
                },
                err => console.error("addUser() error: ", err),
                () => {
                    console.log("addUser() loaded: ", user);

                }
            );
    }
}
