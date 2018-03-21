import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  testSubmitted: boolean;
  backgroundModeScriptRan: number = 0;

  constructor(public navCtrl: NavController, public backgroundMode: BackgroundMode) {
    // Background script
    // if (this.backgroundMode.isActive()) {
      setInterval(() => this.backgroundModeScriptRan++, 10000);
    // }

  }

}
