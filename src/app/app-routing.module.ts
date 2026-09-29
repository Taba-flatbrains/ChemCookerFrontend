import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { dailyResolver } from './daily-challenge/daily-challenge.service';

export const routes: Routes = [
  {
    path: 'daily-challenge/:id',
    component: AppComponent,
    resolve: {
      dc : dailyResolver
    }
  }, 
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
