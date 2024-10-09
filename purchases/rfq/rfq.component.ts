import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx'; 
import * as $ from 'jquery';
import { APICallingService } from 'src/app/apicalling.service';
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { StoreRFQ } from 'src/app/store/StoreRFQ';
//import { jsPDF } from 'jspdf';
//import { jsPDF } from "jspdf";
//import * as jsPDF from 'jspdf'
//import jspdf from 'jspdf';
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings.js';
//import 'jspdf-autotable';
import { formatDate } from '@angular/common';
import { StoreLoadRFQ } from 'src/app/store/StoreLoadRFQ';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.css'],
  providers:[DatePipe]
})


export class RFQComponent implements OnInit {
 // title = 'jspdf-autotable-demo';
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  sstring2:number=0;
  CreateRFQ:FormGroup;


  tempVendorreference: string = "";
  tempvdate: string = "";
  tempIncoterms: string = "";
  tempPurchaseType: string = "";


  TodaysDate:string=''
  DisplaySequenceNumberId=0;
  DisplayVendorId:number=0;
  DispalyFormName='RFQ';
  submitted=false;
  Invoiceno:string="";
  DispalyVendorName:string="";
  constructor(private DbCallings:CommonDbCallings,private router:Router,private formBuilder: FormBuilder,private datePipe:DatePipe,public APICall:APICallingService,
    private store: Store<any>,private pipe: DatePipe) {
    
    this.CreateRFQ=formBuilder.group(


      {
        PRQId:new FormControl(0),
        PartyName:new FormControl(''),
        ItemId:new FormControl(0),
        uom:new FormControl(''),
        HSN:new FormControl(''),
        SequenceNumberId:new FormControl(0),
        Description1:new FormControl(''),
        Make:new FormControl(''),
        MakeId:new FormControl(''),
        ItemCategoryId:new FormControl(0),
        CategoryName:new FormControl(''),
        ItemName:new FormControl(''),
        prqno:new FormControl(''),
        RequiredDate:new FormControl(''),
        PartyId:new FormControl(0),
        StartDate:new FormControl(''),
        Vendorreference:new FormControl(''),
        vdate:new FormControl(''),
        Incoterms:new FormControl(''),
        Template:new FormControl(''),
        PurchaseRepresentative:new FormControl(''),
        PurchaseType:new FormControl(''),
        PaymentTerms:new FormControl(''),
        ModelId:new FormControl(0),
        LineChanges: new FormControl(0),
        modelno:new FormControl(''),
        Quantity:new FormControl(0),
        Condition1:new FormControl(''),
        Condition2:new FormControl(''),
        Condition3:new FormControl(''),
        Manufacturer1:new FormControl(''),
        Manufacturer2:new FormControl(''),
        Manufacturer3:new FormControl('')

      }
      
    );
    this.TodaysDate =this.datePipe.transform( new Date(),'yyyy-MM-dd');
  }
  StoreRFQ: StoreRFQ;
  StoreAccountingSettings: StoreAccountingSettings;
  DeviceType="";
  ngOnInit() {
    this.DeviceType= localStorage.getItem('DeviceType')

    this.StoreRFQ=new StoreRFQ;
  
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
  //   if (Asresult.length > 0) {
  //     debugger;
  //           this.StoreAccountingSettings=( Asresult[0] );
  //  this.DefaultCustomerAccount=  (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Customer'; }))[0].AccountId;
 
  //       }
    if (result.length > 0) {

      debugger;
      this.StoreRFQ = result[0]
      this.ModifiedDate = this.StoreRFQ.ModifiedDate.toString();
     this.f.PRQId.setValue(this.StoreRFQ.PRQId);
      this.submitted= Boolean(this.StoreRFQ.submitted);
      this.f.PartyId.setValue(this.StoreRFQ.PartyId);
      if(this.StoreRFQ.date=='' ||this.StoreRFQ.date==null ){
        this.StoreRFQ.date=this.TodaysDate;
        this.f.vdate.setValue(this.TodaysDate)
      }else{
        this.f.vdate.setValue(this.StoreRFQ.date);
      }
     
      this.Invoiceno=this.StoreRFQ.prqno;
      
 
      this.tempVendorreference = this.StoreRFQ.Vendorreference;
      this.tempvdate = this.StoreRFQ.vdate;
      this.tempIncoterms = this.StoreRFQ.Incoterms;
      this.tempPurchaseType = this.StoreRFQ.PurchaseType;



      this.f.PartyName.setValue(this.StoreRFQ.PartyName);
      this.CreateRFQ.patchValue(this.StoreRFQ);
      this.DisplayVendorId=this.StoreRFQ.PartyId;
      this.DispalyVendorName=this.StoreRFQ.PartyName;
      var tempdate=formatDate(this.StoreRFQ.date, 'yyyy-MM-dd', 'en');
      this.CreateRFQ.patchValue({vdate:tempdate})

      // lstRFQdetails
    }
    var that=this;
debugger;
this.lstRFQdetails=this.StoreRFQ.lstRFQdetails;
var i = 0;
var lstRFQdetailsdata = $.map(this.lstRFQdetails, function (obj) {
  i = i + 1;
  obj.SNO = i;
  return obj;
});
debugger;
this.lstRFQdetails = lstRFQdetailsdata;
if (this.StoreRFQ.prqno != "") {
  debugger;
  this.ActivityTracker();
}


  this.CreateRFQ.valueChanges.subscribe(value => {
debugger;
    
    that.StoreRFQ.SequenceNumberId=value.SequenceNumberId;
  that.StoreRFQ.PartyName=value.PartyName;
  that.StoreRFQ.PartyId=value.PartyId;
  that.StoreRFQ.prqno=value.prqno;
  that.StoreRFQ.SequenceNumberId=value.SequenceNumberId;
  that.StoreRFQ.PurchaseType=value.PurchaseType;
  that.StoreRFQ.Vendorreference=value.Vendorreference;
  that.StoreRFQ.vdate=value.vdate;
  that.StoreRFQ.Incoterms=value.Incoterms;
  that.StoreRFQ.PaymentTerms=value.PaymentTerms;
  that.StoreRFQ.StartDate=value.StartDate;
  that.StoreRFQ.RequiredDate=value.RequiredDate;
  that.StoreRFQ.lstRFQdetails=that.lstRFQdetails;
  that.StoreRFQ.ViewName='PRQ';

  //  that.DisplayCOAId=value.coaid;
  //  that.DispalyAccountName=value.AccountName;
   that.StoreRFQ.PRQId=value.PRQId;
   
   


   that.StoreRFQ.ModifiedDate=(that.ModifiedDate==null?'':that.ModifiedDate.toString());

   
 that.StoreRFQ.submitted=that.submitted;
 that.StoreRFQ.TabId=ActivatedRoute;
   that.store.dispatch(new  TabStore.AddTab(that.StoreRFQ));
});
  
  
  }


 
  ReferencenumChange(target) {
    debugger;
    if (this.Invoiceno != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Reference Number is changed from  " + this.tempVendorreference + " to  " + target.value
    }
  }
  ReferenceDateChange(target) {
    debugger;
    if (this.Invoiceno != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Reference Date is changed from  " + this.tempvdate + " to  " + target.value
    }
  }
  IncotermsChange(target) {
    debugger;
    if (this.Invoiceno != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "Incoterms is changed from  " + this.tempIncoterms + " to  " + target.value
    }
  }
  PurchaseTypeChange(target) {
    debugger;
    if (this.Invoiceno != "") {
      this.ShowMessage = this.ShowMessage + "  ,  " + "PurchaseType is changed from  " + this.tempPurchaseType + " to  " + target.value
    }
  }


  Filterby="ExistEmail"
  NewEmail(){
    debugger;
    this.Filterby="NewEmail";
  }

  Existing(){
    debugger;
    this.Filterby="ExistEmail";
  }

  RFQOvberview(){
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
this.APICall.UpdatedSelectedPath('./Purchase/RFQ');
  this.router.navigate(['Purchase/RFQ']);
   

  }

  Condition1Change(target)
  {
    debugger;
      var temp=target.checked?"Reconditioned":"";
     this.f.Condition1.setValue(temp);
  }
  Condition2Change(target)
  {
    debugger;
      var temp=target.checked?"New":"";
     this.f.Condition2.setValue(temp);
  }
  Condition3Change(target)
  {
    debugger;
      var temp=target.checked?"Used":"";
     this.f.Condition3.setValue(temp);
  }
  Manufacturer1Change(target)
  {
    debugger;
      var temp=target.checked?"Aftermarket":"";
     this.f.Manufacturer1.setValue(temp);
  }
  Manufacturer2Change(target)
  {
    debugger;
      var temp=target.checked?"Original":"";
     this.f.Manufacturer2.setValue(temp);
  }
  Manufacturer3Change(target)
  {
    debugger;
      var temp=target.checked?"OEM":"";
     this.f.Manufacturer3.setValue(temp);
  }


  get f()
  { 
   return this.CreateRFQ.controls;
  
 } 
  ngAfterViewInit() {

    debugger;
   
   
    this.LoadCategory();
    this.LoadParts();
  }
  UOMId:number=0;
  _TransactionType:string="Sales";
  LoadCategory()
  {
  var that=this;
    
    (<any> $("#drpCategory")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
     return JSON.stringify( {"Operation": 'ViewDRPCategory', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.ItemCategoryId; 
       obj.text = obj.CategoryName; 

      
       return obj;
     });
     
     
  
          return {
        
     
             results: data
     
          };
        },
        cache: false
        
       }
     
      });
     
  
  
     var that =this;
     $('#drpCategory').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.ItemCategoryId.setValue( (<any>e).params.data.id);
     that.f.CategoryName.setValue( (<any>e).params.data.text);
     that.f.MakeId.setValue(0);
     that.f.Make.setValue('');
     that.LoadMakes();
   }
   
    
     });
     var partselection = new Option(this.f.CategoryName.value,this.f.ItemCategoryId.value.toString(), true, true);
   
     (<any> $('#drpCategory')).append(partselection).trigger('change');
   
     $("#drpCategory").on("select2:unselecting", function(e) {
      
     
      that.f.ItemCategoryId.setValue(0);
      that.f.CategoryName.setValue('');
 
     });
  
  }
  LoadParts()
  {
  var that=this;
    
    (<any> $("#drpParts")).select2({
     allowClear: true,
     placeholder:"Select",
       ajax: { 
        url:this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data: 
        function (params) {
     
     var sstring="";
     if( params.term!=undefined)
     {
       sstring=params.term;
     }
     debugger;
     return JSON.stringify( {"Operation": 'ViewItems', "Params":sstring,"Xml2":'All' ,"Xml3":'',"Xml4" :that.APICall.GetCompanyID() })
         
        }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
         
     
        
     
     var ResultData=(JSON.parse(response['Message'])).Table;
     
           var  data = $.map(ResultData, function (obj) {
           
       obj.id = obj.ItemId; 
       obj.text = obj.partno; 
       obj.text1 = obj.description;
       obj.text2 = obj.puruom;
       obj.text3 = obj.dashno;
       
      
       return obj;
     });
     
     
  
          return {
        
     
             results: data
     
          };
        },
        cache: false
        
       }
     
      });
     
  
  
     var that =this;
     $('#drpParts').on('select2:select', function (e) {
     
     
  
    
     if(typeof((<any>e).params.data.id)!='undefined')
     {
      
   
     that.f.ItemId.setValue( (<any>e).params.data.id);
     that.f.ItemName.setValue( (<any>e).params.data.text);
     that.UOMId = (that._TransactionType == 'Sales' ? (<any>e).params.data.saleuom : (<any>e).params.data.puruom);
     that.f.Description1.setValue( (<any>e).params.data.text1);
     that.f.uom.setValue( (<any>e).params.data.text2);
     that.f.HSN.setValue( (<any>e).params.data.text3);

   }
   
    
     });
     var partselection1 = new Option(this.f.ItemName.value,this.f.ItemId.value.toString(), true, true);
   
     (<any> $('#drpParts')).append(partselection1).trigger('change');
   
     $("#drpParts").on("select2:unselecting", function(e) {
      
     
      that.f.ItemId.setValue(0);
      that.f.ItemName.setValue('');
     that.f.Description1.setValue('');
     });
  
  }
  LoadMakes()
   {
     debugger;
    
    
 var that=this;
     
     (<any> $("#drpMake")).select2({
      allowClear: true,
      placeholder:"Select",
        ajax: { 
         url:this.APICall.DBCallingURL,
         type: "POST",
         dataType: 'json',
         delay: 250,
         data: 
         function (params) {
        var sstring:any;
          if( params.term!=undefined)
          {
            sstring=params.term;
          }
if(that.f.ItemCategoryId.value>0)
{debugger;
  sstring=that.f.ItemCategoryId.value;
}
    
          
          
          
        
      debugger;
          
      return JSON.stringify( {"Operation": 'DRPMakeView', "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
          
         }
         ,
         contentType: 'application/json; charset=utf-8',
         processResults: function (response) {
          
      debugger;
         
      
      var ResultData=(JSON.parse(response['Message'])).Table;
     
            var  data = $.map(ResultData, function (obj) {
            
              obj.id = obj.MakeId;
              obj.text = obj.make;
      
       
        return obj;
      });
      
      
   
           return {
         
      
              results: data
      
           };
         },
         cache: false
         
        }
      
       });
      
 
 
      var that =this;
      $('#drpMake').on('select2:select', function (e) {
      
      
 
     
      if(typeof((<any>e).params.data.id)!='undefined')
      {
       
    
      that.f.MakeId.setValue( (<any>e).params.data.id);
      that.f.Make.setValue( (<any>e).params.data.text);

    }
    if(that.f.MakeId.value==0)
    {
      (<any> $('#drpMake')).val(null).trigger('change');
    }
    that.f.ModelId.setValue(0);
    that.f.modelno.setValue('');
    that.LoadModels()
     
      });
      var Accountselection2 = new Option(this.getControlValue(this.f.Make,'string'),
      this.getControlValue(this.f.MakeId,'int'), true, true);
  (<any> $('#drpMake')).append(Accountselection2).trigger('change');


    
      $("#drpMake").on("select2:unselecting", function(e) {
       
      
       that.f.MakeId.setValue(0);
       that.f.Make.setValue( '');
      
      });
 
   }
   LoadModels()
   {
     debugger;
    
    
 var that=this;
     
     (<any> $("#drpModel")).select2({
      allowClear: true,
      placeholder:"Select",
        ajax: { 
         url:this.APICall.DBCallingURL,
         type: "POST",
         dataType: 'json',
         delay: 250,
         data: 
         function (params) {
        var sstring:any;
          if( params.term!=undefined)
          {
            sstring=params.term;
          }
          if(that.f.MakeId.value>0)
          {
            sstring=that.f.MakeId.value
          }
         
    
          
          
          
        
      debugger;
          
      return JSON.stringify( {"Operation": 'ViewDRPModel', "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
          
         }
         ,
         contentType: 'application/json; charset=utf-8',
         processResults: function (response) {
          
      debugger;
         
      
      var ResultData=(JSON.parse(response['Message'])).Table;
     
            var  data = $.map(ResultData, function (obj) {
            
              obj.id = obj.ModelId;
              obj.text = obj.modelno;
      
       
        return obj;
      });
      
      
   
           return {
         
      
              results: data
      
           };
         },
         cache: false
         
        }
      
       });
      
 
 
      var that =this;
      $('#drpModel').on('select2:select', function (e) {
      
      
 
     
      if(typeof((<any>e).params.data.id)!='undefined')
      {
       
    
      that.f.ModelId.setValue( (<any>e).params.data.id);
      that.f.modelno.setValue( (<any>e).params.data.text);

    }


     
      });
      if(that.f.ModelId.value==0)
      {
        (<any> $('#drpModel')).val(null).trigger('change');
      }
      var Accountselection2 = new Option(this.getControlValue(this.f.modelno,'string'),
      this.getControlValue(this.f.ModelId,'int'), true, true);
  (<any> $('#drpModel')).append(Accountselection2).trigger('change');


    
      $("#drpModel").on("select2:unselecting", function(e) {
       
      
       that.f.ModelId.setValue(0);
       that.f.modelno.setValue( '');
      
      });
 
   }
   getControlValue(Control,Type):string
   {

    var Value=(Type=="string"?"":"0");
     if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
     {
       Value=Control.value;
     }
   
     return Value;
   }
   lstDbResult:any=[];
  
   ControlDatePickerLoad()
   {
   
   
   (window as any).$('input[name="single-date-picker"]').daterangepicker({
   singleDatePicker: true,
   showDropdowns: true
   });
   
   (window as any).$('input[name="simple-date-range-picker"]').daterangepicker();
   
   (window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
     opens: 'left'
   }, function (start, end, label) {
   (window as any). swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
   });
   
   (window as any).$('input[name="datetimes"]').daterangepicker({
     timePicker: true,
     startDate: (window as any).moment().startOf('hour'),
     endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
     locale: {
         format: 'M/DD hh:mm A'
     }
   });
   
 
   (window as any).$('input.create-event-datepicker').daterangepicker({
     singleDatePicker: true,
     showDropdowns: true,
     autoUpdateInput: false
   }).on('apply.daterangepicker', function(ev, picker) {
    
     $(this).val(picker.startDate.format('MM/DD/YYYY'));
   });
   
   }

   PreapareMakeParam(): string {
    var xmlParaminput = ""
    // $("#Description").val(this.SelectedDescription);


    debugger;

    xmlParaminput = '<NewDataSet><Table1>'

      + '<ItemID>' + this.f.ItemId.value + '</ItemID>'
      + '<Type>' + this._TransactionType + '</Type>'
      + '<PartyId>' +0+ '</PartyId>'
      + '<UOMID>' + this.UOMId + '</UOMID>'

      + '</Table1></NewDataSet>';

    return xmlParaminput;
  }
  lstRFQdetails:any=[];
  EditRecNO=-1;
  SNO=1;
RFQDetailsClear()
{

  this.CreateRFQ.patchValue({
    
    ItemId:0,
    ItemName:"",
    Description1:"",
    Make:0,
    MakeId:"",
   
   
  });
  
 // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO=this.lstRFQdetails.length+1;


}
  SaveDetails()
  {
    debugger;

    
   for(var  i=0;i<this.lstRFQdetails.length;i++)
   {
    this.lstRFQdetails[i].Show='true';
    if(this.lstRFQdetails[i].SNO==this.EditRecNO)
    {
     this.lstRFQdetails[i].PRQId=this.getControlValue(this.f.PRQId,'int')
      this.lstRFQdetails[i].ItemId=this.getControlValue(this.f.ItemId,'int');
      this.lstRFQdetails[i].Description1=this.getControlValue(this.f.Description1,'string');
      this.lstRFQdetails[i].Make=this.getControlValue(this.f.Make,'string');
      this.lstRFQdetails[i].MakeId=this.getControlValue(this.f.MakeId,'int');
      this.lstRFQdetails[i].ItemCategoryId=this.getControlValue(this.f.ItemCategoryId,'int');
      this.lstRFQdetails[i].CategoryName=this.getControlValue(this.f.CategoryName,'string');
      this.lstRFQdetails[i].ModelId=this.getControlValue(this.f.ModelId,'int');
      this.lstRFQdetails[i].modelno=this.getControlValue(this.f.modelno,'string');
      this.lstRFQdetails[i].Make=this.getControlValue(this.f.Make,'string');
      this.lstRFQdetails[i].MakeId=this.getControlValue(this.f.MakeId,'int');
      this.lstRFQdetails[i].ItemName=this.getControlValue(this.f.ItemName,'string');
      this.lstRFQdetails[i].ModelId=this.getControlValue(this.f.ModelId,'int');
      this.lstRFQdetails[i].modelno=this.getControlValue(this.f.modelno,'string');
      this.lstRFQdetails[i].uom=this.getControlValue(this.f.uom,'string');
      this.lstRFQdetails[i].HSN=this.getControlValue(this.f.HSN,'string');
      this.lstRFQdetails[i].Quantity=this.getControlValue(this.f.Quantity,'number');
      this.lstRFQdetails[i].Condition1=this.getControlValue(this.f.Condition1,'string');
      this.lstRFQdetails[i].Condition2=this.getControlValue(this.f.Condition2,'string');
      this.lstRFQdetails[i].Condition3=this.getControlValue(this.f.Condition3,'string');
      this.lstRFQdetails[i].Manufacturer1=this.getControlValue(this.f.Manufacturer1,'string');
      this.lstRFQdetails[i].Manufacturer2=this.getControlValue(this.f.Manufacturer2,'string');
      this.lstRFQdetails[i].Manufacturer3=this.getControlValue(this.f.Manufacturer3,'string');
    }
   }
  if(this.EditRecNO==-1)
  {
    var res1=
             ({
              SNO:this.SNO
             ,PRQId:this.getControlValue(this.f.PRQId,'int')
             ,PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id:0
             ,ItemId:this.getControlValue(this.f.ItemId,'int')
             ,ItemName:this.getControlValue(this.f.ItemName,'string')
             ,Description1:this.getControlValue(this.f.Description1,'string')
             ,Make:this.getControlValue(this.f.Make,'string')
             ,MakeId:this.getControlValue(this.f.MakeId,'int')
             ,ItemCategoryId:this.getControlValue(this.f.ItemCategoryId,'int')
             ,CategoryName:this.getControlValue(this.f.CategoryName,'string')
             ,ModelId:this.getControlValue(this.f.ModelId,'int')
             ,modelno:this.getControlValue(this.f.modelno,'string')
             ,Quantity:this.getControlValue(this.f.Quantity,'int')
             ,Condition1:this.getControlValue(this.f.Condition1,'string')
             ,Condition2:this.getControlValue(this.f.Condition2,'string')
             ,uom:this.getControlValue(this.f.uom,'string')
             ,HSN:this.getControlValue(this.f.HSN,'string')
             
             ,Condition3:this.getControlValue(this.f.Condition3,'string')
             ,Manufacturer1:this.getControlValue(this.f.Manufacturer1,'string')
             ,Manufacturer2:this.getControlValue(this.f.Manufacturer2,'string')
             ,Manufacturer3:this.getControlValue(this.f.Manufacturer3,'string')

             ,Show:'true'
             });
  
  if(this.lstRFQdetails.length==0)
  {
    this.lstRFQdetails=[res1];
  
  }
  else{
    this.lstRFQdetails.push(res1);
    
  }
  }
  this.EditRecNO=-1;
  
             this.RFQDetailsClear();
             $("#btnCloseAddItem").trigger('click');  
           
  
             this.SNO=this.lstRFQdetails.length+1;
  
 //   }
             this.f.LineChanges.setValue(0);
  }

  Additemclick()
  {
    this.EditRecNO=-1;
this.CreateRFQ.patchValue({
  ItemId:0,
  ItemName:"",
  Description1:"",
  Make:0,
  MakeId:"",
  ItemCategoryId:0,
  CategoryName:"",
  ModelId:0,
        modelno:"",
        Quantity:0,
        Condition1:"",
        Condition2:"",
        Condition3:"",
        Manufacturer1:"",
        Manufacturer2:"",
        Manufacturer3:"",

});
$('#drpCategory').val(null).trigger('change');
$('#drpMake').val(null).trigger('change');
$('#drpModel').val(null).trigger('change');
$('#drpParts').val(null).trigger('change');
  }

  windowScroll(ControlName)
  {
    var element = document.getElementById(ControlName); 
  var rect = element.getBoundingClientRect();
  
  window.scrollTo(rect.left, rect.top);
  }
  OnSave()
  {
debugger;
    this.submitted=true;
    
  
if(this.CreateRFQ.invalid)
{
  var  Cvalid=true;
  

  if(this.f.PartyId.invalid && Cvalid)
  {
    debugger;
    this.windowScroll('PartyId');
    Cvalid=false;
  }


  return;
}
else
{
 this.SaveRFQ();
}
}
NumberSequenceValueChange(value)
{
  debugger;
this.f.SequenceNumberId.setValue(value);

}

ModifiedDate="";
DbResult:any=[];
showReport: string = "";
SaveRFQ()
{
  debugger;
//  this.ModifiedDate = this.pipe.transform()
//  var modifiedDate =  .transform(this.ModifiedDate, "YYYY-MM-dd h:mm:ss");
debugger;
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
this.f.vdate.setValue(formatDate(this.f.vdate.value, 'yyyy-MM-dd', 'en'));
   var xml1='<NewDataSet><Table1>'
   +'<PRQId>'+(typeof(this.f.PRQId.value)=='undefined'?'0':this.f.PRQId.value)+'</PRQId>'
   +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'int')+'</SequenceNumberId>'
   +'<date>'+this.getControlValue(this.f.vdate,'string')+'</date>'
   +'<Vendorid>'+this.getControlValue(this.f.PartyId,'int')+'</Vendorid>'
   +'<PurchaseType>'+this.getControlValue(this.f.PurchaseType,'string')+'</PurchaseType>'
   +'<Vendorreference>'+this.getControlValue(this.f.Vendorreference,'string')+'</Vendorreference>'
   +'<Incoterms>'+this.getControlValue(this.f.Incoterms,'string')+'</Incoterms>'
  
   +'<Template>'+this.getControlValue(this.f.Template,'string')+'</Template>'
   +'<PurchaseRepresentative>'+this.getControlValue(this.f.PurchaseRepresentative,'string')+'</PurchaseRepresentative>'
   +'<PaymentTerms>'+this.getControlValue(this.f.PaymentTerms,'string')+'</PaymentTerms>'
   +'<StartDate>'+this.getControlValue(this.f.StartDate,'string')+'</StartDate>'
   +'<RequiredDate>'+this.getControlValue(this.f.RequiredDate,'string')+'</RequiredDate>'

     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+ '' +'</ModifiedDate>' //this.ModifiedDate 
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';
     var xml2="";
     var rows="";

     for(var i=0;i<this.lstRFQdetails.length;i++)
     {
      
      rows=rows+'<Table1><PRQId>'+(typeof(this.f.PRQId.value)=='undefined'?'0':this.f.PRQId.value)+'</PRQId>'
     // +'<SNO>'+this.SNO+ '</SNO>'
         +'<PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id>'+this.lstRFQdetails[i].PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id+'</PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id>'
      +'<ItemId>'+ this.lstRFQdetails[i].ItemId+ '</ItemId>'
     +'<description>'+this.lstRFQdetails[i].Description1+ '</description>'
     +'<Make>'+(typeof(this.lstRFQdetails[i].MakeId)=='undefined'?this.lstRFQdetails[i].MakeId:'0')+ '</Make>'
     +'<Condition1>'+this.lstRFQdetails[i].Condition1+ '</Condition1>'
     +'<Condition2>'+this.lstRFQdetails[i].Condition2+ '</Condition2>'
     +'<Condition3>'+this.lstRFQdetails[i].Condition3+ '</Condition3>'
     +'<Manufacturer1>'+this.lstRFQdetails[i].Manufacturer1+ '</Manufacturer1>'
     +'<Manufacturer2>'+this.lstRFQdetails[i].Manufacturer2+ '</Manufacturer2>'
     +'<Manufacturer3>'+this.lstRFQdetails[i].Manufacturer3+ '</Manufacturer3>'
     +'<uom>'+this.lstRFQdetails[i].uom+ '</uom>'
     +'<HSN>'+this.lstRFQdetails[i].HSN+ '</HSN>'
     
     +'<Category>'+this.lstRFQdetails[i].ItemCategoryId+ '</Category>'
     +'<Quantity>'+this.lstRFQdetails[i].Quantity+ '</Quantity>'

     +'<Model>'+(typeof(this.lstRFQdetails[i].ModelId)=='undefined'?this.lstRFQdetails[i].ModelId:'0')+ '</Model></Table1>'
    }
    xml2='<NewDataSet>'+rows+'</NewDataSet>';

   
debugger;
  this.APICall.DBCalling("SaveRFQ",xml1,xml2,"","").subscribe(
    (res:Response) => {
debugger;
      $("#loaderParent").hide();
     
      this.DbResult=JSON.parse(res['Message']);
        debugger;
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
      if(this.f.PRQId.value>0)
      {
        this.showReport = "RFQ Modified"
        this.SaveTrackRfq();
        this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Updated successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
     this.router.navigate(['Purchase/RFQ']);
   }else{
    this.showReport = "RFQ Created"
       this.f.PRQId.setValue(this.DbResult.Table[0].PRQId);
       this.f.prqno.setValue(this.DbResult.Table[0].prqno);

       
   
       this.ModifiedDate=this.DbResult.Table[0].ModifiedDate;
       this.SaveTrackRfq();
           (window as any).swal({
       icon: 'success',
       title: 'Information!',
       text: 'Record Saved successfully.',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-success'
   });
   this.router.navigate(['Purchase/RFQ']);
   }
   
   if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0 )
   {
    if(this.DbResult.Table1.length>0  )
    {
      if(this.DbResult.Table.length>0  )
      {


      }


    }


   }
     }else{



if(this.DbResult.Table[0].DBresult==-3)
{
(window as any).swal({
 icon: 'warning',
 title: 'Exists',
 text: 'Customer Already Exists.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-warning'
});
}else{

  if(this.DbResult.Table[0].DBresult==-5)
  {

    var that=this;
    debugger;
   
    (window as any).swal({
      icon: "warning",
      title:  "Treansaction modified by "+this.DbResult.Table[0].ModifiedBy+"! ",
      text:"Do you wants to overwrite?",
   
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
    
      if (isConfirm) {
  
        that.ModifiedDate=that.DbResult.Table[0].ModifiedDate;
  
        that.SaveRFQ();
      }else {
        (window as any). swal("Cancelled", "this file is not updated :)", "error");
      }
  
    });
  
   
  }else
  {

(window as any).swal({
 icon: 'error',
 title: 'Error!',
 text: 'failed.!',
 confirmButtonText: 'Dismiss',
 buttonsStyling: false,
 confirmButtonClass: 'btn btn-lg btn-danger'
});
  }
      
     }
   }

   },
   err => {
     (window as any).swal({
       icon: 'error',
       title: 'Error!',
       text: 'Network Error Please Try Again .!',
       confirmButtonText: 'Dismiss',
       buttonsStyling: false,
       confirmButtonClass: 'btn btn-lg btn-danger'
   });
   }
 );
  
}
QuotDateChange(e)
{
  
}
VendorValueChange(event)
{
  debugger;
  this.f.PartyId.setValue(event.VendorId);
}

DeleteRFQ()
{


  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;
var xml1='<NewDataSet><Table1>'
+'<PRQId>'+this.getControlValue(this.f.PRQId,'string')+'</PRQId>'

+'<Vendorid>'+this.getControlValue(this.f.PartyId,'int')+'</Vendorid>'


+'<UserName>'+this.APICall.GetUserName()+'</UserName>'
+'<UserID>'+this.APICall.GetUserID()+'</UserID>'
+'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
 
  +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
  +'</Table1></NewDataSet>';
debugger;
  this.APICall.DBCalling("DeleteRFQ",xml1,"","","").subscribe(
    (res:Response) => {
debugger;
      $("#loaderParent").hide();
  debugger;
      this.DbResult=JSON.parse(res['Message']);
      if(this.DbResult.Table.length>0 && this.DbResult.Table[0].DBresult>0)
      {
        var ActivatedRoute=localStorage.getItem("ActivatedRoute");
        this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
        this.APICall.UpdatedSelectedPath('./Purchase/RFQ');
          this.router.navigate(['Purchase/RFQ']);

       (window as any).swal({
         icon: 'success',
         title: 'Information!',
         text: 'Record Deleted successfully.',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-lg btn-success'
     });
     this.router.navigate(['Purchase/RFQ']);

    }
    else{
      (window as any).swal({
        icon: 'error',
        title: 'Error!',
        text: 'failed.!',
        confirmButtonText: 'Dismiss',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-lg btn-danger'
       });
     }
  
  },
  err => {
    (window as any).swal({
      icon: 'error',
      title: 'Error!',
      text: 'Network Error Please Try Again .!',
      confirmButtonText: 'Dismiss',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-danger'
  });
  }
);
}
OnDelete()
{

  var that=this;
  debugger;
  
  (window as any).swal({
    icon: "warning",
    title: "Are you sure?",
    text:"You will not be able to recover this record!",
 
    buttons: [
      'No, cancel it!',
      'Yes, I am sure!'
    ],
    dangerMode: true,
  }).then(function(isConfirm) {
    
    if (isConfirm) {

      that.DeleteRFQ();
    }else {
      (window as any). swal("Cancelled", "this record is safe:)", "error");
    }


  });

}

Formate:string="";
Formate1:string="";
head = [['ID','CATEGORY','BRAND','MODEL','PART NO','DESC','QTY','CONDITION','MANUFACTURE']];

data:any=[];
tempdata:any=[];
PDF()
{
  debugger;
  this.head=Object.assign([],this.head)
  for(var i=0;i<this.lstRFQdetails.length;i++)
  {
    var Condition1=this.lstRFQdetails[i].Condition1+","+this.lstRFQdetails[i].Condition2+","+this.lstRFQdetails[i].Condition3
    var Manufacturer1=this.lstRFQdetails[i].Manufacturer1+","+this.lstRFQdetails[i].Manufacturer2+","+this.lstRFQdetails[i].Manufacturer3
  
    this.data=[i+1,this.lstRFQdetails[i].CategoryName,this.lstRFQdetails[i].Make,this.lstRFQdetails[i].modelno,this.lstRFQdetails[i].ItemName,
    this.lstRFQdetails[i].Description1,this.lstRFQdetails[i].Quantity,Condition1,
    Manufacturer1]
    debugger;
    this.tempdata.push(this.data);
  }
  //this.data = this.lstRFQdetails;
  this.Formate1="";
this.Formate="PDF";
}
Excel()
{
  debugger;
  this.Formate="";
  this.Formate1="Excel";
}
Download()
{
  debugger;
if(this.Formate=="PDF")
{
  this.downloadPDF();
}
if(this.Formate1=="Excel")
{
  this.exportToExcel();
}
}
exportToExcel() {
  const ws: XLSX.WorkSheet =   
  XLSX.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'FuelResultData.xlsx');
 }
//  downloadPDF(){
//   let DATA = this.epltable.nativeElement;
//   let doc = new jsPDF('l','pt', 'a4');
//   doc.fromHTML(DATA.innerHTML,15,15,{
//     'width':400,
//     // autoSize:true,
//   });
//   doc.output('dataurlnewwindow');
//  }
 downloadPDF(){
   debugger;
  // var doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text('My PDF Table', 11, 8);
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);


  //   (doc as any).autoTable({
  //     head: this.head,
  //     body: this.tempdata,
  //     theme: 'plain',
  //     didDrawCell: data => {
  //       console.log(data.column.index)
  //     }
  //   })

  //   doc.output('dataurlnewwindow')

}


edit(selectedRecord)
{
  this.EditRecNO = selectedRecord.SNO;
  debugger;

  this.CreateRFQ.patchValue({

    PRQId:selectedRecord.PRQId
    ,PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id:selectedRecord.PRQgrv_grv_grv_grv_mechknowgridview1_13_12_15_15Id
    ,ItemId:selectedRecord.ItemId
    ,ItemName:selectedRecord.ItemName
    ,Description1:selectedRecord.Description1
   
    ,Quantity:selectedRecord.Quantity
    ,Condition1:selectedRecord.Condition1
    ,Condition2:selectedRecord.Condition2

    ,Condition3:selectedRecord.Condition3
    ,Manufacturer1:selectedRecord.Manufacturer1
    ,Manufacturer2:selectedRecord.Manufacturer2
    ,Manufacturer3:selectedRecord.Manufacturer3

    ,Show:'true'
  });


var partselection1 = new Option(this.f.ItemName.value,this.f.ItemId.value.toString(), true, true);
   
(<any> $('#drpParts')).append(partselection1).trigger('change');

} 



ActivityTracker() {
  debugger;
  this.APICall.DBCalling("ViewTrackRFQ",this.StoreRFQ.prqno,"All", "", this.APICall.GetCompanyID()).subscribe(
    (res: Response) => {
      debugger;
      this.lstDbResult = JSON.parse(res['Message']);


      this.lstrackRFQ = [];
      if (this.lstDbResult.Table.length > 0) {
        this.lstrackRFQ = this.lstDbResult.Table;

      }

      $("#loaderParent").hide();
    });
}
getColor(Tracking) {
  switch (Tracking) {

    case 'RFQ Created':
      return '#0dbd6c';
    case 'RFQ Modified':
      return '#f9c402';

  }
}
ShowMessage: string = "";

SaveTrackRfq()
{
 
  debugger;
  $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
debugger;

   var xml1='<NewDataSet><Table1>'
   +'<PRQId>'+0+'</PRQId>'
   +'<SequenceNumberId>'+this.getControlValue(this.f.SequenceNumberId,'int')+'</SequenceNumberId>'
   +'<date>'+this.getControlValue(this.f.vdate,'string')+'</date>'
   +'<Vendorid>'+this.getControlValue(this.f.PartyId,'int')+'</Vendorid>'
   +'<PurchaseType>'+this.getControlValue(this.f.PurchaseType,'string')+'</PurchaseType>'
   +'<Vendorreference>'+this.getControlValue(this.f.Vendorreference,'string')+'</Vendorreference>'
   +'<Incoterms>'+this.getControlValue(this.f.Incoterms,'string')+'</Incoterms>'

   +'<prqno>'+this.f.prqno.value+'</prqno>'
   +'<TempPRQ>'+this.f.PRQId.value+'</TempPRQ>'
   
   +'<Template>'+this.getControlValue(this.f.Template,'string')+'</Template>'
   +'<PurchaseRepresentative>'+this.getControlValue(this.f.PurchaseRepresentative,'string')+'</PurchaseRepresentative>'
   +'<PaymentTerms>'+this.getControlValue(this.f.PaymentTerms,'string')+'</PaymentTerms>'
   +'<StartDate>'+this.getControlValue(this.f.StartDate,'string')+'</StartDate>'
   +'<RequiredDate>'+this.getControlValue(this.f.RequiredDate,'string')+'</RequiredDate>'
   + '<Modified>' + 1 + '</Modified>'
   + '<Message>' + this.ShowMessage + '</Message>'
   + '<statusreport>' + this.showReport + '</statusreport>'
     +'<UserName>'+this.APICall.GetUserName()+'</UserName>'
     +'<UserID>'+this.APICall.GetUserID()+'</UserID>'
     +'<ModifiedDate>'+this.ModifiedDate+'</ModifiedDate>'
     +'<CompanyId>'+this.APICall.GetCompanyID()+'</CompanyId>'
     +'<BranchId>'+this.APICall.GetBranchID()+'</BranchId>'
     +'</Table1></NewDataSet>';
     var xml2="";
     var rows="";

     for(var i=0;i<this.lstRFQdetails.length;i++)
     {
      
      rows=rows+'<Table1><ItemId>'+ this.lstRFQdetails[i].ItemId+ '</ItemId>'
     +'<description>'+this.lstRFQdetails[i].Description1+ '</description>'
     +'<Make>'+(typeof(this.lstRFQdetails[i].MakeId)=='undefined'?this.lstRFQdetails[i].MakeId:'0')+ '</Make>'
     +'<Condition1>'+this.lstRFQdetails[i].Condition1+ '</Condition1>'
     +'<Condition2>'+this.lstRFQdetails[i].Condition2+ '</Condition2>'
     +'<Condition3>'+this.lstRFQdetails[i].Condition3+ '</Condition3>'
     +'<Manufacturer1>'+this.lstRFQdetails[i].Manufacturer1+ '</Manufacturer1>'
     +'<Manufacturer2>'+this.lstRFQdetails[i].Manufacturer2+ '</Manufacturer2>'
     +'<Manufacturer3>'+this.lstRFQdetails[i].Manufacturer3+ '</Manufacturer3>'
     +'<uom>'+this.lstRFQdetails[i].uom+ '</uom>'
     +'<HSN>'+this.lstRFQdetails[i].HSN+ '</HSN>'
     
     +'<Category>'+this.lstRFQdetails[i].ItemCategoryId+ '</Category>'
     +'<Quantity>'+this.lstRFQdetails[i].Quantity+ '</Quantity>'

     +'<Model>'+(typeof(this.lstRFQdetails[i].ModelId)=='undefined'?this.lstRFQdetails[i].ModelId:'0')+ '</Model></Table1>'
    }
    xml2='<NewDataSet>'+rows+'</NewDataSet>';

   
debugger;
  this.APICall.DBCalling("SaveTrackRFQ",xml1,xml2,"","").subscribe(
    (res: Response) => {

      debugger;
      $("#loaderParent").hide();
      // this.DbResult= (res);
      this.DbResult = JSON.parse(res['Message']);

      if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {

      } else {
      }

    },

 );
  
}
Tracking1: string = "";
Tracking2: string = "";
Tracking3: string = "";
Tracking4: string = "";
Tracking5: string = "";
Tracking10: string = "";
 ToggleValue: string = "Off"
 on() {
  debugger;
  if (this.ToggleValue == "On") {
    debugger;
    this.ToggleValue = "Off";
    this.Tracking1 = "Modifiedinvalid";
  this.Tracking2 = "Modifiedinvalid";
  this.Tracking3 = "Modifiedinvalid";
  this.Tracking4 = "Modifiedinvalid";
  this.Tracking5 = "Modifiedinvalid";
    this.LoadReverseDetails();
    
  } else {
    debugger;
    this.ToggleValue = "On";
    this.LoadDetails();
  }
}
StoreLoadRFQ: StoreLoadRFQ;
LoadReverseDetails() {
  debugger;

  this.lstRFQdetails = [];

  this.DispalyVendorName = this.StoreLoadRFQ.PartyName;
  this.DisplayVendorId = this.StoreLoadRFQ.PartyId;

  this.CreateRFQ.patchValue(this.StoreLoadRFQ);
  debugger;

  this.lstRFQdetails = this.StoreLoadRFQ.lstRFQdetails;


  this.store.dispatch(new TabStore.AddTab(this.StoreRFQ));
}
LoadDetails() {
  debugger;
  this.StoreLoadRFQ = new StoreLoadRFQ;
  this.StoreLoadRFQ.SequenceNumberId=this.StoreRFQ.SequenceNumberId;
  this.StoreLoadRFQ.PartyName=this.StoreRFQ.PartyName;
  this.StoreLoadRFQ.prqno=this.StoreRFQ.prqno;
  this.StoreLoadRFQ.PartyId=this.StoreRFQ.PartyId;
  this.StoreLoadRFQ.SequenceNumberId=this.StoreRFQ.SequenceNumberId;
  this.StoreLoadRFQ.PurchaseType=this.StoreRFQ.PurchaseType;
  this.StoreLoadRFQ.Vendorreference=this.StoreRFQ.Vendorreference;
  this.StoreLoadRFQ.vdate=this.StoreRFQ.vdate;
  this.StoreLoadRFQ.Incoterms=this.StoreRFQ.Incoterms;
  this.StoreLoadRFQ.PaymentTerms=this.StoreRFQ.PaymentTerms;
  this.StoreLoadRFQ.StartDate=this.StoreRFQ.StartDate;
  this.StoreLoadRFQ.RequiredDate=this.StoreRFQ.RequiredDate;


  this.StoreLoadRFQ.ModifiedDate = (this.StoreRFQ.ModifiedDate == null ? '' : this.StoreRFQ.ModifiedDate.toString());

  this.StoreLoadRFQ.lstRFQdetails = this.lstRFQdetails;


  this.store.dispatch(new TabStore.AddTab(this.StoreLoadRFQ));
  this.ClearViewData1();

}
ClearViewData1() {
  debugger;
  this.submitted = false;
  this.ModifiedDate = "";
  this.CreateRFQ.patchValue(


    {
      PRQId:0,
      PartyName:'',
      ItemId:0,
      uom:'',
      HSN:'',
      SequenceNumberId:0,
      Description1:'',
      Make:'',
      MakeId:'',
      ItemCategoryId:0,
      CategoryName:'',
      ItemName:'',
      RequiredDate:'',
      PartyId:0,
      StartDate:'',
      Vendorreference:'',
      vdate:'',
      Incoterms:'',
      Template:'',
      PurchaseRepresentative:'',
      PurchaseType:'',
      PaymentTerms:'',
      ModelId:'',
      LineChanges: '',
      modelno:'',
      Quantity:0,
      Condition1:'',
      Condition2:'',
      Condition3:'',
      Manufacturer1:'',
      Manufacturer2:'',
      Manufacturer3:''

    }
  );

  // this.f.TransactionTime.setValue(this.CurrentTime);

  var rdate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  $("#RequiredDate").val(rdate)
  $("#StartDate").val(rdate)
  //$("#TransactionTime").val(this.CurrentTime)
  this.lstRFQdetails = null;
  this.lstRFQdetails = [];

  this.DisplayVendorId = 0;
  this.DispalyVendorName = "";
  this.DisplaySequenceNumberId = 0;
  
}
lstrackRFQ:any=[];
Showdata(d) {
  if (this.ToggleValue == "Off") {
    (window as any).swal({
      icon: 'warning',
      title: 'Acitivity Tracker',
      text: 'If you want to see data mustly Traker should be "ON" Otherwise you loss the modified details',
      confirmButtonText: 'Dismiss',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-warning'
    });
  }
  else {
    var xml = d;
    this.ClearViewData1();
    this.StoreRFQ = new StoreRFQ;
    debugger;
    this.lstRFQdetails = [];
    this.DispalyVendorName = xml.vendorname;
    this.DisplayVendorId = xml.Vendorid;
    this.StoreRFQ.SequenceNumberId=xml.SequenceNumberId;
    this.StoreRFQ.PartyName=xml.vendorname;
    this.StoreRFQ.prqno=xml.prqno;
    this.StoreRFQ.SequenceNumberId=xml.SequenceNumberId;
    this.StoreRFQ.PurchaseType=xml.PurchaseType;
    this.StoreRFQ.Vendorreference=xml.Vendorreference;
    this.StoreRFQ.vdate=xml.vdate;
    this.StoreRFQ.Incoterms=xml.Incoterms;
    this.StoreRFQ.PaymentTerms=xml.PaymentTerms;
    this.StoreRFQ.PRQId=xml.PRQId;
    this.StoreRFQ.PartyId=xml.Vendorid;
    this.StoreRFQ.createdby=xml.createdby;
    
    this.StoreRFQ.StartDate=xml.StartDate;
    this.StoreRFQ.RequiredDate=xml.RequiredDate;
    this.StoreRFQ.lstRFQdetails=this.lstRFQdetails;
    this.StoreRFQ.ViewName='PRQ';
    this.StoreRFQ.ModifiedDate = (xml.ModifiedDate == null ? '' : xml.ModifiedDate.toString());
  //  this.StoreRFQ.ViewName = xml.ViewName;


    // if (xml.lstRFQdetails != null && typeof (xml.lstRFQdetails) != undefined) {
    //   var res = ((xml.lstRFQdetails).replace(/\n/g, "")).replace(/'/g, "\"");

    //   this.StoreRFQ.lstRFQdetails = JSON.parse(res);
    //   var templstarray=this.StoreRFQ.lstRFQdetails;
    //   this.lstRFQdetails = this.StoreRFQ.lstRFQdetails;
    // }

    
   

 
debugger;
    //this.f.TransactionNo.setValue(xml.TransactionNo);
    this.CreateRFQ.patchValue(this.StoreRFQ);
    debugger;
    for (var i = 0; i < this.lstrackRFQ.length; i++) {
      if(this.lstrackRFQ[i].PRQId == xml.PRQId)
      {
        if(xml.lstRFQdetails!=null)
        {
          debugger;
          for(var j=i-1;j<this.lstrackRFQ.length; j++)
          {
            if(j!=-1)
            {
             
                if(this.lstrackRFQ[j].lstRFQdetails!=null)
                {
                  var res = ((this.lstrackRFQ[i].lstRFQdetails).replace(/\n/g, "")).replace(/'/g, "\"");
                  var temparray = JSON.parse(res);
                  this.getColor10(temparray[0].Partno);
                  this.Tracking10 = temparray[0].Partno;
                  
                }
                else{
                  var res = ((this.lstrackRFQ[i].lstRFQdetails).replace(/\n/g, "")).replace(/'/g, "\"");
                  var temparray = JSON.parse(res);
                  this.getColor10(temparray[0].Partno);
                  this.Tracking10 = temparray[0].Partno;
                }
              
            }
            
            break;
          }
        }
        else{
          this.getColor10("Modifiedinvalid");
          this.Tracking10 = "Modifiedinvalid";
        }
      }
    }
      for (var i = 0; i < this.lstrackRFQ.length; i++) {
        if(this.lstrackRFQ[0].PRQId == xml.PRQId)
        { 
          let sortedInvoiceitems = this.lstRFQdetails.sort((first, second) => 0 - (first.LineId > second.LineId ? -1 : 1));
          this.lstRFQdetails=sortedInvoiceitems;
   
          break;
        }
        else
        if (this.lstrackRFQ[i].PRQId != xml.PRQId) {
          debugger;
          if (this.lstrackRFQ[i].lstRFQdetails != null && typeof (this.lstrackRFQ[i].lstRFQdetails) != undefined) {
            debugger;
            var res = ((this.lstrackRFQ[i].lstRFQdetails).replace(/\n/g, "")).replace(/'/g, "\"");

            var temparray = JSON.parse(res);
            this.lstRFQdetails.push(temparray[0]);
          }

        }
        else {
          let sortedInvoiceitems = this.lstRFQdetails.sort((first, second) => 0 - (first.LineId > second.LineId ? -1 : 1));
          this.lstRFQdetails=sortedInvoiceitems;
          break;
        }

      }
    
     

   
  
    debugger;
    for (var i = 0; i < this.lstrackRFQ.length; i++) {
      if (this.lstrackRFQ[i].PRQId == xml.PRQId) {
        debugger;
        for (var j = i - 1; j < this.lstrackRFQ.length; j++) {
          if (this.lstrackRFQ[j].Vendorreference == this.f.Vendorreference.value &&
            this.lstrackRFQ[j].vdate == this.f.vdate.value && this.lstrackRFQ[j].Incoterms == this.f.Incoterms.value &&
            this.lstrackRFQ[j].PurchaseType == this.f.PurchaseType.value) {
            debugger;
          }
          else {
            debugger;
           

            if (this.lstrackRFQ[j].Vendorreference != this.f.Vendorreference.value) {
              debugger;
              this.getColor2("Modifiedvalid");
              this.Tracking2 = "Modifiedvalid";
            }
            else {
              this.getColor2("Modifiedinvalid");
              this.Tracking2 = "Modifiedinvalid";
            }

            if (this.lstrackRFQ[j].vdate != this.f.vdate.value) {
              debugger;
              this.getColor3("Modifiedvalid");
              this.Tracking3 = "Modifiedvalid";
            }
            else {
              this.getColor3("Modifiedinvalid");
              this.Tracking3 = "Modifiedinvalid";
            }
            if (this.lstrackRFQ[j].Incoterms != this.f.Incoterms.value) {
              debugger;
              this.getColor4("Modifiedvalid");
              this.Tracking4 = "Modifiedvalid";
            }
            else {
              this.getColor4("Modifiedinvalid");
              this.Tracking4 = "Modifiedinvalid";
            }
            if (this.lstrackRFQ[j].PurchaseType != this.f.PurchaseType.value) {
              debugger;
              this.getColor5("Modifiedvalid");
              this.Tracking5 = "Modifiedvalid";
            }
            else {
              this.getColor5("Modifiedinvalid");
              this.Tracking5 = "Modifiedinvalid";
            }

          }
          break;
        }

      }

    }

  }
}
getColor10(Tracking10) {

  switch (Tracking10) {

    case this.Tracking10:
      return '#bdd763';
    case 'Modifiedinvalid':
      return 'transparent';
  }
}

getColor2(Tracking2) {
  
  switch (Tracking2) {

    case 'Modifiedvalid':
      return '#f9c40240';
    case 'Modifiedinvalid':
      return 'transparent';

  }
}
getColor3(Tracking3) {

  switch (Tracking3) {

    case 'Modifiedvalid':
      return '#f9c40240';
    case 'Modifiedinvalid':
      return 'transparent';

  }
}
getColor4(Tracking4) {

  switch (Tracking4) {

    case 'Modifiedvalid':
      return '#f9c40240';
    case 'Modifiedinvalid':
      return 'transparent';

  }
}
getColor5(Tracking5) {

  switch (Tracking5) {

    case 'Modifiedvalid':
      return '#f9c40240';
    case 'Modifiedinvalid':
      return 'transparent';

  }
}
}
