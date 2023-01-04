import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { teams } from '../models/teams.model';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamLogoSrcList: string[] = ["assets/Adanademirspor.png", "assets/Alanyaspor_logo.png", "assets/Antalyaspor_logo.png", "assets/367px-BesiktasJK-Logo.svg.png",
                              "assets/Fatihkaragumruk.png", "assets/Fenerbahçe_SK.png", "assets/Galatasaray_Star_Logo.png",
                              "assets/Gaziantep_FK.png", "assets/Giresunspor.png", "assets/Hatayspor.png", "assets/İstanbul_Başakşehir_FK.png", "assets/IstanbulsporAS.png",
                              "assets/Kasimpasa_2012.png", "assets/Kayserispor_logosu.png", "assets/Konyaspor_1922.png",
                            "assets/MKE_Ankaragücü_logo.png","assets/Sivasspor.png", "assets/TrabzonsporAmblemi.png", "assets/Ümraniyespor_Logosu.png"];

  public teamsList: Array<string> = ["Adana Demirspor", "Alanyaspor" , "Antalyaspor", "Beşiktaş", "Fatih Karagümrük", "Fenerbahçe", "Galatasaray",
                                     "Gaziantep", "Giresunspor", "Hatayspor", "İstanbul Başakşehir", "İstanbulspor", "Kasımpaşa", "Kayserispor",
                                     "Konyaspor", "MKE Ankaragücü", "Sivasspor", "Trabzonspor", "Ümraniyespor"];

  public yearList: number[] = [1954, 1948, 1966, 1903, 1966, 1907, 1905, 1923, 1925, 1966, 1990, 1926, 1922, 1966, 1922, 1950, 1967, 1967, 1964]
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public afs: AngularFirestore) {
      this.teamsRef = this.afs.collection('teamInfos');
      this.teams$ = this.teamsRef.valueChanges();
      this.teams$.forEach(data=>{
        data.forEach(val => {
          if(val.teamName == this.teamNameX){
            this.header = val.header;
            this.year = val.establish;
            this.description = val.description;
            this.link = this.returnPngLink(this.teamNameX);
            var deneme: String;
            deneme = this.teamNameX;
            if(deneme.includes("spor")){
              deneme = deneme + " Kulübü";
            }
            else{
              deneme = deneme + " Spor Kulübü";
            }
            this.bigTeamString = deneme;
          }
        })
      });
      this.userRef = this.afs.collection('users');
      this.user$ = this.userRef.valueChanges();
      this.user$.forEach(data=>{
        data.forEach(val=>{
          if(val.team == this.teamNameX){
            this.usercount++;
            this.userpoint += val.point;
          }
        })
      });
     }


  public userpoint = 0;
  public usercount = 0;
  userRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>
  teamsRef: AngularFirestoreCollection<teams>;
  teams$: Observable<teams[]>;
  public teamNameX: any;
  public header: any;
  public year: any;
  public link: any;
  public bigTeamString: any;
  public description: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {  //paramMap: observable that can subscribe
      if(paramMap.has('team')){

        this.teamNameX = paramMap.get('team');
        console.log("passed match id:", this.teamNameX);

      }
      else{
        //what should happen here?
        //show error and have a button to renaviagte to main
      }
    });

  }
  returnPngLink(teamname: string){
    var size = Object.keys(this.teamsList).length;
    for(let i=0; i<size; i++){
      if(teamname == this.teamsList[i]){
        return this.teamLogoSrcList[i];
      }
    }
    return "";
  }

}
