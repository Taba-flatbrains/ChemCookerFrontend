import { Component, OnInit } from '@angular/core';
import SmilesDrawer from '@ibm-materials/ts-smiles-drawer';

@Component({
  selector: 'chemical',
  standalone: true,
  imports: [],
  templateUrl: './chemical.component.html',
  styleUrl: './chemical.component.css'
})
export class ChemicalComponent implements OnInit {
  ngOnInit() {
    let smilesDrawer = new SmilesDrawer.SvgDrawer({});
    SmilesDrawer.parse('C1CCCCC1', function (tree:any) {
    smilesDrawer.draw(tree, 'chemical', 'light', false)
    }, function (err:any) {
    alert(err);})
    //this.smilesDrawer.draw("CCC", "chemical");
  }
}