import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen  } from '@ionic-native/splash-screen';
import { StatusBar  } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RunTracksPage } from '../pages/run-tracks/run-tracks';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { ArtistsPage } from "../pages/artists/artists";
import { RestProvider } from '../providers/rest/rest';
import { TracksServiceProvider } from '../providers/tracks-service/tracks-service';

let pages = [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    ArtistsPage,
    HomePage,
    RunTracksPage,
    TabsPage
];

/**
 * Sample custom factory function to use with ionic-audio
 */
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

export function providers() {
  return [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    RestProvider,
    TracksServiceProvider,
    StatusBar
  ];
}
export function entryComponents() {
  return pages;
}
export function declarations() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    // or use a custom provided function shown above myCustomAudioProviderFactory
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers(),
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
