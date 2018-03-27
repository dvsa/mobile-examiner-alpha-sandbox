import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

import { Network } from "@ionic-native/network";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class ConnectivityProvider {
  public NetworkStatus: BehaviorSubject<boolean>;
  private WatchConnect: Subscription;
  private WatchDisconnect: Subscription;

  constructor(public platform: Platform, public network: Network) {
    this.NetworkStatus = new BehaviorSubject(false); // Assume Network is offline
    this.CheckNetworkStatus();
    this.CreateNetworkObserverSubscriptions();
  }

  CheckNetworkStatus() {
    this.UpdateNetworkStatus(navigator.onLine);
  }

  CreateNetworkObserverSubscriptions() {
    this.WatchConnect = this.network.onConnect().subscribe(
      data => {
        this.UpdateNetworkStatus(true);
      },
      error => {
        console.log(error);
      }
    );
    this.WatchDisconnect = this.network.onDisconnect().subscribe(
      data => {
        this.UpdateNetworkStatus(false);
      },
      error => {
        console.log(error);
      }
    );
  }

  UpdateNetworkStatus(IsOnline: boolean) {
    this.NetworkStatus.next(IsOnline);
  }

  getNetworkStatus() {
    return this.NetworkStatus;
  }
}
