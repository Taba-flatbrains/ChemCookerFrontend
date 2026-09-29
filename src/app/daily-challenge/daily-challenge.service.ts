import { inject, Injectable } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface DailyChallenge {
  id : number
  startChems : string[]
  goalChem : string
  hint : string
  reward : string | null // placeholder, will probably not use
}

export const dailyResolver: ResolveFn<DailyChallenge> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const dCId = route.paramMap.get('id')!;
  const dailyChallengeService = inject(DailyChallengeService)
  const r = dailyChallengeService.dailyChallenges.find((v:DailyChallenge) => v.id.toString() == dCId); 
  if (r) {
    dailyChallengeService.currentDailyChallengeID = +dCId;
    dailyChallengeService.loadDailyChallange();
    return r; // this value is unused and unusable because im bad at programming, the only rason for this resolver is to fetch the id
  }
  else
    throw Error("No daily found with this id"); 
};

@Injectable({
    providedIn: 'root'
})
export class DailyChallengeService {
  inDailyChallenge : boolean = false;
  dailyChallenges : DailyChallenge[] = [{id: 1, startChems:[""], goalChem:"", hint:"", reward:null}];
  currentDailyChallengeID !: number;
  
  refreshDailyChallenges() {
    // todo: fetch all daily challenges
  }

  loadDailyChallange() {
    this.inDailyChallenge = true;
    // todo: change available chems and stuff
  }
}