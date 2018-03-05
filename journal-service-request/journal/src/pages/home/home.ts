import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public journal: any

  constructor(public navCtrl: NavController, private http: HTTP) {

  }

  getData(email) {
    this.journal = "Loading data....";
    this.http.get('https://931gfw2iw6.execute-api.eu-west-1.amazonaws.com/alpha?email=test@test.com', {}, {})
      .then(resp => {
        this.journal = resp.data;
      })
      .catch(err => {
        this.journal = 'Opps!! ' + JSON.stringify(err, null, '\t');
      })
  }

}
