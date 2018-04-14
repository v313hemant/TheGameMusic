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

  get_duration_interval: any;
  get_position_interval: any;
  duration: any = -1;
  duration_string: string;
  position: any = 0;
  position_string: string;
  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;


  constructor(public http: HttpClient, public media: Media) {
  }

  getNewIndex(): number {
    return this.newIndex;
  }

  getCurrent_is_playing(): any {
    return this.is_playing;
  }
  getCurrent_is_in_play(): any {
    return this.is_in_play;
  }
  getCurrent_is_ready(): any {
    return this.is_ready;
  }

  getCurrentDuration(): any {
    return this.duration;
  }

  getCurrentDurationString(): any {
    return this.duration_string;
  }

  getCurrentTrackPosition(): any {
    return this.position;
  }

  getCurrentPositionString(): any {
    return this.position_string;
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
      // this.stop();
      this.currentMediaObject = this.media.create(url);
      this.currentMediaObject.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      switch(status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2:   // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3:   // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4:   // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    })
      this.is_ready = true;
      this.currentMediaObject.play();
      this.getDurationAndSetToPlay();
    }

  pause() {
    try{
      this.currentMediaObject.pause();
    } catch(e){
      console.log(e.message);
    }
  }

  stop() {
    try{
      this.currentMediaObject.stop();
      this.currentMediaObject.release();
      clearInterval(this.get_position_interval);
      this.position = 0;
    } catch(e){
      console.log(e.message);
    }
  }

  controlSeconds(action) {
      let step = 15;

      let number = this.position;
      switch(action) {
        case 'back':
          this.position = number < step ? 0.001 : number - step;
          break;
        case 'forward':
          this.position = number + step < this.duration ? number + step : this.duration;
          break;
        default:
          break;
      }
    }

  getDurationAndSetToPlay() {

      let self = this;
      // this.get_duration_interval = setInterval(function() {
        if(self.duration == -1) {
          self.duration = ~~(self.currentMediaObject.getDuration());
          var date = new Date(null);
          date.setSeconds(self.duration); // specify value for SECONDS here
          var result = date.toISOString().substr(11, 8);
          self.duration_string = result;
          // self.duration_string = self.fmtMSS(self.duration);  // make it an integer
          console.log("TRACK-SERVICE: ",self.duration);
        } else {
          self.getAndSetCurrentAudioPosition();
          clearInterval(self.get_duration_interval);
        }
      // }, 100);
    }

    getAndSetCurrentAudioPosition() {
      let diff = 1;
      let self = this;
      // this.get_position_interval = setInterval(function() {
        let last_position = self.position;
        self.currentMediaObject.getCurrentPosition().then((position) => {
          if (position >= 0 && position < self.duration) {
            if(Math.abs(last_position - position) >= diff) {
              // set position
              self.currentMediaObject.seekTo(last_position*1000);
            } else {
              // update position for display
              self.position = position;
              var date = new Date(null);
              date.setSeconds(self.position); // specify value for SECONDS here
              var result = date.toISOString().substr(11, 8);
              self.position_string = result;
              // self.position_string = (self.fmtMSS(self.position).substring(0, 5));
            }
          }
          else if (position >= self.duration) {
            self.stop();
            self.newIndex++;
          }
        });
      // }, 100);
    }

    /*** utility functions ***/

    // this is replaced by the angular DatePipe:
    // https://angular.io/api/common/DatePipe
    fmtMSS(s){   // accepts seconds as Number or String. Returns m:ss
      return( s -         // take value s and subtract (will try to convert String to Number)
              ( s %= 60 ) // the new value of s, now holding the remainder of s divided by 60
                          // (will also try to convert String to Number)
            ) / 60 + (    // and divide the resulting Number by 60
                          // (can never result in a fractional value = no need for rounding)
                          // to which we concatenate a String (converts the Number to String)
                          // who's reference is chosen by the conditional operator:
              9 < s       // if    seconds is larger than 9
              ? ':'       // then  we don't need to prepend a zero
              : ':0'      // else  we do need to prepend a zero
            ) + s ;       // and we add Number s to the string (converting it to String as well)
    }

}
