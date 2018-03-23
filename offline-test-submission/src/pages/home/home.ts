import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeStampsArr: string[] = [];
  error: string;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public backgroundFetch: BackgroundFetch,
    public http: Http) {
    platform.ready().then(() => {
      // RAW CORDOVA IMPLEMENTATION
      // let BackgroundFetch = (<any>window).BackgroundFetch;

      // // Your background-fetch handler.
      // let fetchCallback = () => {
      //   console.log('[js] BackgroundFetch event received');
      //   this.saveTestToDB();
      //   // Required: Signal completion of your task to native code
      //   // If you fail to do this, the OS can terminate your app
      //   // or assign battery-blame for consuming too much background-time
      //   BackgroundFetch.finish();
      // }
      // let failureCallback = function (error) {
      //   console.log('- BackgroundFetch failed', error);
      // };

      // BackgroundFetch.configure(fetchCallback, failureCallback, {
      //   minimumFetchInterval: 15, // <-- default is 15
      //   stopOnTerminate: false,   // <-- Android only
      //   startOnBoot: true,        // <-- Android only
      //   forceReload: true         // <-- Android only
      // });

      // IONIC NATIVE PLUGIN IMPLEMENTATION
      const config: BackgroundFetchConfig = {
        stopOnTerminate: false, // Set true to cease background-fetch from operating after user "closes" the app. Defaults to true.
      };

      backgroundFetch.configure(config)
        .then(() => {
          console.log('Background Fetch initialized');
          const date = new Date();
          console.log(this);
          this.timeStampsArr.push(date.toUTCString());
          this.saveTestToDB();
          backgroundFetch.finish();
        })
        .catch(e => {
          console.log('Error initializing background fetch', e);
          this.error = e;
        });

      // Start the background-fetch API. Your callbackFn provided to #configure will be executed each time a background-fetch event occurs. NOTE the #configure method automatically calls #start. You do not have to call this method after you #configure the plugin
      backgroundFetch.start();
    });
  }

  saveTestToDB() {
    let postData = JSON.stringify({
      candidateId: '123456789',
      faults: [
        {
          id: 'juncSpeed',
          faultsNo: 10,
          isSerious: false,
          isDangerous: false
        }
      ]
    });

    this.http.post('', postData)
      .subscribe(
        (resData) => {
          let header = resData.headers.get('location');
          console.log('success');
          console.log(resData);
          this.backgroundFetch.finish();
          return;
        },
        (err) => {
          this.backgroundFetch.finish();
          console.log(err);
        }
      )
  }
}
