import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ITrackConstraint } from 'ionic-audio';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestProvider {

  private playlistTracksURL = 'http://18.218.127.133:8080/streamIt/getPlaylistTracks';
  private artistTracksURL = 'http://18.218.127.133:8080/streamIt/getArtistTracks';
  private youtubeSearchTracks = "http://18.218.127.133:8080/streamIt/searchYoutube";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getSearchYoutubeTracks(inputQuery): Observable<ITrackConstraint[]> {
    const params = new HttpParams().set('inputQuery', inputQuery);
    return this.http.get(this.youtubeSearchTracks, {params: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPlaylistTracks(entityName): Observable<ITrackConstraint[]> {

    const params = new HttpParams().set('entity', entityName);
    return this.http.get(this.playlistTracksURL, {params: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getArtistTracks(entityName): Observable<ITrackConstraint[]> {

    const params = new HttpParams().set('entity', entityName);
    return this.http.get(this.artistTracksURL, {params: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
