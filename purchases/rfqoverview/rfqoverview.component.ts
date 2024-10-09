import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Currency } from 'src/app/store/Currency';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { StoreRFQ } from 'src/app/store/StoreRFQ';
import { PurchaseQuotation } from 'src/app/Store/StorePurchaseQuotation';
@Component({
  selector: 'app-rfqoverview',
  templateUrl: './rfqoverview.component.html',
  styleUrls: ['./rfqoverview.component.css']
})
export class RFQOverviewComponent implements OnInit {

  RFQoverview:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.RFQoverview=formBuilder.group(
  
      {
       
      
        SearchString:new FormControl(''),
      });
      this.ViewandSearchRFQ();
   }
   get f() { 
    return this.RFQoverview.controls;
  }
  SearchClick()

{

}
SerchTypeChange(e){

}
FilterTypeChange(e)
{

}
FilterType:string="";
SerchType:string="";
  ngOnInit() {
  }
  lstDbResult:any=[];
  lstRFQ:any=[];
  ViewandSearchRFQ()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=this.f.SearchString.value;
     debugger;
      this.APICall.DBCalling("ViewRFQ",sstring,"All","",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstRFQ=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstRFQ=this.lstDbResult.Table;
      

          }

          $("#loaderParent").hide();
        });
  }

  OnAdd(){
    this.router.navigate(['Purchase/CreateRFQ']);
  }
  StoreRFQ: StoreRFQ;
  
  Edit(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StoreRFQ=new StoreRFQ;

var date=xml.date;
this.StoreRFQ.date=xml.date;

this.StoreRFQ.PRQId= xml.PRQId;

this.StoreRFQ.CompanyId=xml.CompanyId;
this.StoreRFQ.prqno=xml.prqno;
this.StoreRFQ.PartyId=xml.Vendorid;
this.StoreRFQ.PurchaseType=xml.PurchaseType;
this.StoreRFQ.Vendorreference=xml.Vendorreference;
this.StoreRFQ.Incoterms=xml.Incoterms;
this.StoreRFQ.Template=xml.Template;
this.StoreRFQ.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StoreRFQ.PaymentTerms=xml.PaymentTerms;
this.StoreRFQ.StartDate=xml.StartDate;
this.StoreRFQ.RequiredDate=xml.RequiredDate;

this.StoreRFQ.PartyName=xml.vendorname ;


this.StoreRFQ.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StoreRFQ.ViewName=xml.ViewName;


if(xml.lstRFQ1!=null && typeof(xml.lstRFQ1)!=undefined)
   {
   var res=((xml.lstRFQ1).replace(/\n/g, "")).replace(/'/g,"\"");
   
   this.StoreRFQ.lstRFQdetails=JSON.parse(res);
   
   }



  
this.APICall.UpdatedSelectedPath('./Purchase/CreateRFQ');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreRFQ.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreRFQ));
    this.router.navigate(['Purchase/CreateRFQ']);
  }
  temparray:any=[];
  temparray1:any=[];
  StorePurchaseQuotation: PurchaseQuotation;
  CreateQuotation(xml) {
  
    debugger;
//this.APICall.SetViewData(xml);


this.StorePurchaseQuotation=new PurchaseQuotation;


this.StorePurchaseQuotation.SequenceNumberId=xml.SequenceNumberId;

this.StorePurchaseQuotation.RequiredDate=xml.RequiredDate;

this.StorePurchaseQuotation.PartyId=xml.Vendorid;
this.StorePurchaseQuotation.PartyName=xml.vendorname;
this.StorePurchaseQuotation.Vendorreference=xml.Vendorreference;
this.StorePurchaseQuotation.PaymentTerms=xml.PaymentTerms;
this.StorePurchaseQuotation.vdate=xml.date;
this.StorePurchaseQuotation.Incoterms=xml.Incoterms;
this.StorePurchaseQuotation.PurchaseRepresentative=xml.PurchaseRepresentative;
this.StorePurchaseQuotation.PurchaseType=xml.PurchaseType;
this.StorePurchaseQuotation.StartDate=xml.StartDate;
this.StorePurchaseQuotation.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.StorePurchaseQuotation.ViewName=xml.ViewName;


if(xml.lstRFQ1!=null && typeof(xml.lstRFQ1)!=undefined)
   {
   var res=((xml.lstRFQ1).replace(/\n/g, "")).replace(/'/g,"\"");
   var tempres=JSON.parse(res);
   this.temparray=tempres;
   for(var i=0;i<this.temparray.length;i++)
   {
   var res1=
       ({
        SNO:this.temparray.length+1
        ,LineId:'0'
       ,Description:this.temparray[i].Description1
        
        ,Partno:this.temparray[i].ItemName
        ,ItemId:this.temparray[i].ItemId
        ,MakeId:0
        ,UOMId:(+this.temparray[i].uom)
        ,Make:""
        ,UOM:this.temparray[i].UOMName
        
        ,Rate:0
        ,Qty:(+this.temparray[i].Quantity)
        ,CurrencyRate:0
        
        
        ,Gross:0
        ,DiscountPercentage:0
        ,DiscountAmount:0
        
        
        
        ,CGST:0
        ,CGSTAmount	:0
        ,SGST:0
        
        
        
        
        ,SGSTAmount:0
        ,IGST:0
        ,IGSTAmount:0
        
        
        
        ,TotalTax:0
        ,NetTotal:0
        
        ,TaxType:0
        
        
        
        ,HSN:this.temparray[i].HSN


     
       ,Show:'true'
       });

       this.StorePurchaseQuotation.lstQuotationItems.push(res1);
      }
   
   
   
   }

if(xml.lstTermsChild!=null && typeof(xml.lstTermsChild)!=undefined)
   {
   var res=((xml.lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
   
   var tempres=JSON.parse(res);
   this.temparray1=tempres;
   for(var i=0;i<this.temparray1.length;i++)
   {
   var res2=
       ({
        SNO:this.temparray1.length+1
        ,LineId:'0'
       ,Description:this.temparray1[i].Description1
        
        ,Partno:this.temparray1[i].ItemName
        ,ItemId:this.temparray1[i].ItemCategoryId
        ,MakeId:0
        ,UOMId:0
        ,Make:""
        ,UOM:""
        
        ,Rate:0
        ,Qty:(+this.temparray1[i].Quantity)
        ,CurrencyRate:0
        
        
        ,Gross:0
        ,DiscountPercentage:0
        ,DiscountAmount:0
        
        
        
        ,CGST:0
        ,CGSTAmount	:0
        ,SGST:0
        
        
        
        
        ,SGSTAmount:0
        ,IGST:0
        ,IGSTAmount:0
        
        
        
        ,TotalTax:0
        ,NetTotal:0
        
        ,TaxType:0
        
        
        
        ,HSN:""


     
       ,Show:'true'
       });
       this.StorePurchaseQuotation.lstTermsChild.push(res2);
      }

   
   }

   this.APICall.OpenPageFromRefernce('PurchaseQuotation','./Purchase/CreatePurchaseQuotation','Purchase')
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StorePurchaseQuotation.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StorePurchaseQuotation));
   this.router.navigate(['Purchase/CreatePurchaseQuotation']);


  }

}
