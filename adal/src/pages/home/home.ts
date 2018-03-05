import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authority: string = "https://login.windows.net/common/oauth2/authorize";
  redirectUri: string = "http://mestest";
  resourceUri: string = "https://graph.windows.net";
  clientId: string = "3754afb6-16de-4827-b0ff-6b32407b23a9";

  loggedInName: string = "";
  otherData: string = "";

  constructor(private zone: NgZone) {
  }

  login() {

    let authContext = new Microsoft.ADAL.AuthenticationContext(this.authority);

    authContext.tokenCache.readItems().then(
      (items) => {

        // Make sure we're using the correct authority if cached
        if (items.length > 0) {
          console.log("Adjusting auth");
          const authority = items[0].authority;
          authContext = new Microsoft.ADAL.AuthenticationContext(authority);
        }

        authContext.acquireTokenSilentAsync(
          this.resourceUri,
          this.clientId,
          ''
        ).then(
          (response) => { 
            this.zone.run(() => this.loginSuccess(response)); 
          }, 
          () => {       
            authContext.acquireTokenAsync(
              this.resourceUri,
              this.clientId,
              this.redirectUri
            ).then(
              (response) => { 
                this.zone.run(() => this.loginSuccess(response)); 
              }, 
              (err) => {
                console.log(err);
              });
          });
      });
  }

  loginSuccess(authResponse) {
    console.log(authResponse);

    const name = authResponse.userInfo.displayableId;
    this.loggedInName = name;
    this.otherData = authResponse.userInfo;
  }


  logout() {
    console.log("Logging out....");
    
    //     Step1: clear cache
    let authContext = new Microsoft.ADAL.AuthenticationContext(this.authority);
    authContext.tokenCache.clear();

    this.loggedInName = '';
    this.otherData = '';
    
    // Step2: For a complete logout (all things): make XmlHttpRequest (or open InAppBrowser instance) pointing to the sign out url.
    // https://login.microsoftonline.com/common/oauth2/logout 
  }
}
