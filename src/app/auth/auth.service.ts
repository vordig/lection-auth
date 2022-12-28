import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModel} from "./models/login.model";
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ILoginResponse} from "../interfaces/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string | null = null;

  //private _isAuthorized: boolean = false;

  public get isAuthorized(): boolean {
    return !!this._accessToken;
    //return this._isAuthorized;
  }

  // private set isAuthorized(value: boolean) {
  //   this._isAuthorized = value;
  //   this.router.navigate([this.isAuthorized ? '/secure-page' : '/auth/login']);
  // }

  public get accessToken(): string | null {
    return this._accessToken;
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
  }

  public login(model: LoginModel): Observable<ILoginResponse> {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    return this.httpClient.post<ILoginResponse>(environment.apiUrl + 'auth/login', JSON.stringify(model), {
      headers: headers
    })
      .pipe(
        tap( result => {
          this._accessToken = result.accessToken;
        }, _ => {
          this._accessToken = null;
        })
      );

    // let result: boolean = false;
    // if(model.email == 'test@email' && model.password == 'password1') {
    //   result = true;
    // }
    // this.isAuthorized = result;
    // return of(result);
  }

  public logout(): void {
    this._accessToken = null;
    // this.isAuthorized = false;
  }
}
