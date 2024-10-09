  import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Transport } from 'src/app/store/Transport';
import { Store } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  Transport:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Transport=formBuilder.group(
  
      {
    
        Transportername:new FormControl(''),
       
    SearchString:new FormControl('')
      });
      this.ViewandSearchTransporter();
   }


   UpdatedSelectedPath(strUrl)
   {
   debugger;
     var ApplicationLivePagesLocal=  JSON.parse(localStorage.getItem("ApplicationLivePages"));
      
   if(ApplicationLivePagesLocal!=null &&  ApplicationLivePagesLocal.length>0  )
   {
         for(let i=0;i<ApplicationLivePagesLocal.length;i++)
         {
         if(ApplicationLivePagesLocal[i]._IsActive==true)
         {
           ApplicationLivePagesLocal[i]._Url=strUrl;
   //this.ApplicationLivePages=ApplicationLivePagesLocal;
   
           localStorage.setItem("ApplicationLivePages",JSON.stringify(ApplicationLivePagesLocal));
         
           break;
         }
   
   
   }
   }
   }



   StoreTransport: Transport;

  XmlEdit="";
  EditTransport(xml) {
  
    debugger;

    this.StoreTransport=new Transport;
    this.StoreTransport.Transportername=xml.Transportername.toString();
    this.StoreTransport.area=xml.area.toString();

    this.StoreTransport.notes=xml.notes.toString();


    this.StoreTransport.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());
this.APICall.SetViewData(xml);

this.APICall.UpdatedSelectedPath('./Common/CreateTransport');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreTransport.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreTransport));

    this.router.navigate(['Common/CreateTransport']);
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


  this.StoreTransport=new Transport;
  this.APICall.UpdatedSelectedPath('./Common/CreateTransport');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreTransport.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreTransport));


  this.router.navigate(['Common/CreateTransport']);
}

   get f() { 
     return this.Transport
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreTransport=new Transport;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreTransport=( result[0] );

 
  this.ViewandSearchTransporter();

}else{

  this.ViewandSearchTransporter();
}

  }

ngAfterViewInit(){

   
     
    
  }


  lstTransport:any=[];
  lstDbResult:any  = [];
  ViewandSearchTransporter()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewTransporter",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstTransport=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstTransport=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchTransporter();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var Transportername=this.getControlValue(this.f.Transportername,"string");
  var TransporternameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="Transportername")
    {
      TransporternameDBField=this.lstSerchableFields[i].DBField;
    }

    



    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
        if(Transportername!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+TransporternameDBField+" Like'"+Transportername+"%'"):(TransporternameDBField+" Like'"+Transportername+"%'");
        }

      


      }
      else{
       
        if(Transportername!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+TransporternameDBField+" ='"+Transportername+"'"):(TransporternameDBField+" ='"+Transportername+"'");
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

