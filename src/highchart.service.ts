import {
    Injectable
  } from '@angular/core';
  import { User } from './app/shared/services/user';
  import {
    Observable
  } from 'rxjs';
  import {
    AngularFirestore,
    AngularFirestoreCollection
  } from '@angular/fire/compat/firestore'
  import {
    map
  } from "rxjs/operators";
  @Injectable({
    providedIn: 'root'
  })
  export class HighchartService {
    private rateCollection: AngularFirestoreCollection < User > ;
    rates$: Observable < User[] > ;
    rates2$: Observable < User[] > ;
    constructor(private readonly firestoreservice: AngularFirestore) {
      this.rateCollection = firestoreservice.collection < User > ('users');
      // .snapshotChanges() returns a DocumentChangeAction[], which contains
      // a lot of information about "what happened" with each change. If you want to
      // get the data and the id use the map operator.
      this.rates$ = this.rateCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {
            id,
            ...data
          };
        }))
      );
      this.rates2$ = this.rateCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {
            id,
            ...data
          };
        }))
      );
    }
  }
  export interface chartModal {
    gender: string,
    point: number
  }
