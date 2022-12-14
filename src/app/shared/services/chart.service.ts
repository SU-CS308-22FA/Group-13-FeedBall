import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";

@Injectable()
export class ChartService {

    constructor(private db: AngularFirestore){ }

    filterGender(gend: string){



    }

    filterTeam(gend: string){

    }


}
