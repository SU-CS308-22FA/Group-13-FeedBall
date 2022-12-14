import { Component, OnInit } from '@angular/core';
import {
  HighchartService,
  chartModal
} from "../../highchart.service";
import * as Highcharts from "highcharts";
import { User } from '../shared/services/user';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public teamsList: Array<string> = [
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
  title = "Firestore-Angular-Highcharts";
  items$!: User[];
  Highcharts: typeof Highcharts = Highcharts;
  filter!: string;
  chardata: any[] = [];
  chartOptions: any;
  chardata2: any[] = [];
  chartOptions2: any;
  constructor(private highchartservice: HighchartService) {}
  counter(opt: string){
    let count = 0;
    for(let i = 0; i < this.chardata.length; i++){
      if(this.chardata[i] == opt){
        count++;
      }
    }
    return count;

  }
  counter2(opt: string){
    let count = 0;
    for(let i = 0; i < this.chardata.length; i++){
      if(this.chardata2[i] == opt){
        count++;
      }
    }
    return count;

  }
  ngOnInit() {
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          this.chardata.push(element.gender);
        });
        this.getChart();
      }
    });
    this.highchartservice.rates2$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          this.chardata2.push(element.team);
        });
        this.getChart2();
      }
    });
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
          y: this.counter('Female'),
          sliced: true,
          selected: true
        },
        {
          name: 'Male',
          y: this.counter('Male'),
          selected: true
        },
        {
          name: 'Other',
          y: this.counter('Other'),
          selected: true
        }]
      }]
    };
  }
  getChart2() {
    this.chartOptions2 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'All user distributed according to team'
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
        name: 'Team',
        colorByPoint: true,
        data: [{
          name:this.teamsList,


        }]
      }]
    };
  }

}



    // Data retrieved from https://netmarketshare.com



