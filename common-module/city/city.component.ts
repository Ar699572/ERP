import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { city } from 'src/app/store/city';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    // $('.canceldashboard').attr('id','content')
    this.city=formBuilder.group(
  
      {
    
       Cityname:new FormControl(''),
       
    SearchString:new FormControl('')
      });
      this.ViewandSearchcity();
   }


   



   Storecity: city;

  XmlEdit="";
  EditCities(xml) {
  
    debugger;
    this.Storecity=new city;



this.APICall.SetViewData(xml);

this.APICall.UpdatedSelectedPath('./Common/CreateCity');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.Storecity.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.Storecity));
this.router.navigate(['Common/CreateCity']);



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

  this.Storecity=new city;
  this.APICall.UpdatedSelectedPath('./Common/CreateCity');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.Storecity.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.Storecity));

  this.router.navigate(['Common/CreateCity']);
  

  

}

   get f() { 
     return this.city
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.Storecity=new city;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.Storecity=( result[0] );

 
  this.ViewandSearchcity();

}else{

  this.ViewandSearchcity();
}
  }

ngAfterViewInit(){

   
     
    
  }


  lstCity:any=[];
  lstDbResult:any  = [];
  ViewandSearchcity()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("Viewcity",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstCity=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstCity=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchcity();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var Cityname=this.getControlValue(this.f.Cityname,"string");
  var CitynameDBField="";
  

 
  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="Cityname")
    {
      CitynameDBField=this.lstSerchableFields[i].DBField;
    }
    

   



    
  }
debugger;
      if(this.SerchType=='Like')
      {

 
        
        if(Cityname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CitynameDBField+" Like'"+Cityname+"%'"):(CitynameDBField+" Like'"+Cityname+"%'");
        }
        


      }
      else{
       
       
       

        if(Cityname!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CitynameDBField+" ='"+Cityname+"'"):(CitynameDBField+" ='"+Cityname+"'");
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

