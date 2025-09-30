import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChemicalComponent } from './chemical/chemical.component';
import { Chemical } from './chem-bar/chem-bar.component';
import { LoggedInService } from './login/logged-in.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public loggedInService:LoggedInService) { }

  title = 'ChemCookerFrontend';
  ChemicalsInAction : Chemical[] = [];
}
