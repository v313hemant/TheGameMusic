import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrackConstraint } from 'ionic-audio';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AudioProvider } from 'ionic-audio';

@Injectable()
export class TracksServiceProvider {

  private homeMyTracks = new BehaviorSubject<ITrackConstraint[]>(null);
  private homeCurrentTrack = new BehaviorSubject<ITrackConstraint>(null);
  private homeCurrentIndex = new BehaviorSubject<number>(null);

  myTracks = this.homeMyTracks.asObservable();
  currentTrack = this.homeCurrentTrack.asObservable();
  currentIndex = this.homeCurrentIndex.asObservable();
  newIndex: number = 0;

  constructor(public http: HttpClient, public audioProvider: AudioProvider) {

  }

  setMyTracks(myTracks: ITrackConstraint[]){
    this.homeMyTracks.next(myTracks);
  }

  setCurrentTrack(currentTrack: ITrackConstraint, currentIndex: number){
    this.homeCurrentTrack.next(currentTrack);
    this.homeCurrentIndex.next(currentIndex);

    //Make track newIndex
    this.newIndex++;
  }

  // stopTrack(){
  //   console.log("Should pause...");
  //   this._audioProvider.pause();
  // }

}
