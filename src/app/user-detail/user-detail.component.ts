import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {User} from "../user";
import {UserService} from "../user.service";
import {map, switchMap} from "rxjs/operators";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {

    @Input() user: User;

    //public user: User;

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser(): void {
        this.route.params.pipe(
            map(params => params.userId),
            switchMap(userId => this.userService.getUser(+userId))
        ).subscribe(
            user => this.user = user[0],
            err => console.error(err),
            () => console.log("getUser() loaded: ", this.user)
        );
    }

    public refresh() {
        this.getUser();
    }
}
