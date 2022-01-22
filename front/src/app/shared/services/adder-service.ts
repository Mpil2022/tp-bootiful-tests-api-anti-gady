import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdderService {

  private _urls: any;

  constructor(private _http: HttpClient) {
    let urls = {
      backend: {} as any
    }, baseUrl: string;

    baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;

    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    Object.keys((environment.backend.endpoints.adder || {})).forEach(category => {
      urls.backend[category] = `${baseUrl}${environment.backend.endpoints.adder[category]}`
    });

    this._urls = urls
  }

  /**
   * Obtenir la valeur actuelle
   */
  getCurrent(): Observable<number> {
    return this._http.get<number>(this._urls.backend.current);
  }

  /**
   * Ajouter une valeur avec effet de stockage
   * @param val Valeur à ajouter
   */
  accumulateCurrent(val: string): Observable<number> {
    return this._http.post<number>(this._urls.backend.accumulate.replace(':param', val), {});
  }

}
