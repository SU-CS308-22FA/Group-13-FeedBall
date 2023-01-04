import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";
import { matches } from '../models/matches.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prize',
  templateUrl: './prize_page.component.html',
  styleUrls: ['./prize_page.component.css']
})
export class PrizePageComponent{

  user$ = this.authService.user$;
  constructor(private router: Router,
    private authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,){}

}
