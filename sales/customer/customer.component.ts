
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
import { Customer } from 'src/app/store/Customer';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import { SalesQuotation } from 'src/app/Store/SalesQuotation';
import { StoreSalesOrder } from 'src/app/Store/StoreSalesOrder';
import { StoreProformaInvoice } from 'src/app/Store/StoreProformaInvoice';
import { StoreDC } from 'src/app/store/StoreDC';
import { StoreSalesInvoice } from 'src/app/Store/StoreSalesInvoice';
import { StoreSalesReturns } from 'src/app/Store/StoreSalesReturns';
import { StoreAccountLedger } from 'src/app/store/StoreAccountLedger';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  Customers:FormGroup;
  StoreSalesQuotation: SalesQuotation;
  StoreSalesOrder: StoreSalesOrder;
  StoreCustomer: Customer;
  StoreProformaInvoice:StoreProformaInvoice;
  StoreDC:StoreDC;
  StoreSalesInvoice: StoreSalesInvoice;
StoreSalesReturns: StoreSalesReturns;
StoreAccountLedger: StoreAccountLedger;
  
  XmlEdit="";


  constructor(private router:Router,private formBuilder: FormBuilder,private APICall:APICallingService,private store: Store<any>) {

    this.Customers=formBuilder.group(
  
      {
    
        Customercode:new FormControl(''), 
        Customername:new FormControl(''),
        gstno:new FormControl(''),
        AccountName:new FormControl(''),


    SearchString:new FormControl('')
      });
      this.ViewandSearchCustomers();
   }
   
  CreateCustomer(xml) {
   
    debugger;
    this.StoreCustomer=new Customer;
    this.StoreCustomer.Customername=xml.Customername;
    this.StoreCustomer.Customercode=xml.Customercode;
    this.StoreCustomer.country=xml.country;
    this.StoreCustomer.shortname=xml.shortname;
    this.StoreCustomer.city=xml.city;
    this.StoreCustomer.iscompany=xml.iscompany;
    this.StoreCustomer.gstno=xml.gstno;
    this.StoreCustomer.panno=xml.panno;
    this.StoreCustomer.Contactno=xml.Contactno;
    this.StoreCustomer.email=xml.email;
    this.StoreCustomer.website=xml.website;
    this.StoreCustomer.creditlimit=xml.creditlimit;
    this.StoreCustomer.creditdays=xml.creditdays;
    this.StoreCustomer.maxbill=xml.maxbill;
    this.StoreCustomer.creditrating=xml.creditrating;
    this.StoreCustomer.customerrating=xml.customerrating;
    this.StoreCustomer.customerclass=xml.customerclass;
    this.StoreCustomer.address1=xml.address1;
    this.StoreCustomer.address2=xml.address2;
    
    this.StoreCustomer.countryname=xml.countryname;
    this.StoreCustomer.statename=xml.statename;
    this.StoreCustomer.cityname=xml.cityname;
    //this.StoreCustomer.CityName=xml.CityName;
    
    //that.StoreCustomer.Citycode=value.Citycode;
    this.StoreCustomer.address3=xml.address3;
    this.StoreCustomer.state=xml.state;
    this.StoreCustomer.coaid=xml.coaid;
    this.StoreCustomer.AccountName=xml.AccountName;
    this.StoreCustomer.Image=xml.Image;
    this.StoreCustomer.companyname=xml.companyname;
    this.StoreCustomer.IsCashCustomer=xml.IsCashCustomer;
    this.StoreCustomer.pincode=xml.pincode;
    //this.DisplayCOAId=ViewData.coaid;
  
  
    this.StoreCustomer.CustomerId=xml.CustomerId.toString();
     
     
  
  
    this.StoreCustomer.ModifiedDate=(xml.ModifiedDate==null?'':xml.ModifiedDate.toString());

    if(xml.BankDetails!=null && typeof(xml.BankDetails)!=undefined)
        {
        var res1=((xml.BankDetails).replace(/\n/g, "")).replace(/'/g,"\"");
        
        
        this.StoreCustomer.lstbankdetails=JSON.parse(res1);
        var i=0;
        var  data = $.map(this.StoreCustomer.lstbankdetails, function (obj) {
          i=i+1;
          obj.SNO = i; 
       
          return obj;
        });
      
        this.StoreCustomer.lstbankdetails=data;
        }

        if(xml.ShippingDetails!=null && typeof(xml.ShippingDetails)!=undefined)
        {

        var res2=((xml.ShippingDetails).replace(/\n/g, "")).replace(/'/g,"\"");
        
        
        this.StoreCustomer.lstShippingdetails=JSON.parse(res2);
        var i=0;
        var  data = $.map(this.StoreCustomer.lstShippingdetails, function (obj) {
          i=i+1;
          obj.SNO = i; 
       
          return obj;
        });
      
        this.StoreCustomer.lstShippingdetails=data;
      }
      if(xml.ContactDetails!=null && typeof(xml.ContactDetails)!=undefined)
      {
        
        var res3=((xml.ContactDetails).replace(/\n/g, "")).replace(/'/g,"\"");
        
        
        this.StoreCustomer.lstContact=JSON.parse(res3);
        var i=0;
        var  data = $.map(this.StoreCustomer.lstContact, function (obj) {
          i=i+1;
          obj.SNO = i; 
       
          return obj;
        });
      
        this.StoreCustomer.lstContact=data;

        }

        if(xml.CustomerTransporter!=null && typeof(xml.CustomerTransporter)!=undefined)
        {

        var res4=((xml.CustomerTransporter).replace(/\n/g, "")).replace(/'/g,"\"");
        
        
        this.StoreCustomer.lstTransport=JSON.parse(res4);
        var i=0;
  var  data = $.map(this.StoreCustomer.lstTransport, function (obj) {
    i=i+1;
    obj.SNO = i; 
 
    return obj;
  });

  this.StoreCustomer.lstTransport=data;
      }

this.APICall.SetViewData(xml);
this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
var ActivatedRoute=localStorage.getItem("ActivatedRoute");
this.StoreCustomer.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreCustomer));
   
    this.router.navigate(['Sales/CreateCustomer']);
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
 


// OnAdd()
// {
//   this.StoreCustomer=new Customer;
//   this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
//   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
//   //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
//   this.StoreCustomer.TabId=ActivatedRoute;
//   this.store.dispatch(new  TabStore.AddTab(this.StoreCustomer));

//   this.router.navigate(['Sales/CreateCustomer']);


// }
selectedCustomer:Customer
OnAdd()
{
  debugger;
  this.StoreCustomer=new Customer;
 
  this.APICall.UpdatedSelectedPath('./Sales/CreateCustomer');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreCustomer.ViewName="AddNewCustomer";
 this.StoreCustomer=Object.assign({},this.selectedCustomer);
  this.StoreCustomer.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreCustomer));
 
  this.router.navigate(['Sales/CreateCustomer']);


}

   get f() { 
     return this.Customers
    .controls;
   }
  DeviceType="";
  ngOnInit() {
this.DeviceType= localStorage.getItem('DeviceType')
this.StoreCustomer=new Customer;
var ActivatedRoute=localStorage.getItem("ActivatedRoute");

    
var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });

//var result = this.store.source['value']['Tab'].filter((x) => { return x.ViewName == "Receipts"; });
if (result.length > 0) {

  this.StoreCustomer=( result[0] );

 
  this.ViewandSearchCustomers();

}else{

  this.ViewandSearchCustomers();
}
  }

ngAfterViewInit(){

   
     
    
  }


  lstCustomers:any=[];
  lstDbResult:any  = [];
  ViewandSearchCustomers()
  {

   
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring=(this.GetSearchString());
     debugger;
      this.APICall.DBCalling("ViewCustomers",sstring,this.FilterType,"",this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.lstDbResult=JSON.parse(res['Message']);
        
          
          this.lstCustomers=[];
          if(this.lstDbResult.Table.length>0)
          {
            this.lstCustomers=this.lstDbResult.Table;
      
  
            
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
    debugger;
    this.ViewandSearchCustomers();
  }
lstSerchableFields:any  = [];


PrepareSerchStringByField():string{

  
  var FldSerchString="";
  if(this.lstSerchableFields.length>0)
  {
 
  var Customername=this.getControlValue(this.f.Customername,"string");
  var CustomernameDBField="";
  

  for(var i=0;i< this.lstSerchableFields.length;i++)
  {

    debugger;
    if(this.lstSerchableFields[i].ControlName=="Customername")
    {
      CustomernameDBField=this.lstSerchableFields[i].DBField;
    }

    
  }
debugger;
      if(this.SerchType=='Like')
      {

      

        
        if(Customername!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" or  "+CustomernameDBField+" Like'"+Customername+"%'"):(CustomernameDBField+" Like'"+Customername+"%'");
        }




      }
      else{
       

        if(Customername!="")
        {
          FldSerchString=FldSerchString!=""?(FldSerchString+" and  "+CustomernameDBField+" ='"+Customername+"'"):(CustomernameDBField+" ='"+Customername+"'");
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

  
  Quotations(xml){
    debugger;
    this.StoreSalesQuotation=new SalesQuotation;
   

      this.APICall.UpdatedSelectedPath('./Sales/CreateSalesQuotation');
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
      this.StoreSalesQuotation.PartyId=xml.CustomerId;
    this.StoreSalesQuotation.PartyName=xml.Customername;
    var Address = (xml.address1 != "" ? xml.address1 : '');

    if (Address != "" && xml.address2 != "") {
      Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
    }

    if (Address != "" && xml.address3 != "") {
      Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
    }


    if (Address != "" && xml.cityname != "") {
      Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
    }
    
    this.StoreSalesQuotation.Billto=Address;
    this.StoreSalesQuotation.ShiptoAddress=Address;
    this.StoreSalesQuotation.BillToStateCode=xml.statecode;
    this.StoreSalesQuotation.SelectedState=xml.state;
    this.StoreSalesQuotation.Contactno=xml.Contactno;
    this.StoreSalesQuotation.Email=xml.email;
    this.StoreSalesQuotation.PartyGSTNo= xml.gstno;

      this.StoreSalesQuotation.TabId=ActivatedRoute;
      this.store.dispatch(new  TabStore.AddTab(this.StoreSalesQuotation));         
      this.router.navigate(['Sales/CreateSalesQuotation']);
   
  }

  orders(xml){
    this.StoreSalesOrder=new StoreSalesOrder;
    this.APICall.UpdatedSelectedPath('./Sales/CreateSalesOrder');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreSalesOrder.PartyId=xml.CustomerId;
  this.StoreSalesOrder.PartyName=xml.Customername;

  var Address = (xml.address1 != "" ? xml.address1 : '');

  if (Address != "" && xml.address2 != "") {
    Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
  }

  if (Address != "" && xml.address3 != "") {
    Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
  }


  if (Address != "" && xml.cityname != "") {
    Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
  }
  
  this.StoreSalesOrder.Billto=Address;
  this.StoreSalesOrder.ShiptoAddress=Address;
  this.StoreSalesOrder.BillToStateName=xml.statename;
  this.StoreSalesOrder.BillToStateCode=xml.statecode;
  this.StoreSalesOrder.SelectedState=xml.state;
  this.StoreSalesOrder.Contactno=xml.Contactno;
  this.StoreSalesOrder.Email=xml.email;
  this.StoreSalesOrder.PartyGSTNo= xml.gstno;
  this.StoreSalesOrder.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.StoreSalesOrder));         
  this.router.navigate(['Sales/CreateSalesOrder']);

}


performa(xml){

  this.StoreProformaInvoice=new StoreProformaInvoice;
  this.APICall.UpdatedSelectedPath('./Sales/CreateProformaInvoice');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreProformaInvoice.PartyId=xml.CustomerId;
this.StoreProformaInvoice.PartyName=xml.Customername;


var Address = (xml.address1 != "" ? xml.address1 : '');

if (Address != "" && xml.address2 != "") {
  Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
}

if (Address != "" && xml.address3 != "") {
  Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
}


if (Address != "" && xml.cityname != "") {
  Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
}

this.StoreProformaInvoice.Billto=Address;
this.StoreProformaInvoice.ShiptoAddress=Address;
this.StoreProformaInvoice.BillToStateName=xml.statename;

this.StoreProformaInvoice.SelectedState=xml.state;
this.StoreProformaInvoice.Contactno=xml.Contactno;
this.StoreProformaInvoice.Email=xml.email;
this.StoreProformaInvoice.PartyGSTNo= xml.gstno;

this.StoreProformaInvoice.TabId=ActivatedRoute;

this.store.dispatch(new  TabStore.AddTab(this.StoreProformaInvoice));         
this.router.navigate(['Sales/CreateProformaInvoice']);
}

DC(xml){
  debugger;
    this.StoreDC=new StoreDC;
    this.APICall.UpdatedSelectedPath('./Sales/CreateDC');
    var ActivatedRoute=localStorage.getItem("ActivatedRoute");
    this.StoreDC.PartyId=xml.CustomerId;
  this.StoreDC.PartyName=xml.Customername;
  
  
  var Address = (xml.address1 != "" ? xml.address1 : '');
  
  if (Address != "" && xml.address2 != "") {
    Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
  }
  
  if (Address != "" && xml.address3 != "") {
    Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
  }
  
  
  if (Address != "" && xml.cityname != "") {
    Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
  }
  
  this.StoreDC.Billto=Address;
  this.StoreDC.ShiptoAddress=Address;
  this.StoreDC.BillToStateName=xml.statename;
  
  this.StoreDC.SelectedState=xml.state;
  this.StoreDC.Contactno=xml.Contactno;
  this.StoreDC.Email=xml.email;
  this.StoreDC.PartyGSTNo= xml.gstno;
  
  this.StoreDC.TabId=ActivatedRoute;
  
  this.store.dispatch(new  TabStore.AddTab(this.StoreDC));         
  this.router.navigate(['Sales/CreateDC']);
  }


  SalesInvoice(xml){

    debugger;
      this.StoreSalesInvoice=new StoreSalesInvoice;
      this.APICall.UpdatedSelectedPath('./Sales/CreateSalesInvoice');
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
      this.StoreSalesInvoice.PartyId=xml.CustomerId;
    this.StoreSalesInvoice.PartyName=xml.Customername;
    var Address = (xml.address1 != "" ? xml.address1 : '');
    
    if (Address != "" && xml.address2 != "") {
      Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
    }
    
    if (Address != "" && xml.address3 != "") {
      Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
    }
    
    
    if (Address != "" && xml.cityname != "") {
      Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
    }
    
    this.StoreSalesInvoice.Billto=Address;
    this.StoreSalesInvoice.ShiptoAddress=Address;
    this.StoreSalesInvoice.BillToStateName=xml.statename;
    
    this.StoreSalesInvoice.SelectedState=xml.state;
    this.StoreSalesInvoice.Contactno=xml.Contactno;
    this.StoreSalesInvoice.Email=xml.email;
    this.StoreSalesInvoice.PartyGSTNo= xml.gstno;
    
    this.StoreSalesInvoice.TabId=ActivatedRoute;
    
    this.store.dispatch(new  TabStore.AddTab(this.StoreSalesInvoice));         
    this.router.navigate(['Sales/CreateSalesInvoice']);
    
}

DcReturn(xml){
  this.StoreSalesReturns=new StoreSalesReturns;
  this.APICall.UpdatedSelectedPath('./Sales/CreateSalesReturns');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreSalesReturns.PartyId=xml.CustomerId;
this.StoreSalesReturns.PartyName=xml.Customername;
var Address = (xml.address1 != "" ? xml.address1 : '');

if (Address != "" && xml.address2 != "") {
  Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
}

if (Address != "" && xml.address3 != "") {
  Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
}


if (Address != "" && xml.cityname != "") {
  Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
}

this.StoreSalesReturns.Billto=Address;
// this.StoreSalesReturns.ShiptoAddress=Address;
this.StoreSalesReturns.BillToStateName=xml.statename;
this.StoreSalesReturns.SelectedState=xml.state;
this.StoreSalesReturns.Contactno=xml.Contactno;
this.StoreSalesReturns.Email=xml.email;
this.StoreSalesReturns.PartyGSTNo= xml.gstno;
this.StoreSalesReturns.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreSalesReturns));         
this.router.navigate(['Sales/CreateSalesReturns']);

}
SalesReturn(xml){
    debugger;
      this.StoreSalesReturns=new StoreSalesReturns;
      this.APICall.UpdatedSelectedPath('./Sales/CreateSalesReturns');
      var ActivatedRoute=localStorage.getItem("ActivatedRoute");
      this.StoreSalesReturns.PartyId=xml.CustomerId;
    this.StoreSalesReturns.PartyName=xml.Customername;
    var Address = (xml.address1 != "" ? xml.address1 : '');
    
    if (Address != "" && xml.address2 != "") {
      Address = Address + ',' + (xml.address2 != "" ? xml.address2 : '');
    }
    
    if (Address != "" && xml.address3 != "") {
      Address = Address + ',' + (xml.address3 != "" ? xml.address3 : '');
    }
    
    
    if (Address != "" && xml.cityname != "") {
      Address = Address + ',' + (xml.cityname != "" ? xml.cityname : '');
    }
    
    this.StoreSalesReturns.Billto=Address;
    // this.StoreSalesReturns.ShiptoAddress=Address;
    this.StoreSalesReturns.BillToStateName=xml.statename;
    this.StoreSalesReturns.SelectedState=xml.state;
    this.StoreSalesReturns.Contactno=xml.Contactno;
    this.StoreSalesReturns.Email=xml.email;
    this.StoreSalesReturns.PartyGSTNo= xml.gstno;
    this.StoreSalesReturns.TabId=ActivatedRoute;
    this.store.dispatch(new  TabStore.AddTab(this.StoreSalesReturns));         
    this.router.navigate(['Sales/CreateSalesReturns']);
    

}

Ledger(xml){
  this.StoreAccountLedger=new StoreAccountLedger;
  this.APICall.UpdatedSelectedPath('./Accounting/AccountLedger');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  this.StoreAccountLedger.AccountId=xml.CustomerId;
this.StoreAccountLedger.AccountName=xml.Customername;
this.StoreAccountLedger.TabId=ActivatedRoute;
this.store.dispatch(new  TabStore.AddTab(this.StoreAccountLedger));         
this.router.navigate(['Accounting/AccountLedger']);

}
  
}
