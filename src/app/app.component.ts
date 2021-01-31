import {Component, OnInit} from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from "angular-oauth2-oidc";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'limit-auth-concept-front';
  headers : HttpHeaders;
  identificador: string;
  empresa: string;
  usuari: string;
  rols: string[];

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  ngOnInit(): void {
    this.oauthService.events.subscribe(event => {
      if (event.type == 'token_received' || event.type == 'token_refreshed') {
        this.userData();
      }
    })
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8081/auth/realms/limit',
    redirectUri: window.location.origin + "/",
    clientId: 'limit-auth-concept',
    dummyClientSecret: '15c1373e-5087-4b58-9f09-f11c15617b33',
    scope: 'authentication_code',
    responseType: 'code',
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    showDebugInformation: true
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public refresh() {
    this.oauthService.customQueryParams = {
      'limit-identificador': this.identificador,
      'limit-empresa': this.empresa
    };
    this.oauthService.refreshToken().then((resp) => {
      // this.userData();
    });
  }

  private userData() {
    let claims = this.oauthService.getIdentityClaims();
    console.log('Claims:', claims);
    console.log('Usuari:', claims['preferred_username']);
    console.log('Rols:', claims['realm_access']['roles']);

    if (claims) {
      this.usuari = claims['preferred_username'];
      this.rols = claims['realm_access']['roles'];
    }
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new  NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
