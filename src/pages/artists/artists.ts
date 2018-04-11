import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Artist } from '../../model/Artist';
import { Playlist } from '../../model/Playlist';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html',
})

export class ArtistsPage {
  myArtists: Artist[];
  myPlaylists: Playlist[];
  constructor(public navCtrl: NavController) {

    this.myPlaylists = [ {
      name: 'My Mix',
      desc: 'Rock/Trance',
      image: 'assets/img/myMix3.jpg'
    },
    {
      name: 'My Electronic Mix',
      desc: 'Electronic/EDM',
      image: 'assets/img/edm1.jpg'
    },
    {
      name: 'Brain Frequency Mix',
      desc: 'High BPM/Electronic/Trance',
      image: 'assets/img/myBrainFreq1.jpg'
    }
  ];
    this.myArtists = [ {
      name: 'Astrix',
      desc: 'Trance',
      image: 'assets/img/astrix1.jpg'
    },
    {
      name: 'Shpongle',
      desc: 'Trance',
      image: 'assets/img/shpongle1.jpg'
    },
    {
      name: 'The Prodigy',
      desc: 'Trance',
      image: 'assets/img/theProdigy1.jpg'
    },
    {
      name: 'Talamasca',
      desc: 'Trance',
      image: 'assets/img/talamasca1.jpg'
    },
    {
      name: 'Ovnimoon',
      desc: 'Trance',
      image: 'assets/img/ovnimoon1.jpg'
    }
    ]

  }

  goToSelectedPlaylist(playlist: Playlist){
    this.navCtrl.push(HomePage,{
      entityName: playlist.name,
      entityType: 'playlist'
    });
  }

  goToSelectedArtist(artist: Artist){
    console.log(artist);
    this.navCtrl.push(HomePage,{
      entityName: artist.name,
      entityType: 'artist'
    });
  }

}
