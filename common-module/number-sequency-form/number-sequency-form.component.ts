import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import { NumberSequencyForm } from 'src/app/store/NumberSequence';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";


@Component({
  selector: 'app-number-sequency-form',
  templateUrl: './number-sequency-form.component.html',
  styleUrls: ['./number-sequency-form.component.css']
})




export class NumberSequencyFormComponent implements OnInit {

  
  Sequency:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Sequency=formBuilder.group(
  
      {
    
       
        name:new FormControl(''),
    SearchString:new FormControl('')
      });
      this.ViewandSearchSequency();
   }


  


  
   StoreNumberSequencyForm: NumberSequencyForm;
  XmlEdit="";
  EditSequency(xml) {
  
    debugger;
    this.StoreNumberSequencyForm=new NumberSequencyForm;
    this.StoreNumberSequencyForm.name=xml.name.toString();
    this.StoreNumberSequencyForm.prefix=xml.prefix.toString();
    this.StoreNumberSequencyForm.suffix=xml.suffix.toString();
    this.StoreNumberSequencyForm.startfrom=xml.startfrom.toString();
    this.StoreNumberSequencyForm.separator=xml.separator.toString();
    this.StoreNumberSequencyForm.increment=xml.increment.toString();
    this.StoreNumberSequencyForm.SequenceNumberId=xml.SequenceNumberId.toString();
    this.StoreNumberSequencyForm.notes=xml.notes.toString();
 
 
    this.StoreNumberSequencyForm.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());

this.APICall.SetViewData(xml);
this.APICall.UpdatedSelectedPath('./Common/CreateNumberSequencyForm');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreNumberSequencyForm.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreNumberSequencyForm));
    
    this.router.navigate(['Common/CreateNumberSequencyForm']);
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
  this.StoreNumberSequencyForm=new NumberSequencyForm;
  this.APICall.UpdatedSelectedPath('./Common/CreateNumberSequencyForm');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreNumberSequencyForm.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreNumberSequencyForm));

  this.router.navigate(['Common/CreateNumberSequencyForm']);


}

   get f() { 
     return this.Sequency
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreNumberSequencyForm=new NumberSequencyForm;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreNumberSequencyForm=( result[0] );

 
  this.ViewandSearchSequency();

}else{

  this.ViewandSearchSequency();
}
  }

ngAfterViewInit(){


     
    
  }


  lstSequency:any=[];
  lstDbResult:any  = [];
  ViewandSearchSequency()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewSequency",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstSequency=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstSequency=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchSequency();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var name=this.getControlValue(this.f.name,"string");
  var nameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="name")
    {
      nameDBField=this.lstSerchableFields[i].DBField;
    }

   


    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
      

        
        if(name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+nameDBField+" Like'"+name+"%'"):(nameDBField+" Like'"+name+"%'");
        }


      }
      else{
       
       
        if(name!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+nameDBField+" ='"+name+"'"):(nameDBField+" ='"+name+"'");
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
