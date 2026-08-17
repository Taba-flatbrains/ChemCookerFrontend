import { Injectable } from "@angular/core";

export enum Artstyle {
    Modern, // default
    Alchemy, // todo: add background maybe to a yellowish tint and make chemicals appear like scrolls
    Lab,
    Kitchen,
}

@Injectable({
  providedIn: 'root'
})
export class ArtstyleService {
    currentArtstyle: Artstyle = Artstyle.Modern;


    artstyleIDtoCookerImagePath: { [key: number]: string } = {
        [Artstyle.Modern]: 'assets/modern_cooker.png',
        [Artstyle.Alchemy]: 'assets/alchemy_cooker.png',
        [Artstyle.Lab]: 'assets/lab_cooker.png',
        [Artstyle.Kitchen]: 'assets/kitchen_cooker.png',
    }; // todo: maybe add open form of cooker when hovering chem over it

    constructor() {}

    nextArtstyle() {
        this.currentArtstyle = (this.currentArtstyle + 1) % (Object.keys(Artstyle).length / 2); // Divide by 2 because enum has both keys and values
    }
}

