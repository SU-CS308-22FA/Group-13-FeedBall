import { Component, OnInit } from '@angular/core';
import {
  HighchartService,
  chartModal
} from "../../highchart.service";
import * as Highcharts from "highcharts";
import { User } from '../shared/services/user';
import { NgForm } from '@angular/forms';
import { Timestamp } from 'rxjs';
import { redraw } from 'plotly.js';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public range1 = 0;
  public range2 = 0;
  public range3 = 0;
  public range4 = 0;
  public filterAgeTeam = "";
  public filterTeam = "";
  public male = 0;
  public female = 0;
  public other = 0;
  public peopleListTeamPoint: Array<number> = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
  public teamsList: Array<string> = [
    "All",
    "Adana Demirspor",
    "Alanyaspor" ,
    "Antalyaspor",
    "Beşiktaş",
    "Fatih Karagümrük",
    "Fenerbahçe",
    "Galatasaray",
    "Gaziantep",
    "Giresunspor",
    "Hatayspor",
    "İstanbul Başakşehir",
    "İstanbulspor",
    "Kasımpaşa",
    "Kayserispor",
    "Konyaspor",
    "MKE Ankaragücü",
    "Sivasspor",
    "Trabzonspor",
    "Ümraniyespor"
  ];
  ageList = ["Under 18", "18-25", "26-40", "40+"];
  title = "Firestore-Angular-Highcharts";
  items$!: User[];
  Highcharts: typeof Highcharts = Highcharts;
  Highcharts2: typeof Highcharts = Highcharts;
  Highcharts3: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  chardata2: any[] = [];
  chartOptions2: any;
  chardata3: any[] = [];
  chartOptions3: any;
  constructor(private highchartservice: HighchartService) {}



  ngOnInit() {
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          if(this.filterTeam == "" || this.filterTeam == "All" ){
            if(element.gender == 'Male'){
              this.male++;
            }
            else if(element.gender == 'Female'){
              this.female++;
            }
            else if(element.gender == 'Other'){
              this.other++;
            }
          }
          else{
            if(element.team == this.filterTeam){
              if(element.gender == 'Male'){
                this.male++;
              }
              else if(element.gender == 'Female'){
                this.female++;
              }
              else if(element.gender == 'Other'){
                this.other++;
              }
            }
          }
          this.getChart();
        });
      }
    });

    this.highchartservice.rates$.subscribe((assets) => {
      this.peopleListTeamPoint = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          for(let i = 1; i < this.teamsList.length; i++){
            if(element.team == this.teamsList[i]){
              if(element.point != 0 || element.point != null){
                this.peopleListTeamPoint[i-1] = this.peopleListTeamPoint[i-1] + element.point;
              }

            }
          }
          this.getChart2();

        });
      }

    });
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          if(this.filterAgeTeam == "" || this.filterAgeTeam == "All" ){
            console.log("ha");

            const ageX = this.ageFunc(element.age);
            if(ageX < 18){
              this.range1++;
            }
            else if(ageX >= 18 && ageX <= 25){
              this.range2++;
            }
            else if(ageX >= 26 && ageX <= 40){
              this.range3++;
            }
            else{
              this.range4++;
            }
          }
          else{
            const ageX = this.ageFunc(element.age);
            if(element.team == this.filterAgeTeam){
              if(ageX < 18){
                this.range1++;
              }
              else if(ageX >= 18 && ageX <= 25){
                this.range2++;
              }
              else if(ageX >= 26 && ageX <= 40){
                this.range3++;
              }
              else{
                this.range4++;
              }
            }
          }
          this.getChart3();
        });
      }
    });
  }
  mamaMia(form: NgForm){
    this.male = 0;
    this.female = 0;
    this.other = 0;
    this.filterTeam = form.value.teamInput;
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          if(this.filterTeam == "" || this.filterTeam == "All" ){
            if(element.gender == 'Male'){
              this.male++;
            }
            else if(element.gender == 'Female'){
              this.female++;
            }
            else if(element.gender == 'Other'){
              this.other++;
            }
          }
          else{
            if(element.team == this.filterTeam){
              if(element.gender == 'Male'){
                this.male++;
              }
              else if(element.gender == 'Female'){
                this.female++;
              }
              else if(element.gender == 'Other'){
                this.other++;
              }
            }
          }
          this.getChart();
        });
      }
    });


  }

  ageFunc(birth: any){
    var numtimestamp = Number(birth.seconds);
    numtimestamp = numtimestamp * 1000;
    const dateOf = new Date(numtimestamp);
    var birthyear = Number(dateOf.getFullYear());
    var time = new Date().getFullYear();
    var age = time - birthyear ;
    return age;
  }

  mamaMia2  (form: NgForm){
    this.range1 = 0;
    this.range2 = 0;
    this.range3 = 0;
    this.range4 = 0;
    this.filterAgeTeam = form.value.team2Input;
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          if(element.age != null){
            if(this.filterAgeTeam == "" || this.filterAgeTeam == "All" ){
              const ageX = this.ageFunc(element.age);
              if(ageX < 18){
                this.range1++;
              }
              else if(ageX >= 18 && ageX <= 25){
                this.range2++;
              }
              else if(ageX >= 26 && ageX <= 40){
                this.range3++;
              }
              else{
                this.range4++;
              }
            }
            else{
              const ageX = this.ageFunc(element.age);
              if(element.team == this.filterAgeTeam){
                if(ageX < 18){
                  this.range1++;
                }
                else if(ageX >= 18 && ageX <= 25){
                  this.range2++;
                }
                else if(ageX >= 26 && ageX <= 40){
                  this.range3++;
                }
                else{
                  this.range4++;
                }
              }
            }
          }
        });
        this.getChart3();
      }
    });
  }

  getChart3() {
    this.chartOptions3 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'All user distributed according to age'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Age Range',
        colorByPoint: true,
        data: [{
          name: 'Under 18',
          y: this.range1,
          sliced: true,
          selected: true
        },
        {
          name: '18-25',
          y: this.range2,
          selected: true
        },
        {
          name: '26-40',
          y: this.range3,
          selected: true
        },
        {
          name: '40+',
          y: this.range4,
          selected: true
        }]
      }]
    };
  }




  getChart() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'All user distributed according to gender'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Gender',
        colorByPoint: true,
        data: [{
          name: 'Female',
          y: this.female,
          sliced: true,
          selected: true
        },
        {
          name: 'Male',
          y: this.male,
          selected: true
        },
        {
          name: 'Other',
          y: this.other,
          selected: true
        }]
      }]
    };
  }
  getChart2(){
    this.chartOptions2 ={
      chart: {
        type: 'line'
      },
      title: {
        text: 'Users interaction based on their points'
      },

      xAxis: {
        categories: [
          "Adana Demirspor",
          "Alanyaspor" ,
          "Antalyaspor",
          "Beşiktaş",
          "Fatih Karagümrük",
          "Fenerbahçe",
          "Galatasaray",
          "Gaziantep",
          "Giresunspor",
          "Hatayspor",
          "İstanbul Başakşehir",
          "İstanbulspor",
          "Kasımpaşa",
          "Kayserispor",
          "Konyaspor",
          "MKE Ankaragücü",
          "Sivasspor",
          "Trabzonspor",
          "Ümraniyespor"
        ]
      },
      yAxis: {
        title: {
          text: 'Points'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      series: [{
        name: 'Total Points',
        data: this.peopleListTeamPoint
      }]
    }

  }
}


    // Data retrieved from https://netmarketshare.com



