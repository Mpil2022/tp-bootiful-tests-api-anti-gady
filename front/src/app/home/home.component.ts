import {Component} from '@angular/core';
import {AdderService} from "../shared/services/adder-service";

enum Error {
  UnknownError = "Une erreur est survenue lors de la connexion à l'API"
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
  private _value: number;

  /**
   * Message d'erreur si échec de la récupération
   */
  private _error: string;


  /**
   * Constructeur principal pour l'accueil
   * @param _adderService Service Adder
   */
  constructor(private _adderService: AdderService) {
    this._value = 0;
    this._error = "";
    this.getCurrent();
  }

  /**
   * Obtenir la valeur actuelle enregistrée
   */
  private getCurrent() {
    this._adderService.getCurrent().subscribe({
      next: (v) => this._value = v,
      error: () => this._error = Error.UnknownError
    });
  }

  /**
   * Obtenir la valeur actuelle
   */
  get value(): number {
    return this._value;
  }

  /**
   * Obtenir l'erreur actuelle
   */
  get error(): string {
    return this._error;
  }
}
