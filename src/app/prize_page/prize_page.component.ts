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
import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser';
import { User } from '../shared/services/user';
import { prizes } from '../models/prizes.model';

interface LeaderboardElems {
  userName: string,
  userSurname: string,
  userUid: string,
  userPoint: number,
  userRank: number,
}

@Component({
  selector: 'app-prize',
  templateUrl: './prize_page.component.html',
  styleUrls: ['./prize_page.component.css']
})
export class PrizePageComponent{

  userRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;

  public uid1 = "";
  public email1 = "";
  public name1 = "";
  public message1 = "Congratulations! You are the first in the leaderboard!";

  public uid2 = "";
  public email2 = "";
  public name2 = "";
  public message2 = "Congratulations! You are the second in the leaderboard!";

  public uid3 = "";
  public email3 = "";
  public name3 = "";
  public message3 = "Congratulations! You are the third in the leaderboard!";


  constructor(private router: Router,
    private authService: AuthService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,){
      this.userRef = this.afs.collection('users');
      this.user$ = this.userRef.valueChanges();
    }



    notifyUser(){
      var now = new Date;
      const notify: prizes ={
        uid: this.uid1,
        award: 'Congratulations! You were ranked first in the leaderboard.',
        date: now,
      }
      this.afs.collection('prizes').add(notify);
      alert("sent succesfully")
    }

    notifyUser1(){
      var now = new Date;
      const notify: prizes ={
        uid: this.uid2,
        award: 'Congratulations! You were ranked second in the leaderboard.',
        date: now,
      }
      this.afs.collection('prizes').add(notify);
      alert("sent succesfully")
    }

    notifyUser2(){
      var now = new Date;
      const notify: prizes ={
        uid: this.uid3,
        award: 'Congratulations! You were ranked third in the leaderboard.',
        date: now,
      }
      this.afs.collection('prizes').add(notify);
      alert("sent succesfully")
    }


    assignStuff(userList: User[]){
      var sortedList: User[] = [];
      sortedList = userList.sort((obj1, obj2) => {
        if(obj1.point > obj2.point){return -1;}
        if(obj1.point < obj2.point){return 1;}
        return 0;
      });

      var newlist: User[] = [];
      newlist.push(sortedList[0]);
      newlist.push(sortedList[1]);
      newlist.push(sortedList[2]);

      this.email1 = sortedList[0].email;
      this.email2 = sortedList[1].email;
      this.email3 = sortedList[2].email;

      this.uid1 = sortedList[0].uid;
      this.uid2 = sortedList[1].uid;
      this.uid3 = sortedList[2].uid;

      this.name1 = sortedList[0].name;
      this.name2 = sortedList[1].name;
      this.name3 = sortedList[2].name;
      return newlist;
    }

    notif(){
    }


    deneme(){
      const btn = document.getElementById('button') as HTMLInputElement;

      const a = document.getElementById('form') as HTMLFormElement;

      if(a != null){
        emailjs.init('GRZ_EfGOaPD-uRfst');
        a.addEventListener('submit', function(event) {
          event.preventDefault();

          btn.value = 'Sending...';

          const serviceID = 'default_service';
          const templateID = 'template_jo3ypu4';
          const public_key = 'GRZ_EfGOaPD-uRfst';

          emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
              btn.value = 'Send Email';
              alert('Sent!');
            }, (err) => {
              btn.value = 'Send Email';
              alert(JSON.stringify(err));
            });
        });
      }

    }

    deneme1(){
      const btn = document.getElementById('button1') as HTMLInputElement;

      const a = document.getElementById('form1') as HTMLFormElement;

      if(a != null){
        emailjs.init('GRZ_EfGOaPD-uRfst');
        a.addEventListener('submit', function(event) {
          event.preventDefault();

          btn.value = 'Sending...';

          const serviceID = 'default_service';
          const templateID = 'template_jo3ypu4';
          const public_key = 'GRZ_EfGOaPD-uRfst';

          emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
              btn.value = 'Send Email';
              alert('Sent!');
            }, (err) => {
              btn.value = 'Send Email';
              alert(JSON.stringify(err));
            });
        });
      }

    }


    deneme2(){
      const btn = document.getElementById('button2') as HTMLInputElement;

      const a = document.getElementById('form2') as HTMLFormElement;

      if(a != null){
        emailjs.init('GRZ_EfGOaPD-uRfst');
        a.addEventListener('submit', function(event) {
          event.preventDefault();

          btn.value = 'Sending...';

          const serviceID = 'default_service';
          const templateID = 'template_jo3ypu4';
          const public_key = 'GRZ_EfGOaPD-uRfst';

          emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
              btn.value = 'Send Email';
              alert('Sent!');
            }, (err) => {
              btn.value = 'Send Email';
              alert(JSON.stringify(err));
            });
        });
      }

    }
}
