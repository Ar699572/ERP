import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-salesorderreport',
  templateUrl: './salesorderreport.component.html',
  styleUrls: ['./salesorderreport.component.css'],
  providers:[DatePipe]
})
export class SalesorderreportComponent implements OnInit {

  FinancialstartYear : string;
  SalesorderReport:FormGroup;
  minDate:string='';
  maxdate:string='';
  FinancialEndYear:string='';
  hiddensection:boolean=true;
  constructor(private router:Router,private formBuilder: FormBuilder,private datePipe:DatePipe,private APICall:APICallingService,private store: Store<any>) {
    var month='04'
    var day='01'
    var currentYear = new Date().getFullYear();
    var Mindateset=currentYear + '-' + month+'-' + day
    this.minDate=moment(Mindateset).format('YYYY-MM-DD')
    this.FinancialstartYear = this.datePipe.transform(this.minDate,'yyyy-MM-dd');
    currentYear =currentYear+ 1
    this.maxdate=currentYear + '-' + '03'+'-' + '31'
    this.FinancialEndYear =this.datePipe.transform(this.maxdate,'yyyy-MM-dd');
   
   
    this.SalesorderReport =this.formBuilder.group({
      CustomerId:new FormControl(0,Validators.required),
      FromDate:new FormControl( this.FinancialstartYear,Validators.required),
      ToDate:new FormControl( this.FinancialEndYear,Validators.required)
    },{validator: this.checkDates})

 
   }

   checkDates(group: FormGroup) {
    
  
    if(group.controls.ToDate.value  <= group.controls.FromDate.value )
       {
      return { notValid:true }
    }
    return null;
  } 

 
  ngOnInit() {
this.LoadCustomer()
this.LoadFinancialyear()
  }


  lstFinancialYear:any=[];
  lstDbResult:any=[];
  LoadFinancialyear(){
    debugger;
    this.lstFinancialYear = [];
    this.APICall.DBCalling("Financialyeardb", "", "", "", '').subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);
       var Financialdates= this.lstDbResult.Table
       
       for(var i=0;i<Financialdates.length;i++){
        debugger;
        this.lstFinancialYear.push(Financialdates[i].financialyear)
       }
      
      });  

    (<any>$(".js-select2")).select2({
      
      closeOnSelect : false,
      placeholder : "Select Year",
      allowHtml: true,
      allowClear: true,
      tags: true 
    });
   
   
   
    var that = this;
    $('.js-select2').on('select2:select', function (e) { 

debugger;
try {                
  e.preventDefault()
  var id = ((<any>e).params.data.id);
  var name = ((<any>e).params.data.text);
 debugger;
 
 that.SelectedYear.push(name)

 

} catch (e) { }

    })

debugger;

$('.js-select2').on("select2:unselecting", function(e){
  debugger;
  
  var id = ((<any>e).params.args.data.id);
 var myIndex= that.SelectedYear.indexOf(id)
 that.SelectedYear.splice(myIndex, 1)
}).trigger('change');

   
  }
  submitted:boolean=false;

  get f(){
    return this.SalesorderReport.controls;
  }
  LoadCustomer(){
    debugger;
   
      var that = this;
  debugger;
      (<any>$("#drpCustomer")).select2({
        allowClear: true,
        placeholder: "Select",
        ajax: {
          url: this.APICall.DBCallingURL,
          type: "POST",
          dataType: 'json',
          delay: 250,
          data:
            function (params) {
  
              var sstring = "";
              if (params.term != undefined) {
                sstring = params.term;
              }
              debugger;
              return JSON.stringify({ "Operation": 'ViewCustomersShorDet', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })
  
            }
          ,
          contentType: 'application/json; charset=utf-8',
          processResults: function (response) {
  
  
  
  
            var ResultData = (JSON.parse(response['Message'])).Table;
  
            var data = $.map(ResultData, function (obj) {
  
              obj.id = obj.CustomerId;
              obj.text = obj.Customername;
  
  
              return obj;
            });
  
  
  
            return {
  
  
              results: data
  
            };
          },
          cache: false
  
        }
  
      });
  
  
  
      var that = this;
      $('#drpCustomer').on('select2:select', function (e) {
        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;         
           
          try {                
            e.preventDefault()
            var id = ((<any>e).params.data.id);
            var name = ((<any>e).params.data.text);
           that.f.CustomerId.setValue(id)
         
          
            
          } catch (e) { }

  
        }
  
  
      });
  
  
      $("#drpCustomer").on("select2:unselecting", function (e) {
  
        that.f.CustomerId.setValue(0)
      
  
      });
  

  }

  
  DBResult:any=[];
  FinancialYearxml:string=''
  lstSalesorder:any=[];
  SelectedYear:any=[];

  GetCustomerorders(){
    debugger;
    for (var i=0;i<this.SelectedYear.length;i++){
      debugger;
      
      if( this.FinancialYearxml==''){
        this.FinancialYearxml=this.SelectedYear[i]
      }else{
        this.FinancialYearxml=this.FinancialYearxml + ','+ this.SelectedYear[i]
      }
    
    }
    
    if(this.FinancialYearxml=='' ){
      debugger;
      var year:any=new Date().getFullYear();
      var endyear:any
      var startyear = JSON.stringify(year + 1)
      endyear= startyear.substring(2,4)
      this.FinancialYearxml=year + '-' + endyear
    }
   if(this.SalesorderReport.errors==null && this.f.FromDate.value <= this.f.ToDate.value && this.f.CustomerId.value >0) {
    debugger;
  
    var xml1 = '<NewDataSet><Table1>'
    + '<CustomerId>' + this.f.CustomerId.value + '</CustomerId>'
    + '<FromDate>' +this.f.FromDate.value+ '</FromDate>'
    + '<ToDate>' + this.f.ToDate.value + '</ToDate>'
    + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
    + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
    + '<FinalYears>'+ this.FinancialYearxml+'</FinalYears>'

    + '</Table1></NewDataSet>';

 
    this.DBResult=[];
    this.lstSalesorder=[];
  this.APICall.DBCalling("SalesorderReport", xml1, "", "", "").subscribe(
    (res: Response) => {
debugger;
      $("#loaderParent").hide();
      this.DBResult = JSON.parse(res['Message']);
      if(this.DBResult =='<NewDataSet><Table1></Table1></NewDataSet>'){
        (window as any).swal({
          icon: 'warning',
          title: ' No records Found ',
          text: 'selection  FromDate Between ToDate..!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-warning'
        });
      }else if ( this.DBResult.Table.length>0){
        this.lstSalesorder=this.DBResult.Table;  
      }else{

      }
    });
 
  }else if(this.SalesorderReport.errors.notValid=='true'  || this.f.ToDate.value==this.FinancialEndYear ){
    this.submitted=true;
  }else{
    this.submitted=false;
  }
  }

  ClearViewData(){
    debugger;

    this.SalesorderReport.patchValue({
      CustomerId:0,
      FromDate:this.FinancialstartYear,
      ToDate:this.FinancialEndYear,
    })
  
this.LoadCustomer()
this.submitted=false;


  }
}
