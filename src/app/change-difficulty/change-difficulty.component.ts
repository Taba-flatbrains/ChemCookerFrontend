import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DifficultyLevel } from '../util/constants';
import { BackendService, ChangeDifficultyRequest, ChangeDifficultyResponse, PostRequestTypeUrls } from '../util/backend.service';
import { LoggedInService } from '../login/logged-in.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-difficulty',
  templateUrl: './change-difficulty.component.html',
  styleUrl: './change-difficulty.component.css'
})
export class ChangeDifficultyComponent {
  DifficultyLevel = DifficultyLevel; // Expose the enum to the template

  constructor(private backendService:BackendService, public loggedInService:LoggedInService, private dialogRef: MatDialogRef<ChangeDifficultyComponent>) {}
  
  changeDifficulty(difficulty: number) {
        this.backendService.Post<ChangeDifficultyRequest, ChangeDifficultyResponse>(PostRequestTypeUrls.ChangeDifficulty, { difficulty: difficulty }).subscribe({
          next: (response) => {
        if (response.success) {
          this.loggedInService.LoggedInStatusChangeEvent.next(true);
          this.loggedInService.Difficulty = difficulty;
          this.dialogRef.close();
        }
      },
      error: (error) => {
        console.error('Error changing difficulty:', error);
        // Optionally, you can add logic here to handle errors, like showing a message to the user
      }
    });
  }
}
