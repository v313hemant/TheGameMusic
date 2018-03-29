import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITrackConstraint } from 'ionic-audio';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  myTracks: ITrackConstraint[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  getyoutubeSearchTracks(inputQuery: string){
    this.rest.getSearchYoutubeTracks(inputQuery)
           .subscribe(
             myTracks => this.myTracks = myTracks,
             error =>  this.errorMessage = <any>error);
  }

}
