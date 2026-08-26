import { ChangeDetectorRef, Injectable } from "@angular/core";
import { SkilltreeNode } from "../skilltree-node/skilltree-node.component";
import { BackendService, GetRequestTypeUrls, GetSkilltreeResponse } from "../util/backend.service";

@Injectable({
    providedIn: 'root'
})
export class SkilltreeService {
    skillpoints: number = 0;

    skilltreeHeight = [-3, 10];
    skilltreeWidth = [-10, 10];

    lightSkilltreeNodeID : number = 18
    canUseUV = false;
    updateCanUseUV() : boolean {
        this.canUseUV = this.unlockedSkilltreeNodes.includes(this.lightSkilltreeNodeID);
        return this.canUseUV;
    }

    init() {
        this.backendService.Get<GetSkilltreeResponse>(GetRequestTypeUrls.GetSkilltree).subscribe(r => {
        this.allSkilltreeNodes = r.skilltree_nodes;
        this.unlockedSkilltreeNodes = r.unlocked_skilltree_nodes;
        this.skillpoints = r.availableSkillpoints;
        for (let j of range(this.skilltreeWidth[0]-1, this.skilltreeWidth[1]+1)) { this.nodesDict[j] = {} }
        for (let i of range(this.skilltreeHeight[0]-1, this.skilltreeHeight[1]+1)) {
            for (let j of range(this.skilltreeWidth[0]-1, this.skilltreeWidth[1]+1)) {
            this.nodesDict[i][j] = undefined;
            for (let node of this.allSkilltreeNodes) {
                if (node.x == i && node.y == j) {
                this.idToNodeDict[node.id] = node;
                this.nodesDict[i][j] = node.id;
                }
            }
            }
        }
        this.refreshThickLines()
        });
        setTimeout(()=> {
    
        this.updateCanUseUV();
        }, 0);
    }

    refreshThickLines() {
        for (let j of range(this.skilltreeWidth[0]-1, this.skilltreeWidth[1]+1)) { this.thickLinesV[j] = {}; this.thickLinesH[j] = {}; }
        for (let i of range(this.skilltreeHeight[0]-1, this.skilltreeHeight[1]+1)) {
            this.thickLinesV[i] = {}
            this.thickLinesH[i] = {}
            for (let j of range(this.skilltreeWidth[0]-1, this.skilltreeWidth[1]+1)) {
                this.thickLinesV[i][j] = false;
                this.thickLinesH[i][j] = false;
                if (this.nodesDict[i][j] != undefined && this.nodesDict[i][j+1] != undefined) {
                    let node1 = this.idToNodeDict[this.nodesDict[i][j]!];
                    let node2 = this.idToNodeDict[this.nodesDict[i][j+1]!];
                    if (this.unlockedSkilltreeNodes.includes(node1.id) && this.unlockedSkilltreeNodes.includes(node2.id)) {
                        this.thickLinesV[i][j] = true;
                    }
                }
                if (this.nodesDict[i][j] != undefined && this.nodesDict[i+1][j] != undefined) {
                    let node1 = this.idToNodeDict[this.nodesDict[i][j]!];
                    let node2 = this.idToNodeDict[this.nodesDict[i+1][j]!];
                    if (this.unlockedSkilltreeNodes.includes(node1.id) && this.unlockedSkilltreeNodes.includes(node2.id)) {
                        this.thickLinesH[i][j] = true;
                    }
                }
            }
        }
    }

    allSkilltreeNodes : SkilltreeNode[] = []
  unlockedSkilltreeNodes : number[] = []
  nodesDict : {[x:number]: { [y:number]: number | undefined }} = {}
  idToNodeDict : {[id:number]: SkilltreeNode} = {}
  thickLinesV : {[x:number]: { [y:number]: boolean }} = {}
  thickLinesH : {[x:number]: { [y:number]: boolean }} = {}


  range = range

    constructor(private backendService:BackendService) {}
}

function range(start:number, stop:number | undefined = undefined, step:number | undefined = undefined) : number[] {
    if (!stop) {
        // one param defined
        stop = start;
        start = 0;
    }

    if (!step) {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};