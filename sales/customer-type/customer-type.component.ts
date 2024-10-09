import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { Customertype } from 'src/app/store/Customertype';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.css']
})
export class CustomerTypeComponent implements OnInit {
  CustomerType:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.CustomerType=formBuilder.group(
  
      {
    
        
        typename:new FormControl(''),
       
    SearchString:new FormControl('')
      });
      this.ViewandSearchCustomerType();
   }



  



    
   StoreCustomertype: Customertype;

  XmlEdit="";
  EditCustomerType(xml) {
  
    debugger;


    this.StoreCustomertype=new Customertype;

    //this.StoreReceipts.TransactionDate=xml.TransactionDate;
    this.StoreCustomertype.typename=xml.typename;

    this.StoreCustomertype.notes=xml.notes;

    this.StoreCustomertype.CustomerTypeId=xml.CustomerTypeId.toString();
    
    this.StoreCustomertype.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());;
    this.StoreCustomertype.submitted=xml.submitted;
    this.StoreCustomertype.ViewName=xml.ViewName;


    this.APICall.UpdatedSelectedPath('./Sales/CreateCustomerType');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreCustomertype.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreCustomertype));
        this.router.navigate(['Sales/CreateCustomerType']);

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

  
  this.StoreCustomertype=new Customertype;
  this.APICall.UpdatedSelectedPath('./Sales/CreateCustomerType');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.StoreCustomertype.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreCustomertype));

  this.router.navigate(['Sales/CreateCustomerType']);

  // this.router.navigate(['Accounting/CreateReceipts']);

  // var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  // this.store.dispatch(new  TabStore.RemoveTab(ActivatedRoute));
  // this.UpdatedSelectedPath('./Sales/CreateCustomerType');

  // this.router.navigate(['Sales/CreateCustomerType']);
}

   get f() { 
     return this.CustomerType
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreCustomertype=new Customertype;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreCustomertype=( result[0] );

 
  this.ViewandSearchCustomerType();

}else{

  this.ViewandSearchCustomerType();
}



  }

ngAfterViewInit(){

   
     
    
  }


  lstCustomerType:any=[];
  lstDbResult:any  = [];
  ViewandSearchCustomerType()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewCustomerType",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstCustomerType=[]; 
          if(this.lstDbResult.Table.length>0)
          {
            this.lstCustomerType=this.lstDbResult.Table;
      
  
            
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
    this.ViewandSearchCustomerType();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var typename=this.getControlValue(this.f.typename,"string");
  var typenameDBField="";
 

 
  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    
    if(this.lstSerchableFields[i].ControlName=="typename")
    {
      typenameDBField=this.lstSerchableFields[i].DBField;
    }
 
  }
debugger;
      if(this.SerchType=='Like')
      {

 
        
        if(typename!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+typenameDBField+" Like'"+typename+"%'"):(typenameDBField+" Like'"+typename+"%'");
        }
       


      }
      else{
       
       
       

        if(typename!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+typenameDBField+" ='"+typename+"'"):(typenameDBField+" ='"+typename+"'");
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
