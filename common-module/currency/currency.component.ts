import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Currency } from 'src/app/store/Currency';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  Currency:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Currency=formBuilder.group(
  
      {
       
        Currencyname:new FormControl(''),
    SearchString:new FormControl('')
      });
      this.ViewandSearchCurrency();
   }


  



   StoreCurrency: Currency;
  XmlEdit="";
  CreateCurrency(xml) {
  
    debugger;

 
this.APICall.SetViewData(xml);

this.APICall.UpdatedSelectedPath('./Common/CreateCurrency');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreCurrency.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreCurrency));


    this.router.navigate(['Common/CreateCurrency']);
  }

   
//#region "ShortCuts"
@HostListener('window:keydown', ['$event'])


keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.ctrlKey || event.metaKey) {
    
   switch (String.fromCharCode(event.which).toLowerCase()) {
   

       case 'a':
        
         event.preventDefault();
       this.OnAdd();
       
         break;
         

   }
 }
 
}
//#endregion "ShortCuts"
 


OnAdd()
{

    
  this.StoreCurrency=new Currency;
  this.APICall.UpdatedSelectedPath('./Common/CreateCurrency');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreCurrency.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreCurrency));




  this.router.navigate(['Common/CreateCurrency']);


 
}

   get f() { 
     return this.Currency
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreCurrency=new Currency;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreCurrency=( result[0] );

 
  this.ViewandSearchCurrency();

}else{

  this.ViewandSearchCurrency();
}
  }

ngAfterViewInit(){

   
     
    
  }


  lstCurrency:any=[];
  lstDbResult:any  = [];
  ViewandSearchCurrency()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewCurrency",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstCurrency=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstCurrency=this.lstDbResult.Table;
      
  
            
            if(this.lstSerchableFields.length==0)
            {


          var    stringDbFld=this.lstDbResult.Table[0].SerchableFields
             var parser = new DOMParser();
             var xmlDoc = parser.parseFromString(stringDbFld,"text/xml");
            
            var sizex = xmlDoc.getElementsByTagName("ControlName");
            
            for (var i = 0 ; i < sizex.length ; i++) {
            

          
            this.lstSerchableFields.push(
              

              ( { 
                ControlName:xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue
                
                ,DBField:xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue
                
                })

            );
            }
            }
          }

          $("#loaderParent").hide();
        });
  }


  //#region "getControlValue"
  getControlValue(Control,Type):string
  {
  
   var Value=(Type=="string"?"":"0");
    if(typeof(Control)!=undefined &&  Control.value!=null  &&   Control.value!="" )
    {
      Value=Control.value;
    }
  
    return Value;
  }
//#endregion "getControlValue"

  //#region "SearchPanelLogic"


  SearchClick()
  {
    this.ViewandSearchCurrency();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
 
  var Currencyname=this.getControlValue(this.f.Currencyname,"string");
  var CurrencynameDBField="";
  

 

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {
    
    if(this.lstSerchableFields[i].ControlName=="Currencyname")
    {
      CurrencynameDBField=this.lstSerchableFields[i].DBField;
    }

    



    
  }
debugger;
      if(this.SerchType=='Like')
      {

         
      
        
        if(Currencyname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CurrencynameDBField+" Like'"+Currencyname+"%'"):(CurrencynameDBField+" Like'"+Currencyname+"%'");
        }


      }
      else{
      
        if(Currencyname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CurrencynameDBField+" ='"+Currencyname+"'"):(CurrencynameDBField+" ='"+Currencyname+"'");
        }
      }
    }
      return FldSerchString;
    }
FilterType='All'
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
    SearchString=  this.getControlValue(this.f.SearchString,"string")
  }
  return SearchString;
}
FilterTypeChange(event)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  
    if(this.SerchType=='Like' && event.target.checked==true)
     {
    this.FilterType=(event.target.checked==true?'All':'Field');
     }else
     {
       
      event.target.checked=false;
      this.FilterType='Field';
    
     }
  }

  SerchType='Like'
  SerchTypeChange(ChangedValue)
  {
    if(AppSettings.ExicuteDebugger)
    {
    debugger;
    }
  

    if(ChangedValue==false)
    {
      this.SerchType='Equal'
      if(this.FilterType=='All')
      $('#customSwitch').trigger('click');
     
    }else{
      this.SerchType='Like'
    }
  }

  //#endregion "SearchPanelLogic"
  
}
