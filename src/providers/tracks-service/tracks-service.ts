import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrackConstraint } from 'ionic-audio';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AudioProvider } from 'ionic-audio';
import { Media, MediaObject } from '@ionic-native/media';

@Injectable()
export class TracksServiceProvider {

  private homeMyTracks = new BehaviorSubject<ITrackConstraint[]>(null);
  private homeCurrentTrack = new BehaviorSubject<ITrackConstraint>(null);
  private homeCurrentIndex = new BehaviorSubject<number>(null);

  myTracks = this.homeMyTracks.asObservable();
  currentTrack = this.homeCurrentTrack.asObservable();
  currentIndex = this.homeCurrentIndex.asObservable();
  newIndex: number = 0;
  mediaObject: MediaObject[];
  currentMediaObject: MediaObject;

  constructor(public http: HttpClient, public media: Media) {

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

  play(url: string) {
      this.stop();
      this.currentMediaObject = this.media.create(url);
      this.currentMediaObject.play();
      // this.mediaObject[this.newIndex] = this.media.create(url);
      // this.currentMediaObject = this.mediaObject[this.newIndex];
      // this.currentMediaObject.play();
    }

  stop() {
    try{
      this.currentMediaObject.stop();
    } catch(e){
      console.log(e.message);
    }
  }


  // stopTrack(){
  //   console.log("Should pause...");
  //   this._audioProvider.pause();
  // }

}
