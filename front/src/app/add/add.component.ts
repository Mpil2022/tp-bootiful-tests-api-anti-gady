import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdderService} from "../shared/services/adder-service";
import {Router} from "@angular/router";

enum Error {
  BadRequest = "Les données envoyées sont invalides. Veuillez vérifier votre requête.",
  UnknownError = "Une erreur est survenue lors de la connexion à l'API"
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  /**
   * Message d'erreur si échec de l'ajout
   * @private
   */
  private _error: string;

  /**
   * Formulaire de données
   * @private
   */
  private readonly _form: FormGroup;

  /**
   * Composant d'ajout
   * @param _adderService Service Adder
   * @param _router Routeur d'URL
   */
  constructor(private _adderService: AdderService, private _router: Router) {
    this._error = "";
    this._form = new FormGroup({
      num: new FormControl(0, Validators.compose([
        Validators.required, Validators.pattern(/^[0-9]+$/)
      ]))
    })
  }


  /**
   * Valider l'ajout d'un nombre
   * @param num Nombre
   */
  accumulateCurrent(num: string) {
    this._adderService.accumulateCurrent(num).subscribe({
      next: () => this._router.navigateByUrl("bootiful"),
      error: (e) => {
        switch (e.status) {
          case 400:
            this._error = Error.BadRequest;
            break;
          case 0:
            this._error = Error.UnknownError;
            break;
        }
      }
    });
  }

  /**
   * Obtenir les données du formulaire
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Retourner l'erreur lors de l'appel à l'API
   */
  get error(): string {
    return this._error;
  }
}
