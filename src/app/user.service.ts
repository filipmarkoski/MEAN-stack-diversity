import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Observable} from 'rxjs/Observable';
import {of} from "rxjs/observable/of";
import {catchError, map, tap} from 'rxjs/operators';

import {User} from "./user";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    //headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class UserService {

    private usersUrl = 'http://localhost:3000/users';  // URL to web api

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        console.log("UserService.getUser(id): ", url);
        return this.http.get<User>(url);
    }

    postUserObject(user: User) {
        return this.postUser(user.name, user.email, user.password);
    }

    postUser(name: string, email: string, password: string) {
        var url = `${this.usersUrl}/post`;
        var data = {
            name: name,
            email: email,
            password: password
        };
        return this.http.post<User>(url, JSON.stringify(data), httpOptions);
    }

    /* GET heroes whose name contains search term */
    searchUsers(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        const url = this.usersUrl + `/${term}`;
        return this.http.get<User[]>(url).pipe(
            //tap(_ => this.log(`found users matching "${term}"`)),
            catchError(this.handleError<User[]>('searchUsers', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}



