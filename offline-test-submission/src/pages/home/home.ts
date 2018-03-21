import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Network } from "@ionic-native/network";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private network: Network
  ) {}

  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    this.toast
      .create({
        message: `You are now ${connectionState}`,
        duration: 3000,
        position: "top"
      })
      .present();
  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(
      data => {
        console.log(data);
        this.displayNetworkUpdate(data.type);
      },
      error => console.error(error)
    );

    this.network.onDisconnect().subscribe(
      data => {
        console.log(data);
        this.displayNetworkUpdate(data.type);
      },
      error => console.error(error)
    );
  }
}
