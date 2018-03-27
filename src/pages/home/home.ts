import { Component, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ITrackConstraint } from 'ionic-audio';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myTracks: ITrackConstraint[];
  playlist: ITrackConstraint[] = [];
  entityName: string;
  entityType: string;
  currentIndex: number = -1;
  currentTrack: ITrackConstraint;
  errorMessage: string;

  constructor(private _cdRef: ChangeDetectorRef, private navParams: NavParams, public rest: RestProvider) {
    this.entityName = navParams.get('entityName');
    this.entityType = navParams.get('entityType');
    if(this.entityType === "playlist"){
      console.log("####### playlist #######",this.entityName);
      if(this.entityName === "My Mix"){
        this.getPlaylistTracks('1');
      }
      else if(this.entityName === "My Electronic Mix"){
        this.getPlaylistTracks('2');
      }
      else{
        this.getPlaylistTracks('3');
      }

    }
    else{
      console.log("####### artist #######",this.entityName);
      this.getArtistTracks(this.entityName);
    }


  }

  getPlaylistTracks(entityName: string){
    this.rest.getPlaylistTracks(entityName)
           .subscribe(
             myTracks => this.myTracks = myTracks,
             error =>  this.errorMessage = <any>error);
  }

  getArtistTracks(entityName: string){
    this.rest.getArtistTracks(entityName)
           .subscribe(
             myTracks => this.myTracks = myTracks,
             error =>  this.errorMessage = <any>error);
  }
  add(track: ITrackConstraint) {
    this.playlist.push(track);
  }

  play(track: ITrackConstraint, index: number) {
      this.currentTrack = track;
      this.currentIndex = index;
  }

  next() {
    // if there is a next track on the list play it
    if (this.playlist.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.playlist.length - 1) {
      let i = this.currentIndex + 1;
      let track = this.playlist[i];
      this.play(track, i);
      this._cdRef.detectChanges();  // needed to ensure UI update
    } else if (this.currentIndex == -1 && this.playlist.length > 0) {
      // if no track is playing then start with the first track on the list
      this.play(this.playlist[0], 0);
    }
  }

  onTrackFinished(track: any) {
    this.next();
  }

  clear() {
    this.playlist = [];
  }

}



//   // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
//   this.myTracks = [{
//     src: 'http://ec2-18-218-127-133.us-east-2.compute.amazonaws.com/efs-mount-point/sampledir/test.mp3',
//     artist: 'Astrix',
//     title: 'Here and there',
//     art: 'assets/img/astrix1.jpg',
//     preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
//   },
//   {
//     src: 'http://ec2-18-218-127-133.us-east-2.compute.amazonaws.com/efs-mount-point/sampledir/test.mp3',
//     artist: 'Shpongle',
//     title: 'Around the world in a tea/ Ott mix',
//     art: 'assets/img/shpongle1.jpg',
//     preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
//   }
// ];
