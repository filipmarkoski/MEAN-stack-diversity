import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {User} from "../user";
import {UserService} from "../user.service";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {

    @Input() user: User;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
            .subscribe(
                user => this.user = user[0],
                error => console.error(error),
                () => console.log("getUser() loaded: ", this.user)
            );
    }

    public refresh() {
        this.getUser();
    }
}
