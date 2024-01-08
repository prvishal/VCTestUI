import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieOptions, CookieService } from 'ngx-cookie';
import { throwError,Observable, of } from 'rxjs';
import { retry,catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({ providedIn: 'root' })
export class BankService  {
  private _bankDetailUrl = `${environment.apiUrl}/user/{id}/bankaccount`;
  private _bankAccountInfoUrl = `${environment.apiUrl}/user/bankaccount/{BankAccountId}/info`;
  private _bankAccountBalanceUrl = `${environment.apiUrl}/user/bankaccount/{BankAccountId}/balance`;
  private _bankAccountTransactionUrl = `${environment.apiUrl}/user/bankaccount/{BankAccountId}/transaction`;
  private _secure = true;

  //cookieOptions: CookieOptions;

  constructor(private http: HttpClient,
    //private _cookieService: CookieService,
    private router: Router) {
    

    const today = new Date();
  }
   httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public getBankAccountInfo(bankAccountId: string): Observable<any> {
    
    console.log('start=')
    return this.http.get<any>(this._bankAccountInfoUrl.replace('{BankAccountId}',bankAccountId), this.httpOptions)
      .pipe(
        
        catchError((error) => {
        console.log(error.error);
        return of(error.error);
      })
    );
    
  }
  public getBankAccountBalance(bankAccountId: string): Observable<any> {
    
    console.log('start=')
    return this.http.get<any>(this._bankAccountBalanceUrl.replace('{BankAccountId}',bankAccountId), this.httpOptions)
      .pipe(
        
        catchError((error) => {
        console.log(error.error);
        return of(error.error);
      })
    );
    
  }
  public getBankAccountTransactions(bankAccountId: string): Observable<any> {
    
    console.log('start=')
    return this.http.get<any>(this._bankAccountTransactionUrl.replace('{BankAccountId}',bankAccountId), this.httpOptions)
      .pipe(
        
        catchError((error) => {
        console.log(error.error);
        return of(error.error);
      })
    );
    
  }
  public getBankAccounts(userId: string): Observable<any> {
    
    console.log('start=')
    return this.http.get<any>(this._bankDetailUrl.replace('{id}',userId), this.httpOptions)
      .pipe(
        
        catchError((error) => {
        console.log(error.error);
        return of(error.error);
      })
    );
    
  }
  
  /* public setSessionInfo(user) {
    sessionStorage.setItem('email', user.user.email);
    sessionStorage.setItem('firstName', user.user.firstName);
    sessionStorage.setItem('lastName', user.user.lastName);
    sessionStorage.setItem('status', user.user.status);
    sessionStorage.setItem('uId', user.user.uId);
    sessionStorage.setItem('isFirstSignIn', user.user.isFirstSignIn);
    sessionStorage.setItem('isEmailVerified', user.user.isEmailVerified);
    sessionStorage.setItem('role', user.user.isServiceProvider === true ? 'provider'
      : user.user.isConsumer === true ? 'consumer' : user.user.isAdmin === true ? 'admin' : user.user.isCSR === true ? 'CSR' : user.user.isSubConractor === true ? 'Sub Contractor' : '')
    sessionStorage.setItem('isAccountEnabled', user.user.isAccountEnabled);
    sessionStorage.setItem('isConsumer', user.user.isAccountEnabled);
    sessionStorage.setItem('isConsumerProjectAddressMissing', user.user.isConsumerProjectAddressMissing)
    sessionStorage.setItem('duration', user.user.duration);
    sessionStorage.setItem('memberType', user.user.memberType);
    sessionStorage.setItem('isFreeTrial', user.user.days);
    if (user.user.memberType == 'Premium' || user.user.memberType == 'PremiumPro' || user.user.memberType == 'PremiumProMax') {
      sessionStorage.setItem('isPremium', 'true');
    }
    else {
      sessionStorage.setItem('isPremium', user.user.isServiceProviderPremium);
    }


  } */


}
