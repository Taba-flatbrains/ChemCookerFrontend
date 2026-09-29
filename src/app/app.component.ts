import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Data, Router, RouterOutlet } from '@angular/router';
import { ChemicalComponent } from './chemical/chemical.component';
import { Chemical } from './chem-bar/chem-bar.component';
import { LoggedInService } from './login/logged-in.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChemicalsService } from './chemical/chemicals.service';
import { QuestService } from './quest/quest.service';
import { QuestBarComponent } from './quest-bar/quest-bar.component';
import { SkilltreeComponent } from './skilltree/skilltree.component';
import { PendingReactionsComponent } from './pending-reactions/pending-reactions.component';
import { SkilltreeService } from './skilltree/skilltree-service';
import { DailyChallengeSelectorComponent } from './daily-challenge-selector/daily-challenge-selector.component';
import { CookieService } from 'ngx-cookie-service';
import { InitAccountDialogComponent } from './init-account-dialog/init-account-dialog.component';
import { ChangeDifficultyComponent } from './change-difficulty/change-difficulty.component';
import { InfoComponent } from './info/info.component';
import { DailyChallenge, DailyChallengeService } from './daily-challenge/daily-challenge.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  returnToMain() {
    this.dailyChallengeService.inDailyChallenge = false
    this.router.navigate([""])
  }


  openDailyChallengeSelectorDialog() {
    const dialogRef = this.dialog.open(DailyChallengeSelectorComponent, {
      
    });
  }


  constructor(public loggedInService:LoggedInService, private dialog:MatDialog, public chemService:ChemicalsService,
    public questService:QuestService, private skilltreeService:SkilltreeService, private cookieService:CookieService,
    private router:Router, public dailyChallengeService:DailyChallengeService, private route:ActivatedRoute
  ) { }

  title = 'ChemCookerFrontend';

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      
    });
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent, {

    });
  }


  openSkilltreeDialog() {
    const dialogRef = this.dialog.open(SkilltreeComponent, {

    });
  }
  openQuestDialog() {
    const dialogRef = this.dialog.open(QuestBarComponent, {

    });
  }

  openPendingReactionsDialog() {
    const dialogRef = this.dialog.open(PendingReactionsComponent, {

    });
  }

  logout() {
    this.loggedInService.logout();
  }

  ngOnInit(): void {
    this.questService.updateQuests();
    this.dailyChallengeService.refreshDailyChallenges();
    this.loggedInService.LoggedInStatusChangeEvent.subscribe(() => {
        if (!this.loggedInService.LoggedIn) {
            this.openInitAccountDialog();
        }
        this.questService.updateQuests();
        this.skilltreeService.init();
        this.chemService.refreshPendingReactions();
        this.dailyChallengeService.refreshDailyChallenges();
        setInterval(() => {
          this.chemService.refreshPendingReactions(false);
        }, 5000);
    })
    if (!this.cookieService.check('token')) {
      this.openInitAccountDialog();
    } else {  
      this.loggedInService.UpdateLoggedInStatus()
    }
  }

  openInitAccountDialog() {
    this.dialog.open(InitAccountDialogComponent, {
      disableClose: true
    });
  }

  openChangeDifficultyDialog() { 
    this.dialog.open(ChangeDifficultyComponent, {
     
    });
  }

  openInfoDialog() {
    this.dialog.open(InfoComponent, {
      
    });
  }
}
