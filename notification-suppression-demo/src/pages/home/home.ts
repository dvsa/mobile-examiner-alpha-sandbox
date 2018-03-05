import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  _isPortraitOrientation = false;
  get isPortraitOrientation(): boolean {
    return this._isPortraitOrientation;
  }
  set isPortraitOrientation(flag: boolean) {
    if (flag) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    } else {
      this.screenOrientation.unlock();
    }
  }

  enablingInsomniaDidSucceded = false;
  _isInsomniaEnabled = false;
  get isInsomniaEnabled(): boolean {
    return this._isInsomniaEnabled;
  }
  set isInsomniaEnabled(flag: boolean) {
    if (flag) {
      this.insomnia.keepAwake().then(
        () => { this.enablingInsomniaDidSucceded = true },
        () => { this.enablingInsomniaDidSucceded = false }
      );
    } else {
      this.insomnia.allowSleepAgain().then(
        () => { this.enablingInsomniaDidSucceded = true },
        () => { this.enablingInsomniaDidSucceded = false }
      );
    }
  }

  result = false;
  isASAMEnabled = false;

  private _isASAMOn: boolean = false;
  get isASAMOn(): boolean {
    return this._isASAMOn;
  }
  set isASAMOn(flag: boolean) {
    this._isASAMOn = flag;
    (<any>window).ASAM.toggle(flag, (didSucceed: boolean) => {
      this.result = didSucceed;
    });
  }

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public mobileAccessibility: MobileAccessibility,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia,
    private openNativeSettings: OpenNativeSettings) {
    platform.ready().then(() => {
      (<any>window).ASAM.toggle(false, (didSucceed: boolean) => {
        console.log('from Ionic didSucceded: ' + didSucceed)
      });

      setInterval(() => {
        this.mobileAccessibility.isGuidedAccessEnabled().then((isEnabled: boolean) => {
          this.isASAMEnabled = isEnabled;
        });
      }, 1000);
    });
  }

  public openDoNotDisturb() {
    this.openNativeSettings.open('do_not_disturb');
  }

}
