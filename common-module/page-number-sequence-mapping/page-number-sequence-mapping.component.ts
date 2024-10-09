import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Store } from '@ngrx/store';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { PageNumberSequenceMapping } from 'src/app/store/PageNumberSequenceMapping';


@Component({
  selector: 'app-page-number-sequence-mapping',
  templateUrl: './page-number-sequence-mapping.component.html',
  styleUrls: ['./page-number-sequence-mapping.component.css']
})

export class PageNumberSequenceMappingComponent implements OnInit {

  
  Mapping:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Mapping=formBuilder.group(
  
      {   
        FormName:new FormControl(''),
    SearchString:new FormControl('')
      });
      this.ViewandSearchMapping();
   }
 
   StorePageNumberSequenceMapping: PageNumberSequenceMapping;
  XmlEdit="";
  EditMapping(xml) {

    debugger;
    this.StorePageNumberSequenceMapping=new PageNumberSequenceMapping;

    this.StorePageNumberSequenceMapping.SequenceNumberId=xml.SequenceNumberId;
    this.StorePageNumberSequenceMapping.Id=xml.Id;
    this.StorePageNumberSequenceMapping.SequenceSettingsId=xml.SequenceSettingsId;
    this.StorePageNumberSequenceMapping.FormName=xml.FormName;
  
    this.StorePageNumberSequenceMapping.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());

  //   if(xml.lstPageSequence!=null && typeof(xml.lstPageSequence)!=undefined)
  //  {
  //  var res=((xml.lstPageSequence).replace(/\n/g, "")).replace(/'/g,"\"");
   
  //  this.StorePageNumberSequenceMapping.lstPageSequence=JSON.parse(res);
   
  //  }
  if(xml.PageSequenceDetails!=null && typeof(xml.PageSequenceDetails)!=undefined)
  {
    var res1=((xml.PageSequenceDetails).replace(/\n/g, "")).replace(/'/g,"\"");
    
    
    this.StorePageNumberSequenceMapping.lstnumSequence=JSON.parse(res1);
    var i=0;
    var  data = $.map(this.StorePageNumberSequenceMapping.lstnumSequence, function (obj) {
      i=i+1;
      obj.SNO = i; 
   
      return obj;
    });
  
    this.StorePageNumberSequenceMapping. lstnumSequence=data;
  }
    if(xml.sequencenamedetails!=null && typeof(xml.sequencenamedetails)!=undefined)
    {
    var res2=((xml.sequencenamedetails).replace(/\n/g, "")).replace(/'/g,"\"");
    
    
    this.StorePageNumberSequenceMapping. lstPageSequence=JSON.parse(res2);
    var i=0;
    var  data = $.map(this.StorePageNumberSequenceMapping. lstPageSequence, function (obj) {
      i=i+1;
      obj.SNO = i; 
   
      return obj;
    });
  
    this.StorePageNumberSequenceMapping.lstPageSequence=data;
    }




    
this.APICall.SetViewData(xml);
this.APICall.UpdatedSelectedPath('./Common/CreatePageNumberSequenceMapping');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StorePageNumberSequenceMapping.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StorePageNumberSequenceMapping));
this.router.navigate(['Common/CreatePageNumberSequenceMapping']);



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
  this.StorePageNumberSequenceMapping=new PageNumberSequenceMapping;
  this.APICall.UpdatedSelectedPath('./Common/CreatePageNumberSequenceMapping');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StorePageNumberSequenceMapping.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StorePageNumberSequenceMapping));

  this.router.navigate(['Common/CreatePageNumberSequenceMapping']);


}

   get f() { 
     return this.Mapping
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StorePageNumberSequenceMapping=new PageNumberSequenceMapping;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StorePageNumberSequenceMapping=( result[0] );

 
  this.ViewandSearchMapping();

}else{

  this.ViewandSearchMapping();
}
  }

ngAfterViewInit(){


    
  }


  lstMapping:any=[];
  lstDbResult:any  = [];
  ViewandSearchMapping()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewMapping",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstMapping=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstMapping=this.lstDbResult.Table;
      
            //sequencename1details
            
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
    this.ViewandSearchMapping();
  }
//lstSerchableFields:any  = [];

lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var FormName=this.getControlValue(this.f.FormName,"string");
  var FormNameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="FormName")
    {
      FormNameDBField=this.lstSerchableFields[i].DBField;
    }

   


    
  }
debugger;
      if(this.SerchType=='Like')
      {

        
      

        
        if(FormName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+FormNameDBField+" Like'"+FormName+"%'"):(FormNameDBField+" Like'"+FormName+"%'");
        }


      }
      else{
       
       
        if(FormName!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+FormNameDBField+" ='"+FormName+"'"):(FormNameDBField+" ='"+FormName+"'");
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
// PrepareSerchStringByField():string{
 
//   var FldSerchString="";
//   if(this.lstSerchableFields.length>0)
//   {
 
//   var FormName=this.getControlValue(this.f.FormName,"string");
//   var FormNameDBField="";
  
//   for(var i=0;i< this.lstSerchableFields.length;i++)
//   {
  
//     if(this.lstSerchableFields[i].ControlName=="FormName")
//     {
//       FormNameDBField=this.lstSerchableFields[i].DBField;
//     }

    
//   }
// debugger;
//       if(this.SerchType=='Like')
//       {
    
//         if(FormName!="")
//         {
//           FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+FormNameDBField+" Like'"+FormName+"%'"):(FormNameDBField+" Like'"+FormName+"%'");
//         }


//       }
//       else{
        
//         if(FormName!="")
//         {
//           FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+FormNameDBField+" ='"+FormName+"'"):(FormNameDBField+" ='"+FormName+"'");
//         }
//       }
//     }
//       return FldSerchString;
//     }
// FilterType='All'
// GetSearchString():string
// {
//   debugger;
//   var  SearchString="";
//   if(this.FilterType !='All')
//   {
//     SearchString=this.PrepareSerchStringByField();
//   }
//   else
//   {
//     SearchString=  this.getControlValue(this.f.SearchString,"string")
//   }
//   return SearchString;
// }
// FilterTypeChange(event)
//   {
//     if(AppSettings.ExicuteDebugger)
//     {
//     debugger;
//     }
  
//     if(this.SerchType=='Like' && event.target.checked==true)
//      {
//     this.FilterType=(event.target.checked==true?'All':'Field');
//      }else
//      {
       
//       event.target.checked=false;
//       this.FilterType='Field';
    
//      }
//   }

//   SerchType='Like'
//   SerchTypeChange(ChangedValue)
//   {
//     if(AppSettings.ExicuteDebugger)
//     {
//     debugger;
//     }
  

//     if(ChangedValue==false)
//     {
//       this.SerchType='Equal'
//       if(this.FilterType=='All')
//       $('#customSwitch').trigger('click');
     
//     }else{
//       this.SerchType='Like'
//     }
//   }

  //#endregion "SearchPanelLogic"
  
}
