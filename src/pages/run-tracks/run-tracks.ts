import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ITrackConstraint } from 'ionic-audio';
import { TracksServiceProvider } from '../../providers/tracks-service/tracks-service';
import { AudioProvider } from 'ionic-audio';

@Component({
  selector: 'page-run-tracks',
  templateUrl: 'run-tracks.html',
})
export class RunTracksPage {

  myTracks: ITrackConstraint[];
  currentIndex: number;
  currentTrack: ITrackConstraint;
  trackNo: number;
  public _audioProvider: AudioProvider;


  constructor(public navCtrl: NavController, private _cdRef: ChangeDetectorRef, public navParams: NavParams, public tracksService: TracksServiceProvider,
  ) {
    this._audioProvider = tracksService.audioProvider;
  }

  ionViewDidLoad() {
    this.getTracks();
    this.getCurrentTrackDetails();
    console.log("Run Tracks..",this.currentIndex,"@@", this.currentTrack);
    // this.myTracks = this.tracksService._audioProvider.tracks;
    // this.play(this.currentTrack,this.currentIndex);
  }

  getTracks(){
    this.tracksService.myTracks.subscribe( tracks => {
      this.myTracks = tracks
    }, err => {
      console.log(err);
    });
  }

  getCurrentTrackDetails(){
    this.tracksService.currentTrack.subscribe( track => {
      this.currentTrack = track;
      console.log("Loggin.. ",this.currentTrack,"#####", track);
    }, err => {
      console.log(err);
    });
    this.currentIndex=this.tracksService.newIndex;
    console.log("currentIndex: ",this.currentIndex);
  }

    playSelectedTrack() {
      // use AudioProvider to control selected track
      console.log("playSelectedTrack", this.currentIndex,"$$$",this.currentTrack);

      try {
        // this.tracksService._audioProvider.stop();
        this._audioProvider.pause(this.currentIndex-1);
        this._audioProvider.play(this.currentIndex);
      }
      catch(e) {
        console.log(e);
      }

    }

    pauseSelectedTrack() {
       // use AudioProvider to control selected track
       console.log("pauseSelectedTrack ",this.currentIndex,"####");
       this._audioProvider.pause(this.currentIndex);
    }


  // play(track: ITrackConstraint, index: number) {
  //   console.log("####### play function #######",track,"###", index);
  //     this.currentTrack = track;
  //     this.currentIndex = index;
  // }
  //
  // toggle(index){
  //   // if (this._audioProvider.tracks[index].isPlaying){
  //   //   this._audioProvider.pause(index);
  //   // }
  //   // else {
  //      this._audioProvider.pause(); // Pause all others
  //     // this._audioProvider.play(index);
  //   // }
  // }
  //
  //
  // next() {
  //   // if there is a next track on the list play it
  //   if (this.myTracks.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.myTracks.length - 1) {
  //     let i = this.currentIndex + 1;
  //     let track = this.myTracks[i];
  //     this.play(track, i);
  //     console.log("####### next function #######",track,"###", this.currentIndex);
  //     this._cdRef.detectChanges();  // needed to ensure UI update
  //   } else if (this.currentIndex == -1 && this.myTracks.length > 0) {
  //     // if no track is playing then start with the first track on the list
  //     this.play(this.myTracks[0], 0);
  //   }
  // }
  //
  // onTrackFinished(track: any) {
  //   this.next();
  // }
  //
  // clear() {
  //   this.playlist = [];
  // }


}
