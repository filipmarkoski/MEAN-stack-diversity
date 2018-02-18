import {Component, OnInit} from '@angular/core';

import {User} from "../user";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

    users$: Observable<User[]>;

    private searchTerms = new Subject<string>();

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.users$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.userService.searchUsers(term)),
        );
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}
