import { Component } from '@angular/core';

// import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { RunTracksPage } from '../run-tracks/run-tracks';
// import { ContactPage } from '../contact/contact';
import { ArtistsPage } from '../artists/artists';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = LoginPage;
  tab2Root: any = ArtistsPage;
  tab3Root: any = RunTracksPage;

  constructor() {

  }
}
