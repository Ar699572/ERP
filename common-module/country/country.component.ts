import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { State } from 'src/app/store/State';
import { Country } from 'src/app/store/Coutry';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  Countries:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Countries=formBuilder.group(
  
      {
    
        countrycode:new FormControl(''),
        countryname:new FormControl(''),
    SearchString:new FormControl('')
      });
    //  this.ViewandSearchCountries();
   }





   StoreCountry: Country;
  



  XmlEdit="";
  EditCountry(xml) {
  
    debugger;


    this.StoreCountry=new Country;
    this.StoreCountry.countrycode=xml.countrycode;
    this.StoreCountry.countryname=xml.countryname;
    this.StoreCountry.CountryId=xml.CountryId.toString();
     this.StoreCountry.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
     this.StoreCountry.submitted=xml.submitted;
  
   

   this.APICall.UpdatedSelectedPath('./Common/CreateCountry');
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreCountry.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreCountry));
       this.router.navigate(['Common/CreateCountry']);


this.APICall.SetViewData(xml);

  }
  StoreState: State;
  CreateState(xml) {
  
    debugger;
  

    this.StoreState=new State;
   
    this.StoreState.country=xml.CountryId;

   
    
    this.StoreState.countryname=xml.countryname;
   // this.DisplayCountryId==xml.country
    this.StoreState.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());

    this.APICall.OpenPageFromRefernce('State','./Common/CreateState','Common')
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreState.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreState));
    this.router.navigate(['Common/CreateState']);


  }
  ViewState(xml) {
 
    this.StoreState=new State;

      this.StoreState.country=xml.CountryId;
      this.StoreState.countryname=xml.countryname;
   
  // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
  this.APICall.OpenPageFromRefernce('State','./Common/State','Common')
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreState.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreState));
  this.router.navigate(['Common/State']);
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
  this.StoreCountry=new Country;
  this.APICall.UpdatedSelectedPath('./Common/CreateCountry');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreCountry.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreCountry));



  this.router.navigate(['Common/CreateCountry']);
}

   get f() { 
     return this.Countries
    .controls;
   }
  DeviceType="";
  ngOnInit() {
    debugger;
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreCountry=new Country;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreCountry=( result[0] );

 
  this.ViewandSearchCountries();

}else{

  this.ViewandSearchCountries();
}


  }

ngAfterViewInit(){

   
     
    
  }


  lstCountries:any=[];
  lstDbResult:any  = [];
  ViewandSearchCountries()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewCountries",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstCountries=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstCountries=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchCountries();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var countryname=this.getControlValue(this.f.countryname,"string");
  var countrynameDBField="";
  

  var countrycode=this.getControlValue(this.f.countrycode,"string");
  var countrycodeDBField="";

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="countryname")
    {
      countrynameDBField=this.lstSerchableFields[i].DBField;
    }

    if(this.lstSerchableFields[i].ControlName=="countrycode")
    {
      countrycodeDBField=this.lstSerchableFields[i].DBField;
    }



    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
        if(countrycode!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+countrycodeDBField+" Like'"+countrycode+"%'"):(countrycodeDBField+" Like'"+countrycode+"%'");
        }

        
        if(countryname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+countrynameDBField+" Like'"+countryname+"%'"):(countrynameDBField+" Like'"+countryname+"%'");
        }


      }
      else{
       
        if(countrycode!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+countrycodeDBField+" ='"+countrycode+"'"):(countrycodeDBField+" ='"+countrycode+"'");
        }

        if(countryname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+countrynameDBField+" ='"+countryname+"'"):(countrynameDBField+" ='"+countryname+"'");
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
