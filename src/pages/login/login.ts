import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { AlertController, App, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
    public backgroundImage = 'assets/img/background/background-5.jpg';

    constructor(
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public app: App
    ) { }

    login() {
      const loading = this.loadingCtrl.create({
        duration: 500
      });

      loading.onDidDismiss(() => {
        const alert = this.alertCtrl.create({
          title: 'Logged in!',
          subTitle: 'Thanks for logging in.',
          buttons: ['Dismiss']
        });
        alert.present();
      });

      loading.present();

    }

}
