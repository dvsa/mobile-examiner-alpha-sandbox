import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authority: string = "https://login.windows.net/common/oauth2/authorize";
  redirectUri: string = "http://mestest";
  resourceUri: string = "https://graph.windows.net";

  clientId: string = "5cc3585a-bddc-45db-a58d-ada2ea6c4875";
  graphApiVersion = "2013-11-08";

  loggedInName: string = "";
  otherData: string = "";
  extraStuff: string = "";
  group: string = "";
  error: string = "";

  readonly MesExaminersGroupId = "6305a5ef-8462-46f6-9b03-0ecd1bcc8f64";
  readonly MesLdtmGroupId = "db0ae1a1-83ce-44d5-abc2-e3642bddde7e";

  constructor(
    private http: HttpClient,
    private zone: NgZone) {
    this.group = "";      
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
                this.error = err;
              });
          });
      });
  }

  loginSuccess(authResponse) {
    console.log(authResponse);

    const name = authResponse.userInfo.displayableId;
    this.loggedInName = name;
    this.otherData = authResponse.userInfo;
    this.error = "";

    this.getGroupData(authResponse).subscribe(
      (results) => {
        this.parseGroupName(results);
      },
      (err) => {
        console.log(err);
        this.error = err;
        this.group = "No Group";
      });
  }


  logout() {
    console.log("Logging out....");
    
    //     Step1: clear cache
    let authContext = new Microsoft.ADAL.AuthenticationContext(this.authority);
    authContext.tokenCache.clear();

    this.loggedInName = '';
    this.otherData = '';
    this.group = "";    
    this.error = "";      
    
    // Step2: For a complete logout (all things): make XmlHttpRequest (or open InAppBrowser instance) pointing to the sign out url.
    // https://login.microsoftonline.com/common/oauth2/logout 
  }

  getGroupData(authResult) {
    var url = "https://graph.windows.net/me/checkMemberGroups?api-version=1.6";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authResult.accessToken
      })
    };
  
    var body = {
      "groupIds": [
        this.MesExaminersGroupId,
        this.MesLdtmGroupId
      ]
    };

    return this.http.post(
      url,
      body,
      httpOptions
    );
  }

  parseGroupName(results) {
    console.log(results);
    if (results.value.includes(this.MesExaminersGroupId)) {
      this.group = "Examiners Group";      
    } else if (results.value.includes(this.MesLdtmGroupId)) {
      this.group = "LDTM Group";      
    } else {
      this.group = "Unknown Group";
    }
  }
}
