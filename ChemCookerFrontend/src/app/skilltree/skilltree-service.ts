import { Injectable } from "@angular/core";
import { SkilltreeNode } from "../skilltree-node/skilltree-node.component";
import { BackendService, GetRequestTypeUrls, GetSkilltreeResponse } from "../util/backend.service";

@Injectable({
    providedIn: 'root'
})
export class SkilltreeService {
    skillpoints: number = 0;

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
        for (let i of range(-10, 20)) {
            this.nodesDict[i] = {}
            for (let j of range(-20, 20)) {
            this.nodesDict[i][j] = undefined;
            for (let node of this.allSkilltreeNodes) {
                if (node.x == i && node.y == j) {
                this.idToNodeDict[node.id] = node;
                this.nodesDict[i][j] = node.id;
                }
            }
            }
        }
        });
    }

    allSkilltreeNodes : SkilltreeNode[] = []
  unlockedSkilltreeNodes : number[] = []
  nodesDict : {[x:number]: { [y:number]: number | undefined }} = {}
  idToNodeDict : {[id:number]: SkilltreeNode} = {}


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