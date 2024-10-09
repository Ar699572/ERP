import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APICallingService } from 'src/app/apicalling.service';
import { PaymentsTerms } from 'src/app/store/PaymentsTerms';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";

@Component({
  selector: 'app-payments-terms',
  templateUrl: './payments-terms.component.html',
  styleUrls: ['./payments-terms.component.css']
})
export class PaymentsTermsComponent implements OnInit {
  PaymentTerms:FormGroup
  constructor(private router:Router ,private fb:FormBuilder,private APICall:APICallingService ,private store: Store<any>) {
    this.PaymentTerms=this.fb.group({
      Notes:new FormControl(''),
      TermName:new FormControl(''),
      SearchString:new FormControl('')
    })
   }
   
   DeviceType=''
  ngOnInit() {
    this.DeviceType= localStorage.getItem('DeviceType')
this.StorePaymentsTerms=new PaymentsTerms;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
if (result.length > 0) {
  this.StorePaymentsTerms=( result[0] );
  
  this.ViewandSearch();

}
   
  }

  get f(){
return this.PaymentTerms.controls;
  }
  SerchType='Like';
  getControlValue(Control,Type):string
  {
  
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }

  PrepareSerchStringByField():string{
debugger;
  
    var FldSerchString="";
    if(this.lstSerchableFields.length>0)
    {
   
    var TermName=this.getControlValue(this.f.TermName,"string");
    var TermNameDBField ="";
    
  
    var Notes =this.getControlValue(this.f.Notes,"string");
    var NotesDBField="";
  
    for(var i=0;i< this.lstSerchableFields.length;i++)
    {
  
      
      if(this.lstSerchableFields[i].ControlName=="TermName")
      {
        TermNameDBField=this.lstSerchableFields[i].DBField;
      }
  
      if(this.lstSerchableFields[i].ControlName=="Notes")
      {
        NotesDBField=this.lstSerchableFields[i].DBField;
      }

    }
  debugger;
        if(this.SerchType=='Like')
        {
  
          
          if(TermName!="")
          {
            FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+TermNameDBField+" Like'"+TermName+"%'"):(TermNameDBField+" Like'"+TermName+"%'");
          }
  
          
          if(Notes!="")
          {
            FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+NotesDBField+" Like'"+Notes+"%'"):(NotesDBField+" Like'"+Notes+"%'");
          }
  
  
        }
        else{
         
          if(TermName!="")
          {
            FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+TermNameDBField+" ='"+TermName+"'"):(TermNameDBField+" ='"+TermName+"'");
          }
  
          if(Notes!="")
          {
            FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+NotesDBField+" ='"+Notes+"'"):(NotesDBField+" ='"+Notes+"'");
          }
        }
      }
        return FldSerchString;
      }
  
  GetSearchString():string
  {
    debugger;
    var  SearchString="";
    if(this.FilterType !='All')
    {
      SearchString=this.PrepareSerchStringByField();
    }
    else
    {
      SearchString=  this.getControlValue(this.f.SearchString.value,"string")
    }
    return SearchString;
  }

  FilterType='ALL';
  lstDbResult:any=[];
  lstPaymentsTerms:any=[];
  lstSerchableFields:any  = [];
  ViewandSearch()
  {
debugger;
   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-bSalesInvoice'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
     
     
     debugger;
     var sstring=this.GetSearchString();
     if(sstring==''){
      sstring=this.f.SearchString.value;
     }
      this.APICall.DBCalling("PaymentsTermsView",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstPaymentsTerms=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstPaymentsTerms=this.lstDbResult.Table;
            debugger;
            if(this.lstSerchableFields.length==0)
            {
          var    stringDbFld=this.lstDbResult.Table[0].SerchableFields
             var parser = new DOMParser();
             var xmlDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = xmlDoc.getElementsByTagName("ControlName");
            }
          
            }
          })

        
       
  }

  SearchClick(){
    this.ViewandSearch();
  }
  StorePaymentsTerms:PaymentsTerms
  XmlEdit="";
  Edit(xml) {
  
    debugger;

this.StorePaymentsTerms=new PaymentsTerms;
this.StorePaymentsTerms.TermName=xml.TermsName;
this.StorePaymentsTerms.Description= xml.Notes;
this.StorePaymentsTerms.ModifiedBy= xml.ModifiedBy;
this.StorePaymentsTerms.ModifiedDate= xml.ModifiedDate;
this.StorePaymentsTerms.BranchId=xml.BranchId;
this.StorePaymentsTerms.CompanyId=xml.CompanyId;
this.StorePaymentsTerms.TermsId=xml.TermsId;

if(xml.lstPaymentsTerm!=null && typeof(xml.lstPaymentsTerm)!=undefined)
   {
     try{
   var res=((xml.lstPaymentsTerm).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StorePaymentsTerms.lstPaymentsTerms=JSON.parse(res);
 
  for(var i=0;i < this.StorePaymentsTerms.lstPaymentsTerms.length ;i++){
    debugger;
    this.StorePaymentsTerms.lstPaymentsTerms[i].Paypercentage = Math.floor(this.StorePaymentsTerms.lstPaymentsTerms[i].Paypercentage)
  }
  this.StorePaymentsTerms.lstPaymentsTerms=this.StorePaymentsTerms.lstPaymentsTerms;
     }
     catch(error)
     {}
   }
this.store.dispatch(new  TabStore.AddTab(this.StorePaymentsTerms));
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePaymentsTerms.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePaymentsTerms));
    this.router.navigate(['Common/CreatepaymentTerms']);
  }
  OnAdd(){
    debugger;
    this.StorePaymentsTerms=new PaymentsTerms;
  this.APICall.UpdatedSelectedPath('./Common/CreatepaymentTerms');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StorePaymentsTerms.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StorePaymentsTerms));
this.router.navigate(['Common/CreatepaymentTerms']);
  }

  FilterTypeChange(event)
  {

  }
  SerchTypeChange(value)
  {}
}
