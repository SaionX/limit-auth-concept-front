import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint = 'http://localhost:8083/api'
  httpOptions = {
    headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': 'true',
  //     'Access-Control-Allow-Headers': '*'
      'Accept':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getHello() : Observable<any> {

    return this.http.get(this.endpoint).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
