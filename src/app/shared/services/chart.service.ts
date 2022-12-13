import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";

@Injectable()
export class ChartService {

    constructor(private db: AngularFireDatabase){ }

    getData(dataset: string){

        return this.db.list(dataset);
    }
}
