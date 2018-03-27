import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Network } from "@ionic-native/network";
import { ConnectivityProvider } from "../../providers/connectivity/connectivity";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private network: Network,
    private connect: ConnectivityProvider
  ) {
    this.connect.getNetworkStatus().subscribe((onlineOrNot: boolean) => {
      this.toast
        .create({
          message: onlineOrNot ? "Online" : "Off",
          duration: 5000
        })
        .present();
    });
  }
}
