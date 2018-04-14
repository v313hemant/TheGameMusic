import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ITrackConstraint } from 'ionic-audio';
import { TracksServiceProvider } from '../../providers/tracks-service/tracks-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-run-tracks',
  templateUrl: 'run-tracks.html',
})
export class RunTracksPage {

  myTracks: ITrackConstraint[];
  currentIndex: number;
  public currentTrack: ITrackConstraint;
  trackNo: number;
  trackTittle: string;
  currentDuration: any;
  duration_string: string;
  currentPosition: any;
  position_string: any;
  get_position_interval: any;
  index: number = 1;
  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = true;

  constructor(public navCtrl: NavController,
    private _cdRef: ChangeDetectorRef, public navParams: NavParams,
    public tracksService: TracksServiceProvider,
  ) {
    this.getTracks();
    this.getCurrentTrackDetails();
    this.trackTittle = this.currentTrack.title;
    console.log("myTracks..",this.myTracks);
    console.log("Run Tracks..",this.currentIndex,"@@", this.currentTrack);
    console.log("currentDuration: ",this.currentDuration);
  }

  ionViewDidLoad() {
    // this.getTracks();
    // this.getCurrentTrackDetails();
    // this.trackTittle = this.currentTrack.title;
    // console.log("myTracks..",this.myTracks);
    // console.log("Run Tracks..",this.currentIndex,"@@", this.currentTrack);
    // console.log("currentDuration: ",this.currentDuration);
    // this.myTracks = this.tracksService._audioProvider.tracks;
    // this.play(this.currentTrack,this.currentIndex);
  }

  controlSecondsService(action){
    this.tracksService.controlSeconds(action);
  }

  play() {
      // this.stop();
      this.tracksService.play(this.currentTrack.src);
      let self = this;
      this.get_position_interval = setInterval(function() {
          self.tracksService.getDurationAndSetToPlay();
          self.currentDuration = self.tracksService.getCurrentDuration();
          self.is_ready = self.tracksService.getCurrent_is_ready();
          self.is_playing = self.tracksService.getCurrent_is_playing();
          self.is_in_play = self.tracksService.getCurrent_is_in_play();
          self.currentPosition = self.tracksService.getCurrentTrackPosition();
          self.position_string = self.tracksService.getCurrentPositionString();
          self.duration_string = self.tracksService.getCurrentDurationString();
          let i = self.tracksService.getNewIndex();
          if(self.index!==i){
            self.index=i;
            self.currentTrack = self.getNewTrack(i);
            self.trackTittle = self.currentTrack.title;
            self.tracksService.play(self.currentTrack.src);
          }
      }, 100);
    }

  getNewTrack(i: number): ITrackConstraint {
    return this.myTracks[i];
  }

  pause() {
    this.tracksService.pause();
  }

  stop() {
    this.tracksService.stop();
    clearInterval(this.get_position_interval);
    this.currentPosition = 0;
  }

  getTracks(){
    this.tracksService.myTracks.subscribe( tracks => {
      this.myTracks = tracks
      console.log("getTracks: ",this.myTracks);
    }, err => {
      console.log(err);
    });
  }

  getCurrentTrackDetails(){
    this.tracksService.currentTrack.subscribe( track => {
      this.currentTrack = track;
      console.log("Logging.. ",this.currentTrack,"#####", track);
      console.log("currentTrack.src ",this.currentTrack.src);
    }, err => {
      console.log(err);
    });
    this.currentIndex=this.tracksService.newIndex;
    console.log("currentIndex: ",this.currentIndex);
  }

}
