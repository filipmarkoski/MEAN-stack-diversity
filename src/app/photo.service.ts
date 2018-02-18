import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {Photo} from "./photo";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PhotoService {

    private photosUrl = 'http://localhost:3000/photos';

    constructor(private http: HttpClient) {
    }

    getPhotos(): Observable<Photo[]> {
        return this.http.get<Photo[]>(this.photosUrl);
    }

    getPhoto(id: number): Observable<Photo[]> {
        console.log(this.photosUrl + id);
        return this.http.get<Photo[]>(this.photosUrl + id);
    }

}
