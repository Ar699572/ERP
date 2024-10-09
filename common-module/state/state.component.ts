import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { city } from 'src/app/store/city';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/State';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
@Component({
  selector: 'app-State',
  templateUrl: './State.component.html',
  styleUrls: ['./State.component.css']
})
export class StateComponent implements OnInit {

  
  State:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.State=formBuilder.group(
  
      {
    
       
        Statename:new FormControl(''),
    SearchString:new FormControl('')
      });
      this.ViewandSearchState();
   }






StoreState: State;
  XmlEdit="";
  EditState(xml) {
  
    debugger;

    this.StoreState=new State;
    this.StoreState.Statename=xml.Statename;

    this.StoreState.statecode=xml.statecode;
    this.StoreState.StateId=xml.StateId
    this.StoreState.country=xml.country

    this.StoreState.notes=xml.notes
    
    this.StoreState.countryname=xml.SelectedCountryName
   // this.DisplayCountryId==xml.country
    this.StoreState.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());


this.APICall.SetViewData(xml);
this.APICall.UpdatedSelectedPath('./Common/CreateState');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreState.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreState));
this.router.navigate(['Common/CreateState']);

  
  }
  Storecity: city;
  EditCity(xml) {
  
    debugger;
  

    
    this.Storecity=new city;
   
    this.Storecity.country=xml.country;
    this.Storecity.countryname=xml.countryname;
    this.Storecity.state=xml.StateId;
    this.Storecity.statename=xml.Statename;

   // this.DisplayCountryId==xml.country
    this.Storecity.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());

    this.APICall.OpenPageFromRefernce('City','./Common/CreateCity','Common')
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.Storecity.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.Storecity));
    this.router.navigate(['Common/CreateCity']);


  }
  ViewCity(xml) {
 
    this.Storecity=new city;

    this.Storecity.country=xml.country;
    this.Storecity.countryname=xml.countryname;
    this.Storecity.state=xml.StateId;
    this.Storecity.statename=xml.Statename;
  // this.router.navigateByUrl('/Sales/SalesOrder', { state: { ReferenceNo:xml.TransactionNo,ReferenceType:'SalesQuotation'} });
  this.APICall.OpenPageFromRefernce('City','./Common/City','Common')
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.Storecity.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.Storecity));
  this.router.navigate(['Common/City']);
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



  this.StoreState=new State;
  this.APICall.UpdatedSelectedPath('./Common/CreateState');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreState.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreState));



  this.router.navigate(['Common/CreateState']);




}

   get f() { 
     return this.State
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')

this.StoreState=new State;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreState=( result[0] );

 
  this.ViewandSearchState();

}else{

  this.ViewandSearchState();
}
  }

ngAfterViewInit(){


     
    
  }


  lstState:any=[];
  lstDbResult:any  = [];
  ViewandSearchState()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewState",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstState=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstState=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchState();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var Statename=this.getControlValue(this.f.Statename,"string");
  var StatenameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="Statename")
    {
      StatenameDBField=this.lstSerchableFields[i].DBField;
    }

   


    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
      

        
        if(Statename!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+StatenameDBField+" Like'"+Statename+"%'"):(StatenameDBField+" Like'"+Statename+"%'");
        }


      }
      else{
       
       
        if(Statename!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+StatenameDBField+" ='"+Statename+"'"):(StatenameDBField+" ='"+Statename+"'");
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
