import {Component} from '@angular/core';
import {AdderService} from "../shared/services/adder-service";

enum Error {
  UnknownError = "Une erreur est survenue dans la récupération de la valeur"
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   * Valeur actuelle enregistrée
   * @private
   */
  private _value: string;

  /**
   * Constructeur principal
   * @param _adderService Service Adder
   */
  constructor(private _adderService:AdderService) {
    this._value = "";
    this.getCurrent();
  }

  /**
   * Obtenir la valeur actuelle enregistrée
   */
  private getCurrent() {
    this._adderService.getCurrent().subscribe((v) => {
      this._value = v.toString();
    }, () => {
      this._value = Error.UnknownError;
    })
  }

  get value(): string {
    return this._value;
  }
}
