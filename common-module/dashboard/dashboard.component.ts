
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as $ from 'jquery';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  ViewDashboard:FormGroup

  lstDbResult:any=[];
  lstDashBoardDetails:any=[];
  constructor(private router:Router,private formBuilder: FormBuilder,private fb:FormBuilder,private APICall:APICallingService) {

    
     $('#content').removeAttr('id')
    this.ViewDashboard = this.fb.group({
      FinancialyearDbId: new FormControl(''),
      Financialyear:new FormControl(''),
      FinancialEndyear:new FormControl(''),
      Financialstartyear:new FormControl(''),
      CompanyId:new FormControl(''),
      CompanyName:new FormControl('')
    });
  
  
    
}

  ngOnInit() {
    this.LoadCompanyDetails();
   this.dropdowncss()
    //Highcharts.chart('container', this.options);

   
  }

  
  // public options: any = {
  //   chart: {
  //     type: 'scatter',
  //     height: 700
  //   },
  //   title: {
  //     text: 'Sample Scatter Plot'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   tooltip: {
  //     formatter: function() {
  //       return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
  //       ''+':y ' + this.y.toFixed(2)
        
  //     }
  //   },
  //   xAxis: {
  //     type: 'datetime',
  //     labels: {
  //       formatter: function() {
  //         return Highcharts.dateFormat('%e %b %y', this.value);
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Normal',
  //       turboThreshold: 500000,
  //       data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
  //     },
  //     {
  //       name: 'Abnormal',
  //       turboThreshold: 500000,
  //       data: [[new Date('2018-02-05 18:38:31').getTime(), 7]]
  //     }
  //   ]
  // }

  
  highcharts = Highcharts;
  chartOptions:any ={
     chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://www.counterpointresearch.com/global-smartphone-share/"' +
            'target="_blank">Counterpoint Research</a>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Share',
        data: [
            ['Samsung', 23],
            ['Apple', 18],
            {
                name: 'Xiaomi',
                y: 12,
                sliced: true,
                selected: true
            },
            ['Oppo*', 9],
            ['Vivo', 8],
            ['Others', 30]
        ]
    }]
  }
 
 //second chats;
 highchart=Highcharts;
 chartOption:any ={
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      viewDistance: 25,
      depth: 40
    }
  },

  title: {
    text: ' Electricity production in countries, grouped by continent'
  },

  xAxis: {
    labels: {
      skew3d: true,
      style: {
        fontSize: '16px'
      }
    }
  },

  yAxis: {
    allowDecimals: false,
    min: 0,
    title: {
      text: 'TWh',
      skew3d: true,
      style: {
        fontSize: '16px'
      }
    }
  },

  tooltip: {
    headerFormat: '<b>{point.key}</b><br>',
    pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
  },

  plotOptions: {
    series: {
      pointStart: 2016
    },
    column: {
      stacking: 'normal',
      depth: 40
    }
  },

  series: [{
    name: 'South Korea',
    data: [563, 567, 590, 582, 571],
    stack: 'Asia'
  }, {
    name: 'Germany',
    data: [650, 654, 643, 612, 572],
    stack: 'Europe'
  }, {
    name: 'Saudi Arabia',
    data: [368, 378, 378, 367, 363],
    stack: 'Asia'
  }, {
    name: 'France',
    data: [564, 562, 582, 571, 533],
    stack: 'Europe'
  }]

 }


  LoadFinancialyear(CompanyId){
    $('#Financialyear').empty();

    try{
      var that = this;
      debugger;
    
      (<any>$('#Financialyear')).select2({
        allowClear: true,
        placeholder: "Select",
        ajax: {
          url: that.APICall.DBCallingURL,
          type: "POST",
          dataType: 'json',
          delay: 250,
          data:
            function (params) {
    debugger;
              var sstring = "";
              if (params.term != undefined) {
                sstring = params.term;
              }
              debugger;
              return JSON.stringify({ "Operation": 'dashboardviewsdropdown', "Params":'Financialyeardropdown', "Xml2": CompanyId, "Xml3": '', "Xml4": '' })
    
            }
          ,
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {
    
    
            debugger;
    
            var ResultData = (JSON.parse(response['Message'])).Table;
    
            var data = $.map(ResultData, function (obj) {
    debugger;
              obj.id = obj.databasename;
              obj.text = obj.financialyear;
            
              return obj;
            });
    
    
    
            return {
    
    
              results: data
    
            };
          },
          cache: false
    
        }
        
      });
      debugger;
      var DbSelection = new Option(this.f.Financialyear.value, this.f.FinancialyearDbId.value.toString(), true, true);
    
      (<any>$('#Financialyear')).append(DbSelection).trigger('change');
    
         $('#Financialyear').on('select2:select', function (e) {
    
        debugger;
    
    
        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;
          that.lstDashBoardDetails=[];
          that.f.FinancialyearDbId.setValue((<any>e).params.data.id);
          that.f.Financialyear.setValue((<any>e).params.data.text);
          that.f.Financialstartyear.setValue( (<any>e).params.data.startyear)
          that.f.FinancialEndyear.setValue( (<any>e).params.data.Endyear)
        that.LoadDashBoardDetails()
        }
      });
    
    
      $('#Financialyear').on("select2:unselecting", function (e) {
        debugger;
      
        that.f.FinancialyearDbId.setValue(0);
        that.f.Financialyear.setValue("");
        that.f.Financialstartyear.setValue('')
        that.f.FinancialEndyear.setValue('')
      });
    }
    catch(e){
    
    }
  }

  LoadDashBoardDetails(){
    debugger;
    var xml1 = '<Dashboard>'
   + '<DatabaseName>'+ this.f.FinancialyearDbId.value  +'</DatabaseName>'
   + '<FromDate>'+ this.f.Financialstartyear.value +'</FromDate>'
   + '<ToDate>'+ this.f.FinancialEndyear.value +'</ToDate>'
   + '<BranchID>1</BranchID>'
   + '<AccountID>1</AccountID>'
   + '<CompanyID>1</CompanyID>'
  
    + '</Dashboard>';

    this.APICall.DBCalling('Dashboard',xml1,'','', '').subscribe(
      (res: Response) => {
debugger;
    this.lstDbResult=[];
    this.lstDashBoardDetails=[];
    this.lstDbResult = JSON.parse(res['Message']);
        if(this.lstDbResult.Table.length > 0 && this.lstDbResult.Table[0].customername !=''){
          this.lstDashBoardDetails= this.lstDbResult.Table4[0];
          console.log(  this.lstDashBoardDetails)
        }


      });
  }
  LoadCompanyDetails() {
    try{
    var that = this;
    debugger;
    
    (<any>$('#CompanyName')).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: that.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {
  debugger;
            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'dashboardviewsdropdown', "Params":'CompanyInformation', "Xml2": '', "Xml3": '', "Xml4": '' })
  
          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
  
  
          debugger;
  
          var ResultData = (JSON.parse(response['Message'])).Table;
  
          var data = $.map(ResultData, function (obj) {
  debugger;
            obj.id = obj.CompanyId;
            obj.text = obj.CompanyName;
  
  
            return obj;
          });
  
  
  
          return {
  
  
            results: data
  
          };
        },
        cache: false
  
      }
      
    });
    debugger;
    var DbSelection = new Option(this.f.CompanyName.value, this.f.CompanyId.value.toString(), true, true);
  
    (<any>$('#CompanyName')).append(DbSelection).trigger('change');
  
       $('#CompanyName').on('select2:select', function (e) {
  
      debugger;
  
  
      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        
        that.f.CompanyId.setValue((<any>e).params.data.id);
        that.f.CompanyName.setValue((<any>e).params.data.text);
        that.dropdowncss()
         that.f.FinancialyearDbId.setValue(0)
         that.f.Financialyear.setValue('Select')
       that.LoadFinancialyear(that.f.CompanyId.value)
       that.dropdowncss1();
  
      }
    });
  
  
    $('#CompanyName').on("select2:unselecting", function (e) {
      debugger;
  
      that.f.CompanyId.setValue(0);
      that.f.CompanyName.setValue("");
  
    });
  }
  catch(e){
  
  }
  }
get f(){
  return this.ViewDashboard.controls;

}
dropdowncss(){
  $('#select2-CompanyName-container').removeProp('height');
  // $('#select2-CompanyName-container').attr('style','height:calc(2.5em + 0.75rem + -10px)')
  $('#select2-CompanyName-container').attr('style','height:100%')
  $('.select2-dropdown select2-dropdown--below').removeAttr('class')
  $('#select2-CompanyName-container').attr('style','border: 1px solid #f1eff0');
  $('.select2-search--dropdown').attr('style','backgroundcolor: #484546')
  $('.select2-search__field').attr('style','color: white');
  
  
   let select2=$('#select2-CompanyName-container')[0];
  
   select2.style.height=('36px');  
   select2.style.width=('100%');
   select2.style.backgroundColor=('#484546') 
   select2.style.color=('white')
   select2.style.fontWeight=('400');
}
dropdowncss1(){
  $('.select2-selection__rendered').removeProp('height');
  // $('.select2-selection__rendered').attr('style','height:calc(2.5em + 0.75rem + -10px)')
  $('.select2-selection__rendered').attr('style','height:100%;background:#484546;color: white')
  $('.select2-dropdown select2-dropdown--below').removeAttr('class')
  $('.select2-search--dropdown').attr('style','border: 1px solid #f1eff0');
  $('.select2-search--dropdown').attr('style','backgroundcolor: #484546')
  $('.select2-search__field').attr('style','color: white');
  
 

  let resselect2=$('#select2-Financialyear-container')[0];
  resselect2.style.color=('white');
  resselect2.style.backgroundColor=('#484546');
  resselect2.style.border=('1px solid #918f90') 
   resselect2.style.padding=('0px 2px 1px 8px')
   resselect2.style.paddingTop=('5px');
}
// highcharts = Highcharts;
// chartOptions:any ={
//    chart: {
//       type: 'pie',
//       options3d: {
//           enabled: true,
//           alpha: 45,
//           beta: 0
//       }
//   },
//   title: {
//       text: 'Global smartphone shipments market share, Q1 2022'
//   },
//   subtitle: {
//       text: 'Source: ' +
//           '<a href="https://www.counterpointresearch.com/global-smartphone-share/"' +
//           'target="_blank">Counterpoint Research</a>'
//   },
//   accessibility: {
//       point: {
//           valueSuffix: '%'
//       }
//   },
//   tooltip: {
//       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   },
//   plotOptions: {
//       pie: {
//           allowPointSelect: true,
//           cursor: 'pointer',
//           depth: 35,
//           dataLabels: {
//               enabled: true,
//               format: '{point.name}'
//           }
//       }
//   },
//   series: [{
//       type: 'pie',
//       name: 'Share',
//       data: [
//           ['Samsung', 23],
//           ['Apple', 18],
//           {
//               name: 'Xiaomi',
//               y: 12,
//               sliced: true,
//               selected: true
//           },
//           ['Oppo*', 9],
//           ['Vivo', 8],
//           ['Others', 30]
//       ]
//   }]
// }
  ngAfterViewInit(){

   
   
    this.LoadFinancialyear(1);
   this.dropdowncss1();
    
    
     this.LoadCompanyDetails();
     this.dropdowncss()
      
     
     
  //    element.style {
  //     height: 36px;
  //     width: 100%;
  //     background-color: #484546;
  //     color: white;
  //     font-weight: 400;
  // }
    }
}
