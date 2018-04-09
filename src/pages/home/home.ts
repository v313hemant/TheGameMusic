import { Component, ChangeDetectorRef } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ITrackConstraint } from 'ionic-audio';
import { RestProvider } from '../../providers/rest/rest';
import { TracksServiceProvider } from '../../providers/tracks-service/tracks-service';
import { RunTracksPage } from '../run-tracks/run-tracks';

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
  newIndex: number;


  constructor(private _cdRef: ChangeDetectorRef, public navCtrl: NavController, private navParams: NavParams, public rest: RestProvider, public tracksService: TracksServiceProvider) {
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

  playService(track: ITrackConstraint, index: number){
    this.tracksService.setMyTracks(this.myTracks);
    this.tracksService.setCurrentTrack(track, index);
    this.navCtrl.push(RunTracksPage);
  }


}
