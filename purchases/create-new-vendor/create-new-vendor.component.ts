import { Component, OnInit, HostListener ,ViewChild,Input,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { APICallingService } from 'src/app/apicalling.service';
import * as $ from 'jquery';

import { Router } from '@angular/router';
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import { Vendor } from 'src/app/store/StoreVendor';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';
import { DatePipe, formatDate } from '@angular/common';
import { data } from 'jquery';







@Component({
  selector: 'app-create-new-vendor',
  
  templateUrl: './create-new-vendor.component.html',
  styleUrls: ['./create-new-vendor.component.css'],
  providers:[DatePipe]
})
export class CreateNewVendorComponent implements OnInit {
 
  CreateVendor: FormGroup;
  //#region "View constructor"
  DisplaySequenceNumberId = 0;
  
  DispalyAccountName = "";
  DispalyFormName = 'Vendor'
  DisplayCOAId = "";
  FilterBy = "Company";
  BillPin: string = "";
  lstbankdetails: any = [];
  lstShippingdetails: any = [];
  lstContact: any = [];
  lstBillingAddresses: any = [];
  lstBillingAddresses1 : any = [];
  myDate :any= new Date();
  Vendorcode:string=''
  

  constructor(private DbCallings: CommonDbCallings, private router: Router, private formBuilder: FormBuilder,
    private APICall: APICallingService, private store: Store<any>, public datepipe: DatePipe) {

     
      this.lstShippingdetails = [];
      this.lstContact = [];
      this.lstbankdetails = [];
      this.lstBillingAddresses = [];
    this.CreateVendor = formBuilder.group(

      {
        SequenceNumberId: new FormControl(),
        vendorcode: new FormControl(''),
        vendorname: new FormControl('', [Validators.required]),
        shortname: new FormControl('', [Validators.required]),
        country: new FormControl(''),
        partNo:new FormControl(''),
        VendorType:new FormControl(''),
        BusinessType:new FormControl(''),
        ItemId:new FormControl(''),
        BillStateId:new FormControl(''),
        ShipStateId:new FormControl(''),
        UomName:new FormControl(''),
        iscompany: new FormControl(''),
        AccountName: new FormControl(''),
        companyname: new FormControl(''),
        TransporterId: new FormControl(''),
        PurchaseType:new FormControl(''),
        gstno: new FormControl(''),
        Contactno: new FormControl('',[Validators.required,Validators.minLength(10)]),
        email:new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        website: new FormControl(''),
        creditlimit: new FormControl(''),
        creditdays: new FormControl(''),
        maxbill: new FormControl(''),
        creditrating: new FormControl(''),
        vendorrating: new FormControl(''),
        SearchString: new FormControl(''),
        vendorclass: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        address3: new FormControl(''),
        countryname: new FormControl(''),
        pincode: new FormControl(''),
        //DispalyStateName:new FormControl(''),
        DispalyCityName: new FormControl(''),
        //coaid:new FormControl('',[Validators.required,Validators.min(1)]),
        coaid: new FormControl(''),
        TransactionId: new FormControl(''),
        panno: new FormControl(''),
        AccountNo1: new FormControl(''),
        TextBoxColumn_BankName_1: new FormControl(''),
        BranchName2: new FormControl(''),
        PartyBankDetailsgrv_grv4_3Id: new FormControl(''),
        IFSCCode3: new FormControl(''),
        SNO: new FormControl(''),
        ShippingInfogrv_grv4_3Id: new FormControl(''),
        ContactInfoMechknowGridView1Id: new FormControl(''),
        Country4Id: new FormControl(''),
        State5Id: new FormControl(''),
        //statename:new FormControl(''),
        Description:new FormControl(''),
        //StateId:new FormControl(''),
        City6Id: new FormControl(''),
        cityname: new FormControl(''),
        CityName: new FormControl(''),
        CurrencyId: new FormControl(0),

        Ctyname: new FormControl(''),
        ShippingName0: new FormControl(''),
        Address11: new FormControl(''),
        Address22: new FormControl(''),
        Address33: new FormControl(''),
        ShippingCountry: new FormControl(''),
        ContactName0: new FormControl(''),
        ContactNo1: new FormControl('',Validators.required),
        Email2:new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        LineChanges: new FormControl(0),
        LineChanges1: new FormControl(0),
        LineChanges2: new FormControl(0),
        LineChanges3: new FormControl(0),
        transportername: new FormControl(''),
        Image: new FormControl(''),
        VendorId: new FormControl(0),
        Transportername: new FormControl(''),
        //TransporterId:new FormControl(''),
        Currencyname: new FormControl(''),
        TransportId: new FormControl(''),
        area: new FormControl(''),
        Notes3: new FormControl(''),
        statename: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),

        VendorCountryId:new FormControl(0,Validators.required),
        ItemName: new FormControl(''),
      
        MakeId: new FormControl(''),
        Make: new FormControl(''),
        UOMId: new FormControl(0),
        UOM: new FormControl(''),
        UnitPrice: new FormControl(0),
        VendorStateId: new FormControl(0,Validators.required),
        VendorCityId: new FormControl(0,Validators.required),
        Vpin: new FormControl(''),

        BillCountryId: new FormControl(0),
      
        BillCityId: new FormControl(0),
        Bpin: new FormControl(''),

        ShipCountryId: new FormControl(0),
        Scountry:new FormControl(''),
      
        ShipCityId: new FormControl(0),
        SHPPin: new FormControl(''),

        CompanyAddress1: new FormControl('',Validators.required),
        CompanyAddress2: new FormControl(''),
        SiteName: new FormControl(''),

        SHPContactName: new FormControl(''),
        SHPAddress1: new FormControl(''),
        SHPAddress2: new FormControl(''),

        Designation1: new FormControl(''),
        WhatsappNo: new FormControl(''),


        BanksCountryId: new FormControl(0),
        BankstateId: new FormControl(0),
        BankcityId: new FormControl(0),
        Bankpincode: new FormControl(0),
        BeneficiaryName: new FormControl(''),
        SwiftCode: new FormControl(''),
        AbaNo: new FormControl(''),
        RoutingNo: new FormControl(''),
        SortCode: new FormControl(''),
        BankStreet1: new FormControl(''),
        BankStreet2: new FormControl(''),
        VendorDate: new FormControl(''),
        VendorStateName1 :  new FormControl(''),
        vendorCountryName :  new FormControl(''),
       
        VendorCityName : new FormControl(''),
      });

     
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }



  itemsubmit = false;
  item: number = 0;
  make: number = 0;
  price: number = 0;
  EditItemNO: number = -1;
  submit1=false;


   EditItemDetails(selectedRecord, SNO) {

    debugger;
    this.EditItemNO = SNO;
    this.SNO = SNO;
    this.UOMId=selectedRecord.UOMId;
    this.ModifiedDate=selectedRecord.ModifiedDate;
    this.itemid = selectedRecord.ItemId;
    this.itemname = selectedRecord.partNo;

this.ID=selectedRecord.Id

    this.CreateVendor.patchValue({
      VendorId: selectedRecord.VendorId,
      Show: 'true',
      ItemId: selectedRecord.ItemId,
      partNo: selectedRecord.partNo,
      MakeId: selectedRecord.MakeId,
      Id:selectedRecord.Id,
      Make: selectedRecord.Make,
      UOMId: selectedRecord.UOMId,
      UOM: selectedRecord.UOM,
      Description: selectedRecord.Description,
      UnitPrice: selectedRecord.Price,
      SNO: selectedRecord.SNO,
      ModifiedDate:selectedRecord.ModifiedDate
    });
    // this.f.ItemId.setValue(0);
    // this.f.partNo.setValue('')
  
    var partselection1 = new Option(this.f.partNo.value, this.f.ItemId.value.toString(), true, true);
  
    (<any>$('#drpParts')).append(partselection1).trigger('change');
    var Makeselection1 = new Option(this.f.Make.value, this.f.MakeId.value.toString(), true, true);
  
    (<any>$('#drpMake')).append(Makeselection1).trigger('change');
  }

  // ItemsAdd() {
  //   try {

      

  //     this.SNO = 1;
  //     this.EditRecNO = -1;

  //     this.ItemDetailsClear();


  //   }
  //   catch (error) { }
  // }

 

  DeleteItemDetails(selectedrecord,index){
   
  
      try{
        debugger;
        var row=selectedrecord;
  
        this.StoreVendor.lstItems.splice(index, 1);
  
      }
      catch(error){}
   
  }
  MoveItems() {
    debugger;
    try {
      var valid = true;
      this.submit1 = true;
  
      if ( this.f.MakeId.value == 0 || this.f.ItemId.value == 0) {
     
        valid = false;
      } else {
   
   
        this.ClosePopup();
      }
    
      if (valid) {
        debugger;
  
        var that = this;
        var obj = {
          VendorId: that.f.VendorId.value,
          Id:this.ID,
          ItemId: that.f.ItemId.value,
          partNo: that.f.partNo.value,
          UOMId:that.UOMId,
          UOM:that.f.UOM.value,
          MakeId: that.f.MakeId.value,
          Make: that.f.Make.value,
          Description: that.f.Description.value,
          Price:that.f.UnitPrice.value,
         ModifiedDate:that.ModifiedDate
          
        };
  
        // UomId: this.uomid,
        // UOM: this.uomname,
        
      // var resp= that.StoreVendor.lstItems.filter(x=>(x.ItemId==this.f.ItemId.value) && (x.MakeId==this.f.MakeId.value));
  
  //      if(resp.length>0)
  //      {
        
  //       (window as any).swal({
  //         icon: "warning",
  //         title: "Are you sure?",
  //         text: "this Item was already exists",
    
  //         buttons: [
  //           'No, cancel it!',
  //           'Add Item!'
  //         ],
  //         dangerMode: true,
  //       }).then(function (isConfirm) {
    
  //         if (isConfirm) {
    
  //           that.StoreVendor.lstItems.push(obj);
  //         } else {
  //           (window as any).swal("Cancelled", "this record is safe: )", "error");
  //         }
    
  //       });
    
       
  //      }
  //      else 
  // {
  //       that.StoreVendor.lstItems.push(obj);
       
  // } 
  

  if(this.EditItemNO<0 )
  {
    debugger;
    this.lstItems.push(obj);
  }else if(this.EditItemNO==0){
    
    this.lstItems.push(obj);
    this.EditItemNO=(this.EditItemNO ) - 1
  }
  else{
    this.EditItemNO=(this.EditItemNO ) - 1
  
    this.lstItems[this.EditItemNO]=obj;
  }
       this.ClosePopup();
        this.ClearItems();
      }
    }
  
    catch (error) { }
  }
  submit=false;
  ClearItems() {
    debugger;
    this.submit1 = false;
    //this.EditItemRec=-1;
    this.EditItemNO=-1
    this.Make = "";
    this.uomid = 0;
    this.uomname = "";
    $('#drpMake').empty();
    $('#drpParts').empty();
    this.CreateVendor.patchValue({
      Description: "",
      UOM: "",
      Make: "",
      UOMId:0,
      MakeId: 0,
      Partno: "",
      ItemId:0,
      UnitPrice:'',
    })
    this.submit = false;
    this.LoadParts();
    this.LoadMake();
   
  
  
  }
  
  
  ClosePopup() {
  debugger;
    if(this.f.MakeId.value==0 && this.f.ItemId.value==0){
      this.submit1=false;

     
      $('#btnClose').click();
    }else{
     
    $('#btnClose').click();
    }

  }
  lstItemsStock: any = [];
  

  RemoveItem() {
    

    var sliceIndex = -1;
    for (var i = 0; i < this.lstItems.length; i++) {
      this.lstItems[i].Show = 'true';

      if (this.lstItems[i].SNO == this.EditRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstItems.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstItems.length; i++) {
        this.lstItems[i].SNO = i + 1;
      }
    }

    this.EditItemNO = -1;
    this.SNO = this.lstItems.length + 1;
   // this.ItemDetailsClear();

  }

  ValidateItemDetails(): boolean {
    
    var validate = true;
    this.showError = false;


    if ((this.f.ItemId.value != "" && this.f.ItemId.value != undefined) &&
      (this.f.MakeId.value != "" && this.f.MakeId.value != undefined) &&
      (this.f.UnitPrice.value != "" && this.f.UnitPrice.value != undefined)) {
      
      for (var i = 0; i < this.lstItems.length; i++) {
        if ((this.EditRecNO != this.lstItems[i].SNO && this.lstItems[i].partNo == this.getControlValue(this.f.ItemId, 0))
          && (this.EditRecNO != this.lstItems[i].SNO && this.lstItems[i].Make == this.getControlValue(this.f.Make, 0))) {
          validate = false;
          this.showError = true;
          this.errormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";
    }
    return validate;
  }

  AccountValueChange(event) {
    

    this.f.coaid.setValue(event.COAId);
    this.f.AccountName.setValue(event.Name);
  }



  ID = 0;
  ImageServerPath = "";
  windowScroll(ControlName) {
    var element = document.getElementById(ControlName);
    var rect = element.getBoundingClientRect();

    window.scrollTo(rect.left, rect.top);
  }
  //VendorId=0;

  GetCountryDetById($event) {
    

    this.f.VendorId = $event;
    //this.VendorId=$event;
  }
  //#endregion "View constructor"


  //#region "Scroll To Invalid Control"


  //#endregion "Scroll To Invalid Control"

  //#region "OnSave"

  format(opt) {

    if (!opt.id) {
      return opt.text;
    }




    var $opt = $('<table class="table table-bordered  table-responsive-stack" style="margin-bottom: 0px;border:none"><tbody><tr><td width="50%">' + opt.countrycode + '</td><td width="50%">' + opt.countryname + '</td></tr></tbody></table>');
    return $opt;

  };


  Make: string = "";
  uomid: number = 0;
  uomname: string = "";
  partNo: string = "";
  itemid: number = 0;
  itemname: string = "";


 
  PreapareMakeParam(): string {
    debugger;
    var that = this;
    var xmlParaminput = ""
    var uomval = '';
    debugger;
    if (that.f.UOMId != undefined && that.f.UOMId != null) {
      uomval = that.f.UOM.value;
    }
  
    xmlParaminput = '<NewDataSet><Table1>'
  
      + '<ItemID>' + that.f.ItemId.value + '</ItemID>'
      + '<Type>' + 'Sales' + '</Type>'
      + '<PartyId>' + 0 + '</PartyId>'
      + '<UOMID>' +  that.UOMId + '</UOMID>'
      + '</Table1></NewDataSet>';
  
  
    return xmlParaminput;
  }
  makeid = 0;
  
 
  
  

  lstCountries: any = [];
  VendorCountryId: number = 0;

  vcName: string = "";
  lstDbResult:any=[]
  bCId: number = 0;
  billCountryName: string = "";
  lstStates: any = [];
  sCId: number = 0;
  ShippingCountryName: string = "";

  bankCId: number = 0;
  bankcName: string = "";
  FilterStates:any=[];
  ShipStateId=0;


 
  LoadCountries() {
    var that = this;
    try {
      
      this.APICall.DBCalling("ViewCountries", "", "All", "", this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          
          this.lstDbResult = JSON.parse(res['Message']);
          this.lstCountries = [];
          
          data=[]
          if (this.lstDbResult.Table.length > 0) {
            debugger;
          
            this.lstCountries = this.lstDbResult.Table;
          
            this.lstCountries .unshift({ 'CountryId':-1,'CompanyId': 1,  'DeleteFlag': 0,  'countrycode': 'inff','ModifiedBy': null,
           'ModifiedDate': null,'countryname': '' });
  
           
            var data = $.map(this.lstCountries, function (obj) {
             
              obj.id = obj.CountryId;
              obj.text = obj.countryname
            return obj;
            });
           
       
            var vendorcountry = new Option(this.StoreVendor.vendorCountryName, this.StoreVendor.VendorCountryId.toString(), true, true);
            (<any>$('#Vcountry')).append(vendorcountry).trigger('change');

        
            (<any>$('#Vcountry')).select2({ 
              
              data: data
              
            });   
            

   
            <any>$('#Vcountry').on("select2:select", function (e) {
            debugger;
          
              if (typeof ((<any>e).params.data.id) != 'undefined') {
                try {                
                  e.preventDefault()
                  var id = ((<any>e).params.data.id);
                  var name = ((<any>e).params.data.text);
                  that.VendorCountryId = id;
                  that.f.VendorCountryId.setValue(that.VendorCountryId)                  
                  that.vcName = name
                  that.StoreVendor.vendorCountryName=name;
                  that.StoreVendor.VendorCountryId=id;
                 
                  that.BindVendorStates(that, id);          
 
                } catch (e) { }
              }
         
            });   
           debugger;
   
       var billingCountry = new Option(that.billCountryName , that.f.BillCountryId.value, true, true);
       (<any>$('#Bcountry')).append(billingCountry).trigger('change');
        debugger; 
              
    
         (<any>$('#Bcountry')).select2({ 
                 data: data
            }); 
            
            $('#Bcountry').val(-1).trigger('change'); 
       
     
        <any>$('#Bcountry').on("select2:select", function (e) {
          if (typeof ((<any>e).params.data.id) != 'undefined') {
            debugger;
            try {                
              e.preventDefault()
              var id = ((<any>e).params.data.id);
              var name = ((<any>e).params.data.text);
              that.bCId = id;
              that.billCountryName = name;
              that.f.BillCountryId.setValue(that.bCId)                
            
             
              that.BindBillStates(that, id);          

            } catch (e) { }
          }
        
        });   

       


//#region 'Shipping Country'
debugger;
// var shipCountry = new Option(that.ShippingCountryName , that.f.ShipCountryId.value, true, true);
// (<any>$('#Scountry')).append(shipCountry).trigger('change');
             
        (<any>$('#Scountry')).select2({                
          data: data
        });   

       
        $('#Scountry').val(-1).trigger('change'); 
    <any>$('#Scountry').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
        try {                
       debugger;
      
          var id = ((<any>e).params.data.id);
          var name = ((<any>e).params.data.text);
          that.sCId = id;
          that.ShippingCountryName = name;
         
          that.f.ShipCountryId.setValue(that.sCId)
         

          that.BindShipStates(that, id); 
          
          
          

        } catch (e) { }
      }
    
    });   


           // bank country

            var bankcountry = new Option(that.bankcName, that.f.BanksCountryId.value, true, true);
            (<any>$('#banksCountry')).append(bankcountry).trigger('change');

            (<any>$('#banksCountry')).select2({
              data: data
            });
            if(that.bankcName==''){
              $('#banksCountry').val(-1).trigger('change'); 
            }
           
            <any>$('#banksCountry').on("select2:select", function (e) {
              if (typeof ((<any>e).params.data.id) != 'undefined') {
                try {
                  
                  debugger;
                  var id = ((<any>e).params.data.id);
                  var name = ((<any>e).params.data.text);
                  that.bankCId = id;
                  that.bankcName = name;
                  console.log(that.bankcName )
                  that.f.BanksCountryId.setValue(id)
                  $('#Bankstate').empty();


                  that.BindBankStates(that, id);

          
          

        } catch (e) { }
      }
    
    });   

//     var Countryselection = new Option(  that.scName
//       , that.f.ShipCountryId.value, true, true);

// (<any>$('#Scountry')).append(Countryselection).trigger('change');
      
    //#endregion
          }
        });
    }
    catch (error) { }
  }
  
  VendorStateId: number = 0;
  VendorStateName: string = "";

  bSId: number = 0;
  bsName: string = "";

  sSId: number = 0;
  ssName: string = "";

  BanksSId: number = 0;
  BanksName: string = "";
  Billingstates = [];
  ShippingStates=[];
 
  private BindVendorStates(that: this, id: any) {
   
    debugger;
  //   if(that.VendorStateName!==undefined){
  //     var Stateselection = new Option( that.VendorStateName
  //       , that.f.VendorStateId.value, true, true);
  
  // (<any>$('#VState')).append(Stateselection).trigger('change');
  //   }

  $('#VState').empty();
    var vStates = that.lstStates.filter(x => x.country == id);
  
   vStates.unshift({ 'StateId': 0, 'Statename': '' ,country: 0})
    var data = $.map(vStates, function (obj) {
                      debugger;
                      obj.id = obj.StateId;
                      obj.text = obj.Statename;
                      return obj;
                      
                    });

      (<any>$('#VState')).select2({
       
        data: data
      });
  
    <any>$('#VState').on("select2:select", function (e) {
     
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
            
                debugger;
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.VendorStateId = id;
                that.VendorStateName = name;
                console.log( name)
                that.f.VendorStateId.setValue(id)
                that.f.VendorStateName1.setValue(name)
                that.f.VendorCityId.setValue(0)
                that.VendorCityName=''
     
              that.BindVendorCities(that,id);

              }
              catch(error){}
            }
          });
         
          
  }


  private BindVendorCities(that: this, id: any) {
    $('#Vcity').empty();
    if(that.VendorCityName!==undefined){
      var Cityselection = new Option(  that.VendorCityName
        , that.f.VendorCityId.value, true, true);

(<any>$('#Vcity')).append(Cityselection).trigger('change');
    }
   

    var vcity = that.lstCities.filter(x => x.state == id);
debugger;
   
    vcity.unshift({ 'CityId': 0, 'Cityname': '' })
    var data = $.map(vcity, function (obj) {
                      debugger;
                      obj.id = obj.CityId;
                      obj.text = obj.Cityname;
                      return obj;
                      
                    });


    if (vcity != undefined) {
      (<any>$('#Vcity')).select2({
        data: data
      });
    }
    // if(this.StoreVendor.VendorCityName!==''){
    //   var Cityselection = new Option(  this.StoreVendor.VendorCityName
    //     , that.f.VendorCityId.value, true, true);
        
    //     (<any>$('#Vcity')).append(Cityselection).trigger('change');
    // }
  

    <any>$('#Vcity').on("select2:select", function (e) {
      
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                 that.VendorCityId = id;
                 that.VendorCityName = name;
                 that.f.VendorCityId.setValue(that.VendorCityId)    
              }
              catch(error){}
            }
          });
         
  }



  private BindBillStates(that: this, id: any) {
    debugger;
    $('#Bstate').empty();

    var bStates = that.lstStates.filter(x => x.country == id);

    bStates.unshift({ 'StateId': -1, 'Statename': 'select state' ,country: 0})
    var data = $.map(bStates, function (obj) {
                      debugger;
                      obj.id = obj.StateId;
                      obj.text = obj.Statename;
                      return obj;
                      
                    });


    if (bStates != undefined) {
      (<any>$('#Bstate')).select2({
        data: data
      });
    }

  

    <any>$('#Bstate').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.bSId = id;
                that.bsName = name;
                that.f.BillStateId.setValue(that.bSId)
                $('#Bcity').empty()


                that.BindBillCities(that, id);

              }
              catch(error){}
            }
          });


          

  }


  private BindBillCities(that: this, id: any) {
    $('#Bcity').empty();

    var vcity = that.lstCities.filter(x => x.state == id);
    vcity.unshift({ 'CityId': -1, 'Cityname': 'Select City' })
   
    var data = $.map(vcity, function (obj) {
                      debugger;
                      obj.id = obj.CityId;
                      obj.text = obj.Cityname;
                      return obj;
                      
                    });


    if (vcity != undefined) {
      (<any>$('#Bcity')).select2({
        data: data
      });
    }

    $('#Bcity').val(-1).trigger('change'); 

    <any>$('#Bcity').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.bCCId = id;
                that.bcityName = name;
                that.f.BillCityId.setValue(id)

              
                
              }
              catch(error){}
            }
          });

  }



  private BindShipStates(that: this, id: any) {
    $('#Sstate').empty();

    var vStates = that.lstStates.filter(x => x.country == id);

    vStates.unshift({ 'StateId': -1, 'Statename': 'SelectState' ,country: 0})
    var data = $.map(vStates, function (obj) {
                      debugger;
                      obj.id = obj.StateId;
                      obj.text = obj.Statename;
                      return obj;
                      
                    });


                  
      (<any>$('#Sstate')).select2({
        data: data
      });
 
      $('#Sstate').val(-1).trigger('change');   
    
    
    <any>$('#Sstate').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.sSId = id;
                that.ssName = name;
                that.f.ShipStateId.setValue(that.sSId)
              
     
              that.BindShipCities(that,id);

              }
              catch(error){}
            }
          });

          var Stateselection = new Option( that.VendorStateName
            , that.f.VendorStateId.value, true, true);
    
    (<any>$('#VState')).append(Stateselection).trigger('change');
    
          

  }


  
  private BindBankStates(that: this, id: any) {
    $('#Bankstate').empty();

    var vStates = that.lstStates.filter(x => x.country == id);

    vStates.unshift({ 'StateId': 0, 'Statename': '' ,country: 0})
    var data = $.map(vStates, function (obj) {
                      debugger;
                      obj.id = obj.StateId;
                      obj.text = obj.Statename;
                      return obj;
                      
                    });


    if (vStates != undefined) {
      (<any>$('#Bankstate')).select2({
        data: data
      });
    }


    <any>$('#Bankstate').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.BanksSId = id;
                that.BanksName = name;
              that.f.BankstateId.setValue(that.BanksSId )
              $('#Bankcity').empty()
              that.BindBankCities(that,id);

              }
              catch(error){}
            }
          });
debugger;

          if(that.BanksName!==that.BanksName){
          var Stateselection = new Option( that.BanksName
            , that.f.BankstateId.value, true, true);
    
    (<any>$('#Bankstate')).append(Stateselection).trigger('change');
  }
  
          

  }

  private BindShipCities(that: this, id: any) {
    $('#Scity').empty();

    var vcity = that.lstCities.filter(x => x.state == id);
    vcity.unshift({ 'CityId': -1, 'Cityname': 'Select City' })
    
    var data = $.map(vcity, function (obj) {
                      debugger;
                      obj.id = obj.CityId;
                      obj.text = obj.Cityname;
                      return obj;
                      
                    });


    if (vcity != undefined) {
      (<any>$('#Scity')).select2({
        data: data
      });
    }

    $('#Scity').val(-1).trigger('change');   

    <any>$('#Scity').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                  var name = ((<any>e).params.data.text);
                  that.sCCId = id;
                 that.f.ShipCityId.setValue(that.sCCId)
                  that.sccName = name;
     
              
                
              }
              catch(error){}
            }
          });

  }


  private BindBankCities(that: this, id: any) {
    $('#Bankcity').empty();

    var vcity = that.lstCities.filter(x => x.state == id);
    vcity.unshift({ 'CityId': 0, 'Cityname': '' })
    
    var data = $.map(vcity, function (obj) {
                      debugger;
                      obj.id = obj.CityId;
                      obj.text = obj.Cityname;
                      return obj;
                      
                    });


    if (vcity != undefined) {
      (<any>$('#Bankcity')).select2({
        data: data
      });
    }



    <any>$('#Bankcity').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;
              try {
                e.preventDefault()
                var id = ((<any>e).params.data.id);
                var name = ((<any>e).params.data.text);
                that.BankCCId = id;
                that.BankcityName = name;

                that.f.BankcityId.setValue(that.BankCCId)

                
              }
              catch(error){}
            }
          });

  }



  LoadStates() {
    var that = this;
    try {
      this.lstDbResult =[]
       this.APICall.DBCalling("ViewStateByCountry", "", "All", '', this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger
          this.lstDbResult = JSON.parse(res['Message']);
           

          this.lstStates = [];
         
         if(this.lstDbResult.Table.length > 0) {
           this.lstStates=this.lstDbResult.Table;


           that.BindVendorStates(that, this.StoreVendor.VendorCountryId);

         this.VendorStateName= this.StoreVendor.VendorStateName;
          this.f.VendorStateId.setValue(this.StoreVendor.VendorStateId)
           var vendorStateSelection = new Option( this.VendorStateName,this.f.VendorStateId.toString(), true, true);
           (<any>$('#VState')).append(vendorStateSelection).trigger('change');
         

          }

        });
    
    }
  
    catch (error) { }
  }

  VendorCityId: number = 0;
  bCCId: number = 0;
  bcityName: string = "";

  sCCId: number = 0;
  sccName: string = "";

  BankCCId: number = 0;
  BankcityName: string = "";
  VendorCityName:string="";
  lstCities: any = [];
  lstBillCities:any=[];
  lstConstCities:any=[];
  lstShipCities:any=[];
 


  LoadCities() {
    var that = this;

    try {
      this.lstDbResult =[];
       this.APICall.DBCalling("ViewCityByState", "", "All", '', this.APICall.GetCompanyID()).subscribe(
        (res: Response) => {
          debugger;
          this.lstDbResult = JSON.parse(res['Message']);
          this.lstCities = [];


          if (this.lstDbResult.Table.length > 0) {
this.lstCities=this.lstDbResult.Table;

if(this.StoreVendor.VendorId>0)
{
that.BindVendorCities(that, this.StoreVendor.VendorStateId);
           
var vendorStateSelection = new Option(this.StoreVendor.VendorCityName, this.StoreVendor.VendorCityId.toString(), true, true);
(<any>$('#VCity')).append(vendorStateSelection).trigger('change');
}

          }
        });
    }
    catch (error) { }
  }
  
  lstItems: any = [];
  // ViewVendorItems()
  // {   
  //   if(AppSettings.ShowLoaderOnView)
  //     {
  //     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

  //  $("#loaderParent").show();
  //     }
  //     var sstring="";
  //    
  //     this.APICall.DBCalling("VendorItemsView",sstring,this.FilterType,this.StoreVendor.VendorId,this.APICall.GetCompanyID()).subscribe(
  //       (res:Response) => {
  //         
  //         this.lstDbResult=JSON.parse(res['Message']);        

  //         this.lstItems=[];
  //         if(this.lstDbResult.Table.length>0)
  //         {
  //           this.lstItems=this.lstDbResult.Table;            
  //         }

  //         $("#loaderParent").hide();
  //       });
  // }


  BankAdd() {
debugger;

    this.bankIndx = -1;
    this.SNO = 1;
    this.EditRecNO = -1;
    var country='selectCountry' 
    var countryId=0   
    var State='select state' 
    var stateId=0   ;
    var cityId=0;
    var cityname='select city'

    var billingCountry = new Option(country, countryId.toString() , true, true);
    (<any>$('#banksCountry')).append(billingCountry).trigger('change');
    var BANKSTATE = new Option(State, stateId.toString() , true, true);
    (<any>$('#Bankstate')).append(BANKSTATE).trigger('change');

    var cityselection = new Option(cityname, cityId.toString() , true, true);
    (<any>$('#Bankcity')).append(cityselection).trigger('change');



    this.CreateVendor.patchValue({
      AccountNo1: "",
      TextBoxColumn_BankName_1: "",
      BanksCountryId:0,
      BankstateId:0,
      BankStreet1:'',
      BankStreet2:'',
      BankcityId:0,
      Bankpincode:0,
      BranchName2: "",
      IFSCCode3: "",

    });

    var data = $.map(this.lstCountries, function (obj) {
      obj.id = obj.CountryId;
      obj.text = obj.countryname
      return obj;
    });
    debugger;
   
    var that = this;
    (<any>$('#banksCountry')).select2({
      data: data
    });
    
    <any>$('#banksCountry').on("select2:select", function (e) {
      if (typeof ((<any>e).params.data.id) != 'undefined') {
        try {
          e.preventDefault()
          debugger;
          var id = ((<any>e).params.data.id);
          var name = ((<any>e).params.data.text);
          that.bankCId = id;
          that.bankcName = name;
          that.f.BanksCountryId.setValue(id)
          $('#Bankstate').empty();


          that.BindBankStates(that, id);

  
  

} catch (e) { }
}

});

   
  }



  ContactAdd() {
    

    this.SNO = 1;
    this.EditRecNO = -1;

    this.CreateVendor.patchValue({


      ContactName0: "",
      ContactNo1: "",
      Email2: "",


    });


  }
  // transportAdd()

  // {
  // 
  // this.EditRecNO=-1;
  // this.SNO= 1;


  // this.CreateVendor.patchValue({


  // area:"",
  // transportername:"",
  // //WEF:'',


  // });
  // $('#drptransport').val(null).trigger('change');


  // }
  OnshippingAdd() {
    

    this.SNO = 1;
    this.EditRecNO = -1;

    this.CreateVendor.patchValue({


      Address11: "",
      Address22: "",
      Address33: "",
      Country4Id: 0,
      State5Id: 0,
      City6Id: 0,
      ShippingName0: "",



      //WEF:'',


    });
    (<any>$('#drpshippingsCountry')).append(null).trigger('change');
    (<any>$('#drpshippingState')).append(null).trigger('change');
    (<any>$('#drpshippingCity')).append(null).trigger('change');

  }



  submitted = false;

  getStatus() {
    
    var value = false;
    if (this.f.iscompany.value == true) {
      value = true;
    }
    return value;

  }
  validateEmail : string = "";
  validateCountry : string = "";


  
 
  OnSave() {
    
    debugger;
     this.submitted = true;
   
    var Cvalid = true;
   
 
  var ct1=this.f.Contactno.value;
  if( this.f.Contactno.touched==true  || ct1.length!=10) {
    Cvalid=false;
    this.submitted = true;
    
  }


  if( this.f.email.touched && this.f.email.status=='INVALID' ) {
     Cvalid=false;
    
  }

  if(this.lstBillingAddresses.length==0){
   this.errromsge='Please fill the Billing Tab'
   Cvalid=false;
  }
   if(this.f.VendorCityId.value!=0 && this.f.VendorCountryId.value!=0 &&
       this.f.VendorStateId.value!=0 && this.f.CompanyAddress1.value!='' && ct1.length==10  ){
        Cvalid=true;
       }else{
       Cvalid=false;
       }

    if ( Cvalid) {
      this.SaveVendor();
    } 


  }
  //#endregion "OnSave"
  //#region "Save city"
  DbResult: any = [];
  lstVendor: any = [];
 
  lstTransport: any = [];

  VBID: number = 0;
  vndrID: number = 0;
  VShpBID: number = 0;
  errromsge:string=''
  SaveVendor() {
    debugger;
    this.submitted = true;
    var valStatus: any = this.getStatus();
    if (this.f.VendorId.value > 0) {
     
    }
    
   debugger;
    var itemsrow = "";
    var xxxx = "";
    if (this.lstItems != null && this.lstItems != undefined) {
      for (var i = 0; i < this.lstItems.length; i++) {

        var val = this.lstItems[i].Id;
        if (val == undefined || val == null) {
          val = 0;
        }
if(this.StoreVendor.lstShippingdetails.length>0){
  this.ShipID = this.StoreVendor.lstShippingdetails[0].ID;
}else{
  this.ShipID=0
}
        
        debugger;

        itemsrow = itemsrow + '<Table2><VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'
          + '<Id>' + val + '</Id>'
          + '<ItemId>' + this.lstItems[i].ItemId + '</ItemId>'
          + '<PartNo>' + this.lstItems[i].partNo + '</PartNo>'
          + '<MakeId>' + this.lstItems[i].MakeId + '</MakeId>'
          + '<Make>' + this.lstItems[i].Make + '</Make>'
          + '<UOMId>' + this.lstItems[i].UOMId + '</UOMId>'
          + '<UOM>' + this.lstItems[i].UOM + '</UOM>'
          + '<Rate>' + this.lstItems[i].Price + '</Rate>'
          + '<Description>' + this.lstItems[i].Description + '</Description>'
          + '<ModifiedBy>' + this.APICall.GetUserName() + '</ModifiedBy>'
          + '<ModifiedDate>' +  this.lstItems[i].ModifiedDate + '</ModifiedDate>'
          + '</Table2>'
      }
      debugger;
    }
    

    debugger;
    
    var xml1 = '<NewDataSet><Table1>'
      + '<VendorId>' + this.getControlValue(this.f.VendorId, 'int') + '</VendorId>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<vendorcode>' + this.getControlValue(this.f.vendorcode, 'string') + '</vendorcode>'
      + '<country>' + this.f.VendorCountryId.value + '</country>'
      + '<state>' + this.f.VendorStateId.value + '</state>'
      + '<shortname>' + this.getControlValue(this.f.shortname, 'string') + '</shortname>'
      + '<city>' + this.f.VendorCityId.value + '</city>'
      + '<iscompany>' + valStatus + '</iscompany>'
      + '<Date>' + this.getControlValue(this.f.VendorDate, 'string') + '</Date>'
      + '<currency>' + this.f.CurrencyId.value + '</currency>'
      + '<companyname>' + this.getControlValue(this.f.companyname, 'string') + '</companyname>'
      + '<gstno>' + this.getControlValue(this.f.gstno, 'string') + '</gstno>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'int') + '</Contactno>'
      + '<email>' + this.getControlValue(this.f.email, 'string') + '</email>'
      + '<vendortype>' + this.FilterBy + '</vendortype>'
      + '<BusinessType>' + this.f.BusinessType.value + '</BusinessType>'
      + '<PurchaseType>' + this.f.PurchaseType.value + '</PurchaseType>'
      + '<website>' + this.getControlValue(this.f.website, 'string') + '</website>'
      + '<creditlimit>' + this.getControlValue(this.f.creditlimit, 'string') + '</creditlimit>'
      + '<creditdays>' + this.getControlValue(this.f.creditdays, 'string') + '</creditdays>'
      + '<maxbill>' + this.getControlValue(this.f.maxbill, 'string') + '</maxbill>'
      + '<creditrating>' + this.getControlValue(this.f.creditrating, 'int') + '</creditrating>'
      + '<vendorrating>' + this.getControlValue(this.f.vendorrating, 'int') + '</vendorrating>'
      + '<vendorclass>' + this.getControlValue(this.f.vendorclass, 'int') + '</vendorclass>'
      + '<address1>' + this.getControlValue(this.f.CompanyAddress1, 'string') + '</address1>'
      + '<address2>' + this.getControlValue(this.f.CompanyAddress2, 'string') + '</address2>'
      + '<address3>' + this.getControlValue(this.f.address3, 'string') + '</address3>'
      + '<pincode>' + this.getControlValue(this.f.Vpin, 'string') + '</pincode>'
      + '<coaid>' + this.getControlValue(this.f.coaid, 'int') + '</coaid>'

      + '<CompanyAddress1>' + this.lstBillingAddresses[0].Address1 + '</CompanyAddress1>'
      + '<CompanyAddress2>' + this.lstBillingAddresses[0].Address2 + '</CompanyAddress2>'
      + '<CompanyCountry>' + this.lstBillingAddresses[0].CountryID + '</CompanyCountry>'
      + '<CompanyState>' + this.lstBillingAddresses[0].StateId + '</CompanyState>'
      + '<CompanyCity>' + this.lstBillingAddresses[0].CityId + '</CompanyCity>'
      + '<CompanyPincode>' + this.lstBillingAddresses[0].Pin + '</CompanyPincode>'
      + '<Image>' + this.getControlValue(this.f.Image, 'string') + '</Image>'
      + '<vendorname>' + this.getControlValue(this.f.vendorname, 'string') + '</vendorname>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '</Table1>'
      + itemsrow + '</NewDataSet>';
    var xml2 = "";
    var rows = "";
    debugger;

    if (this.lstbankdetails != null && this.lstbankdetails != undefined) {
      for (var i = 0; i < this.lstbankdetails.length; i++) {
        rows = rows + '<Table1><ID>' + this.VBID + '</ID>'
          + '<VendorId>' + this.getControlValue(this.f.VendorId, 'int')+ '</VendorId>' // this.vndrID 
          + '<CurrencyType>' + this.lstbankdetails[i].CurrencyType + '</CurrencyType>'
          + '<Name>' + this.lstbankdetails[i].Name + '</Name>'
          + '<AccountNo>' + this.lstbankdetails[i].AccountNo + '</AccountNo>'
          + '<IFSCcode>' + this.lstbankdetails[i].IFSCcode + '</IFSCcode>'
          + '<BeneficiaryName>' + this.lstbankdetails[i].BeneficiaryName + '</BeneficiaryName>'
          + '<SwiftCode>' + this.lstbankdetails[i].SwiftCode + '</SwiftCode>'
          + '<ABAno>' + this.lstbankdetails[i].ABAno + '</ABAno>'
          + '<RoutingNo>' + this.lstbankdetails[i].RoutingNo + '</RoutingNo>'
          + '<SortCode>' + this.lstbankdetails[i].SortCode + '</SortCode>'
          + '<Address1>' + this.lstbankdetails[i].Address1 + '</Address1>'
          + '<Address2>' + this.lstbankdetails[i].Address2 + '</Address2>'
          + '<Country>' + this.lstbankdetails[i].Country + '</Country>'
          + '<State>' + this.lstbankdetails[i].State + '</State>'
          + '<City>' + this.lstbankdetails[i].City + '</City>'
          + '<Pin>' + this.lstbankdetails[i].Pin + '</Pin></Table1>'
      }
      xml2 = '<NewDataSet>' + rows + '</NewDataSet>';
    }
    

    var xml3 = "";
    var rows = "";
    
    

    if (this.lstShippingdetails != undefined && this.lstShippingdetails != null) {
      for (var i = 0; i < this.lstShippingdetails.length; i++) {
        rows = rows + '<Table1><ID>' +  this.ShipID + '</ID>'
          + '<VendorId>' + this.getControlValue(this.f.VendorId, 'int') + '</VendorId>'
          + '<SiteName>' + this.lstShippingdetails[i].SiteName + '</SiteName>'
          + '<ContactName>' + this.lstShippingdetails[i].ContactName + '</ContactName>'
          + '<Address1>' + this.lstShippingdetails[i].Address1 + '</Address1>'
          + '<Address2>' + this.lstShippingdetails[i].Address2 + '</Address2>'
          + '<Country>' + this.lstShippingdetails[i].CountryID + '</Country>'
          + '<State>' + this.lstShippingdetails[i].StateID + '</State>'
          + '<City>' + this.lstShippingdetails[i].CityID + '</City>'
          + '<Pincode>' + this.lstShippingdetails[i].Pincode + '</Pincode></Table1>'
      }
      xml3 = '<NewDataSet>' + rows + '</NewDataSet>';
    }
    debugger;

    var xml4 = "";
    var rows = "";
    

    if (this.lstContact != undefined && this.lstContact != null) {
      for (var i = 0; i < this.lstContact.length; i++) {
        rows = rows + '<Table1><ID>' + this.VShpBID + '</ID>'
          + '<VendorId>' + this.getControlValue(this.f.VendorId, 'int') + '</VendorId>'
          + '<ContactName>' + this.lstContact[i].ContactName + '</ContactName>'
          + '<Designation>' + this.lstContact[i].Designation + '</Designation>'
          + '<MobileNo>' + this.lstContact[i].MobileNo + '</MobileNo>'
          + '<WhatsappNo>' + this.lstContact[i].WhatsappNo + '</WhatsappNo>'
          + '<Email>' + this.lstContact[i].Email + '</Email>'
          + '<Note>' + this.lstContact[i].Note + '</Note></Table1>'
      }
      xml4 = '<NewDataSet>' + rows + '</NewDataSet>';
    }

    
    debugger;
    
    this.APICall.DBCalling("SaveVendor", xml1, xml2, xml3, xml4).subscribe(
      (res: Response) => {
    
        
        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);
        debugger;
        
        
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if (this.f.VendorId.value > 0) {
          debugger;
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Updated successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          } else {
            //  this.Createcity.patchValue({

              

            // this.f.VendorId.setValue(this.DbResult.Table[0].VendorId);
            
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Saved successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          }
    

          // this.lstVendor = null;
         // this.lstVendor = [];
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if (this.DbResult.Table1.length > 0) {
              if (this.DbResult.Table.length > 0) {
              }

            }


          }
        } else {


          

          if (this.DbResult.Table[0].DBresult == -3) {
            (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Customer Already Exists.!',
              confirmButtonText: 'Dismiss',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-warning'
            });
          } else {

            if (this.DbResult.Table[0].DBresult == -5) {

              var that = this;
    
              

              (window as any).swal({
                icon: "warning",
                title: "Transaction modified by " + this.DbResult.Table[0].ModifiedBy + "! ",
                text: "Do you wants to overwrite?",

                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(function (isConfirm) {

                if (isConfirm) {
                  debugger;
                  that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;

                  that.SaveVendor();
                } else {
                  (window as any).swal("Cancelled", "this file is not updated :)", "error");
                }

              });


            } else {
              

              (window as any).swal({
                icon: 'error',
                title: 'Error!',
                text: 'failed.!',
                confirmButtonText: 'Dismiss',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-danger'
              });
            }

          }
        }

        //console.log('Sucsess');
      },
      err => {
        (window as any).swal({
          icon: 'error',
          title: 'Error!',
          text: 'Network Error Please Try Again .!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-danger'
        });
      }
    );

  }

  SNO = 1;
  BankDetailsClear() {
    
    this.CreateVendor.patchValue({

      AccountNo1: "",
      TextBoxColumn_BankName_1: "",
      BranchName2: "",
      IFSCCode3: "",


    });

    // $('#drpVehicleModel').val(null).trigger('change');
    if (this.lstbankdetails.length > 0) {
      this.SNO = this.lstbankdetails.length + 1;
    } else {
      this.lstbankdetails.length === 0;
    }

  }
  ShippingDetailsClear() {

    this.CreateVendor.patchValue({

      ShippingName0: "",
      Address11: "",
      Address22: "",
      Address33: "",
      Country4Id: 0,
      State5Id: 0,
      City6Id: 0,



    });

    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstShippingdetails.length + 1;


  }

  ContactDetailsClear() {
    
    this.CreateVendor.patchValue({

      ContactName0: "",
      ContactNo1: "",
      Email2: "",
      Notes3: "",




    });

    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstContact.length + 1;


  }
  // CustomerTransporterClear()
  // {

  // this.CreateVendor.patchValue({
  //   transportername:"",
  //   area:"",



  // });

  // // $('#drpVehicleModel').val(null).trigger('change');
  //   this.SNO=this.lstTransport.length+1;


  // }
  //#endregion "Save city"

  //#region "Search"
  SearchClick() {

    this.GetSearchDetails();
    this.GetShippingDetails1();
    this.GetContactDetails1();
    //this.GetTransportDetails1();
  }

  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Purchase/Vendor');
    this.router.navigate(['Purchase/Vendor']);
  }
  FilterType = 'All'
  GetSearchDetails() {

    
    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstbankdetails.length; i++) {

        if (

          (this.lstbankdetails[i].AccountNo1).toString().includes(SearchString) ||
          (this.lstbankdetails[i].TextBoxColumn_BankName_1).toString().includes(SearchString) ||
          (this.lstbankdetails[i].BranchName2).toString().includes(SearchString) ||
          (this.lstbankdetails[i].IFSCCode3).toString().includes(SearchString)


          //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {

          this.lstbankdetails[i].Show = 'true';
        } else {
          this.lstbankdetails[i].Show = 'false';

        }
      }

    }
    return SearchString;

  }
  GetShippingDetails1() {

    
    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField1();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstShippingdetails.length; i++) {

        if (

          (this.lstShippingdetails[i].ShippingName0).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].Address11).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].Address22).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].Address33).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].Country4Id).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].State5Id).toString().includes(SearchString) ||
          (this.lstShippingdetails[i].City6Id).toString().includes(SearchString)


          //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {

          this.lstShippingdetails[i].Show = 'true';
        } else {
          this.lstShippingdetails[i].Show = 'false';

        }
      }

    }
    return SearchString;

  }
  GetContactDetails1() {

    
    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField2();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstContact.length; i++) {

        if (

          (this.lstContact[i].ContactName0).toString().includes(SearchString) ||
          (this.lstContact[i].ContactNo1).toString().includes(SearchString) ||
          (this.lstContact[i].Email2).toString().includes(SearchString) ||
          (this.lstContact[i].Notes3).toString().includes(SearchString)



          //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {

          this.lstContact[i].Show = 'true';
        } else {
          this.lstContact[i].Show = 'false';

        }
      }

    }
    return SearchString;

  }
  // GetTransportDetails1()
  // {

  // 
  // var  SearchString="";
  // if(this.FilterType!='All')
  // {
  //   this.PrepareSerchStringByField3();
  // }
  // else
  // {
  //   SearchString=  this.getControlValue(this.f.SearchString,"string")

  //   for(var  i=0;i<this.lstTransport.length;i++)
  //   {

  //    if (

  //     (this.lstTransport[i].transportername).toString().includes(SearchString)  ||
  //     (this.lstTransport[i].area).toString().includes(SearchString)  




  //     //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
  //     )
  //    {

  //    this.lstTransport[i].Show='true';
  //   }else{
  //    this.lstTransport[i].Show='false';

  //   }
  // }

  // }
  // return SearchString;

  // }
  SerchType = 'Like'

  //#endregion "Search"
  PrepareSerchStringByField() {

    var Name = this.getControlValue(this.f.AccountNo1, "string");

    
    if (this.SerchType == 'Like') {


      if (Name != "") {
        for (var i = 0; i < this.lstbankdetails.length; i++) {

          if ((this.lstbankdetails[i].AccountNo1).int().includes(Name)) {



            this.lstbankdetails[i].Show = 'true';
          } else {
            this.lstbankdetails[i].Show = 'false';


          }
        }
      }


    }
    else {

      if (Name != "") {
        for (var i = 0; i < this.lstbankdetails.length; i++) {

          if ((this.lstbankdetails[i].AccountNo1) == (Name)) {

            this.lstbankdetails[i].Show = 'true';
          } else {
            this.lstbankdetails[i].Show = 'false';


          }
        }
      }


    }


  }
  PrepareSerchStringByField1() {

    var Name = this.getControlValue(this.f.ShippingName0, "string");

    
    if (this.SerchType == 'Like') {


      if (Name != "") {
        for (var i = 0; i < this.lstShippingdetails.length; i++) {

          if ((this.lstShippingdetails[i].ShippingName0).int().includes(Name)) {



            this.lstShippingdetails[i].Show = 'true';
          } else {
            this.lstShippingdetails[i].Show = 'false';


          }
        }
      }


    }
    else {

      if (Name != "") {
        for (var i = 0; i < this.lstShippingdetails.length; i++) {

          if ((this.lstShippingdetails[i].ShippingName0) == (Name)) {

            this.lstShippingdetails[i].Show = 'true';
          } else {
            this.lstShippingdetails[i].Show = 'false';


          }
        }
      }


    }


  }
  PrepareSerchStringByField2() {

    var Name = this.getControlValue(this.f.ContactNo1, "string");

    
    if (this.SerchType == 'Like') {


      if (Name != "") {
        for (var i = 0; i < this.lstContact.length; i++) {

          if ((this.lstContact[i].ContactNo1).int().includes(Name)) {



            this.lstContact[i].Show = 'true';
          } else {
            this.lstContact[i].Show = 'false';


          }
        }
      }


    }
    else {

      if (Name != "") {
        for (var i = 0; i < this.lstContact.length; i++) {

          if ((this.lstContact[i].ContactNo1) == (Name)) {

            this.lstContact[i].Show = 'true';
          } else {
            this.lstContact[i].Show = 'false';


          }
        }
      }


    }


  }
  // PrepareSerchStringByField3()
  // {

  // var Name=this.getControlValue(this.f.transportername,"string");

  // 
  //     if(this.SerchType=='Like')
  //     {


  //       if(Name!="")
  //       {
  //         for(var  i=0;i<this.lstTransport.length;i++)
  //            {

  //             if ((this.lstTransport[i].transportername).int().includes(Name)  )
  //             {



  //             this.lstTransport[i].Show='true';
  //            }else{
  //             this.lstTransport[i].Show='false';


  //            }
  //       }
  //     }


  //     }
  //     else
  //     {

  //       if(Name!="")
  //       {
  //         for(var  i=0;i<this.lstTransport.length;i++)
  //            {

  //             if ((this.lstTransport[i].transportername)==(Name)  )
  //             {

  //             this.lstTransport[i].Show='true';
  //            }else{
  //             this.lstTransport[i].Show='false';


  //            }
  //       }
  //       }


  //     }


  // }


  
  //#region "ShortCuts"
  @HostListener('window:keydown', ['$event'])



  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.ctrlKey || event.metaKey) {

      switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
          event.preventDefault();
          this.OnSave();

          break;

        case 'a':

          event.preventDefault();
          this.ClearViewData();

          break;


        case 'd':
          event.preventDefault();
          this.OnDelete();
          break;
        case 'o':
          event.preventDefault();
          this.Search();

          break;
      }
    }

  }
  //#endregion "ShortCuts"


  //#region "Delete city"

  DeleteVendor() {


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    
    var xml1 = '<NewDataSet><Table1>'
      + '<VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'

      + '<vendorname>' + this.getControlValue(this.f.vendorname, 'string') + '</vendorname>'


      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
     
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'

      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeleteVendor", xml1, "", "", "").subscribe(
      (res: Response) => {

        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          this.ClearViewData();

          (window as any).swal({
            icon: 'success',
            title: 'Information!',
            text: 'Record Deleted successfully.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-success'
          });


        }
        else {
          (window as any).swal({
            icon: 'error',
            title: 'Error!',
            text: 'failed.!',
            confirmButtonText: 'Dismiss',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-danger'
          });
        }

      },
      err => {
        (window as any).swal({
          icon: 'error',
          title: 'Error!',
          text: 'Network Error Please Try Again .!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-danger'
        });
      }
    );
  }
  OnDelete() {

    var that = this;
    

    (window as any).swal({
      icon: "warning",
      title: "Are you sure?",
      text: "You will not be able to recover this record!",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {

      if (isConfirm) {

        that.DeleteVendor();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }


    });

  }

  //#endregion "Delete city"

  //#region "Clear ViewData"
  NumberSequenceValueChange(value) {
    
    this.f.SequenceNumberId.setValue(value);

  }
  ClearViewData() {
    debugger;
 
    this.ModifiedDate = "";
    this.VendorStateName='';
    this.VendorCityName='';
    this.vcName='';
    this.VendorCountryId = 0;
 
    this.StoreVendor.vendorCountryName='';
    this.StoreVendor.VendorCountryId=0;
    this.lstBillingAddresses=[];
    this.StoreVendor = new Vendor;
    this.CreateVendor.patchValue({
      vendorname: "",
      vendorcode: "",
      country: 0,
      VendorCountryId:0,
      VendorStateId:0,
      VendorCityId:0,
      BillCountryId:0,
      BillStateId:0,
      BillCityId:0,
      ShipCountryId:0,
      ShipStateId:0,
      ShipCityId:0,
      companyname:'',
      BanksCountryId:0,
      BankstateId:0,
      BankcityId:0,
      shortname: "",
      SequenceNumberId: 0,
      city: "",
      iscompany: "",
      CompanyAddress1:"",
      CompanyAddress2:"",
      gstno: "",
      Contactno: "",
      email: "",
      website: "",
      creditlimit: "",
      creditdays: "",
      maxbill: "",
      creditrating: "",
      vendorrating: "",
      vendorclass: "",
      pincode: "",
      address1: "",
      address2: "",
      Image: "",
      Vpin:0,
      //Citycode:"",
      address3: "",
      state: "",
      coaid: 0,
      panno: "",
    

    });
this.Vendorcode=''
    this.DispalyAccountName = "";
    //this.Displaytransportname="";
    this.DisplayCOAId = "0";
    this.BankDetailsClear();
    this.ShippingDetailsClear();
    this.ContactDetailsClear();
    // this.CustomerTransporterClear();
    this.lstVendor = [];
    this.lstItems = [];
    this.lstbankdetails = null;
    this.lstShippingdetails = null;
    this.lstContact = null;
    this.lstTransport = null;
    this.f.LineChanges.setValue(0);
    this.DisplaySequenceNumberId = 0;
    this.f.LineChanges1.setValue(0);
    this.f.LineChanges2.setValue(0);
    this.f.LineChanges3.setValue(0);
    $("#Image").attr("src", "");
    (<any>$('#drpshippingsCountry')).val(null).trigger('change');
    (<any>$('#drpshippingState')).val(null).trigger('change');
    (<any>$('#drpshippingCity')).val(null).trigger('change');
    // (<any> $('#drptransport')).val(null).trigger('change');
    (<any>$('#drptransport')).val(null).trigger('change');
        $('#Vcountry').empty();
        $('#VState').empty()
        $('#Vcity').empty()

    this.StoreVendor = new Vendor;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreVendor.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreVendor));

  }
  //end#region "Clear ViewData"
  //#region "getControlValue"
  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  //#endregion "getControlValue"



  get f() {
    return this.CreateVendor.controls;
  }
  ModifiedDate : string = "";

  //#region "View OnInit"
  DeviceType = "";
  StoreVendor: Vendor;
  VendorBillingAddressSame=0
  CompanyAddressChecked(target){
    debugger;
   var Check= target;
   
    this.VendorBillingAddressSame =1;
    if(Check==true){
      this.CreateVendor.patchValue({
        address1:this.f.CompanyAddress1.value,
        address2:this.f.CompanyAddress2.value,
        BillCountryId:this.f.VendorCountryId.value,
        BillStateId:this.f.VendorStateId.value,
        BillCityId:this.f.VendorCityId.value,
        Bpin:this.f.Vpin.value
      })
      debugger;
     var country=this.lstCountries
     
      var data = $.map(country, function (obj) {
        obj.id = obj.CountryId;
        obj.text = obj.countryname
        return obj;
      });
  
     
      (<any>$('#Bcountry')).select2({
        data: data
      });
      this.bCId=this.f.BillCountryId.value;
     // this.billCountryName =this.vcName;
    
      $('#Bcountry').val(this.f.BillCountryId.value).trigger('change')
      
      
     var BStates = this.lstStates.filter(x => x.country == this.f.BillCountryId.value );
      var data = $.map(BStates, function (obj) {
        obj.id = obj.StateId;
        obj.text = obj.Statename;
        return obj;
      });
  
     
      (<any>$('#Bstate')).select2({
        data: data
      });
       this.bSId = this.f.BillStateId.value;
    this.bsName = this.VendorStateName;
      var billingState = new Option(this.bsName , this.bSId.toString(), true, true);
      (<any>$('#Bstate')).append(billingState).trigger('change');

  //  $('#Bstate').val(this.f.BillStateId.value).trigger('change')
   
    var bCITIES = this.lstCities.filter(x => x.state == this.f.BillStateId.value );
      var data = $.map(bCITIES, function (obj) {
        obj.id = obj.CityId;
        obj.text = obj.Cityname;
        return obj;
      });
    
      (<any>$('#Bcity')).select2({
        data: data
      });
      
      this.bCCId = this.f.BillCityId.value;
      this.bcityName =this.VendorCityName; ;
      var billingCity = new Option(this.bcityName , this.bCCId.toString(), true, true);
      (<any>$('#Bcity')).append(billingCity).trigger('change');
     // $('#Bcity').val(this.f.BillCityId.value).trigger('change')

    }else{
      this.CreateVendor.patchValue({
        address1:'',
        address2:'',
        BillCountryId:'',
        BillStateId:'',
        BillCityId:'',
        Bpin:''
      })
      this.bsName='';
      this.bcityName='';
      this.bCCId=0
      this.bcityName='';
      $('#Bstate').empty();   
      $('#Bcity').empty();
      $('#Bcountry').empty();
      
      var country=this.lstCountries
     
      var data = $.map(country, function (obj) {
        obj.id = obj.CountryId;
        obj.text = obj.countryname
        return obj;
      });
  
     
      (<any>$('#Bcountry')).select2({
        data: data
      });
      this.bCId=this.f.BillCountryId.value;
     // this.billCountryName =this.vcName;
    
      $('#Bcountry').val(this.f.BillCountryId.value).trigger('change')
      
      
     var BStates = this.lstStates.filter(x => x.country == this.f.BillCountryId.value );
      var data = $.map(BStates, function (obj) {
        obj.id = obj.StateId;
        obj.text = obj.Statename;
        return obj;
      });
  
     
      (<any>$('#Bstate')).select2({
        data: data
      });
       this.bSId = this.f.BillStateId.value;
    this.bsName = '';
      var billingState = new Option(this.bsName , this.bSId.toString(), true, true);
      (<any>$('#Bstate')).append(billingState).trigger('change');

  //  $('#Bstate').val(this.f.BillStateId.value).trigger('change')
   
    var bCITIES = this.lstCities.filter(x => x.state == this.f.BillStateId.value );
      var data = $.map(bCITIES, function (obj) {
        obj.id = obj.CityId;
        obj.text = obj.Cityname;
        return obj;
      });
    
      (<any>$('#Bcity')).select2({
        data: data
      });
     
      this.bCCId = this.f.BillCityId.value;
      this.bcityName =''; ;
      var billingCity = new Option(this.bcityName , this.bCCId.toString(), true, true);
      (<any>$('#Bcity')).append(billingCity).trigger('change');
    }
    
   

  }


 
  editbindata:object={}

  ngOnInit() {
    
    
    this.DeviceType = localStorage.getItem('DeviceType')

    this.StoreVendor = new Vendor;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    
    this.LoadParts()

    this.LoadCountries();
    this.LoadStates();
    this.LoadCities();
    debugger;
 

    var result1 = this.store.source['value']['Tab'].filter((x) => { return (x.TabId == ActivatedRoute && x.ViewName == "RequestFromDC"); });
    if (result1.length > 0) {
      debugger;
      this.StoreVendor = result1[0];
      var VendorId = this.StoreVendor.VendorId;
      this.submitted = Boolean(this.StoreVendor.submitted);
      this.f.vendorname.setValue(this.StoreVendor.vendorname1)
      this.f.vendorcode.setValue(this.StoreVendor.vendorcode1)
      this.f.iscompany.setValue('true')
      //this.f.Address22.setValue
      this.CreateVendor.patchValue(this.StoreVendor);
      this.StoreVendor.TabId = ActivatedRoute;
      this.viewcustomer(VendorId);
    } else {
      
      var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
      if (result.length > 0) {
      
        
        this.StoreVendor = result[0];

       if( this.StoreVendor.BusinessType==='Purchase'){
        var Checkedstatus=this.StoreVendor.PurchaseType;
        this.f.BusinessType.setValue(Checkedstatus)
       }else if(this.StoreVendor.BusinessType==='SalesAndPurchase'){
        var Checkedstatus=this.StoreVendor.PurchaseType;
        this.f.BusinessType.setValue(Checkedstatus)
       }else{
        this.f.BusinessType.setValue('')
       }
       if(this.StoreVendor.vendorType==='Company'){
        this.f.VendorType.setValue(this.StoreVendor.vendorType)
       }else if(this.StoreVendor.vendorType==='Individual'){
        this.f.VendorType.setValue(this.StoreVendor.vendorType)
        this.Individual()
       }else{
        this.f.VendorType.setValue('')
       }
       this.Vendorcode=this.StoreVendor.vendorcode;
        this.vcName= this.StoreVendor.vendorCountryName
        // this.VendorStateName=this.StoreVendor.VendorStateName
         this.VendorCityName=this.StoreVendor.VendorCityName;
       // this.f.VendorId.setValue(this.StoreVendor.VendorId)
        debugger;
        this.ModifiedDate = this.StoreVendor.ModifiedDate;
        this.StoreVendor.TabId = ActivatedRoute;
        this.lstItems=this.StoreVendor.lstItems;
        this.submitted = Boolean(this.StoreVendor.submitted);
        if(this.StoreVendor.VendorDate==''){
          var newdate =formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.StoreVendor.VendorDate=newdate;
        }
        this.CreateVendor.patchValue(this.StoreVendor);
     
    
      }
      

      this.BindControlData();

     
  
    }


  }


  private BindControlData() {
    var that = this;
          debugger;

    this.DisplayCOAId = this.StoreVendor.coaid;
    this.DispalyAccountName = this.StoreVendor.AccountName;
    this.lstContact = this.StoreVendor.lstContact;
    this.lstShippingdetails = this.StoreVendor.lstShippingdetails;
    this.lstTransport = this.StoreVendor.lstTransport;
    this.lstbankdetails = this.StoreVendor.lstbankdetails;
    this.lstVendor = this.StoreVendor.lstVendor;
    this.lstItems = this.StoreVendor.lstItems;
    this.lstBillingAddresses = this.StoreVendor.lstBilling;
    debugger;

    this.CreateVendor.valueChanges.subscribe(value => {
     
      that.StoreVendor.SequenceNumberId = value.SequenceNumberId;
      that.StoreVendor.vendorname = value.vendorname;
      that.StoreVendor.vendorcode = value.vendorcode;
      that.StoreVendor.country = value.country;
      that.StoreVendor.shortname = value.shortname;
      that.StoreVendor.city = value.city;
      that.StoreVendor.iscompany = value.iscompany;
      that.StoreVendor.gstno = value.gstno;
      that.StoreVendor.Contactno = value.Contactno;
      that.StoreVendor.email = value.email;
      that.StoreVendor.website = value.website;
      that.StoreVendor.creditlimit = value.creditlimit;
      that.StoreVendor.creditdays = value.creditdays;
      that.StoreVendor.maxbill = value.maxbill;
      that.StoreVendor.creditrating = value.creditrating;
      that.StoreVendor.vendorrating = value.vendorrating;
      that.StoreVendor.vendorclass = value.vendorclass;
      that.StoreVendor.address1 = value.address1;
      that.StoreVendor.address2 = value.address2;
      that.StoreVendor.countryname = value.countryname;
      that.StoreVendor.statename = value.statename;

      that.StoreVendor.cityname = value.cityname;
      //that.StoreVendor.Citycode=value.Citycode;
      that.StoreVendor.address3 = value.address3;
      that.StoreVendor.state = value.state;
      that.StoreVendor.coaid = value.coaid;
      that.StoreVendor.AccountName = value.AccountName;
      that.StoreVendor.Image = value.Image;

      that.StoreVendor.ContactName0 = value.ContactName0;
      that.StoreVendor.ContactNo1 = value.ContactNo1;
      that.StoreVendor.Email2 = value.Email2;
      that.StoreVendor.Notes3 = value.Notes3;
      that.StoreVendor.pincode = value.pincode;
      that.StoreVendor.companyname = value.companyname;
      that.StoreVendor.ViewName = 'customer';

      //  that.DisplayCOAId=value.coaid;
      //  that.DispalyAccountName=value.AccountName;
      that.StoreVendor.VendorId = value.VendorId;
     
      that.StoreVendor.ModifiedDate = (that.ModifiedDate == null ? '' : that.ModifiedDate);


      that.StoreVendor.submitted = that.submitted;
      //that.StoreVendor.TabId = ActivatedRoute;
      that.store.dispatch(new TabStore.AddTab(that.StoreVendor));
    });
  }


  ControlDatePickerLoad() {

    debugger;
    (window as any).$('input[name="single-date-picker"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    });

    (window as any).$('input[name="simple-date-range-picker"]').daterangepicker();

    (window as any).$('input[name="simple-date-range-picker-callback"]').daterangepicker({
      opens: 'left'
    }, function (start, end, label) {
      (window as any).swal("A new date selection was made", start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), "success")
    });

    (window as any).$('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: (window as any).moment().startOf('hour'),
      endDate: (window as any).moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A'
      }
    });

  

    (window as any).$('input.create-event-datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false
    }).on('apply.daterangepicker', function (ev, picker) {
      debugger;
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });

  }
  //#endregion "View OnInit"

  //#region "After View Init"
  ngAfterViewInit() {
    //this.LoadCuurency();
     this.LoadParts();
     this.LoadMake();

    $("#Image").attr("src", this.APICall.ImagePath + this.getControlValue(this.f.Image, 'string'));
debugger;
   
    var vendorCity = new Option(this.StoreVendor.VendorCityName, this.StoreVendor.VendorCityId.toString(), true, true);
    (<any>$('#Vcity')).append(vendorCity).trigger('change');

  
  
   this.ControlDatePickerLoad()
   
  }

  EditRecNO = -1;
  //#region "Package Line Items"
  UOMId=0
  LoadParts() {
    debugger;
    var that = this;
    (<any>$("#drpParts")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250, minimumInputLength: 4,
        data:
          function (params) {
  
            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
  
            return JSON.stringify({ "Operation": 'ViewItems', "Params": sstring, "Xml2": 'All', "Xml3":'', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
          var ResultData = (JSON.parse(response['Message'])).Table;
  
          var data = $.map(ResultData, function (obj) {
            
            obj.id = obj.ItemId;
            obj.text = obj.partno;
            obj.text1 = obj.description;
            obj.uom = obj.uomid;
            obj.uomname = obj.unitname;
            obj.text3 = obj.dashno;
            obj.partno = obj.partno;
  
            return obj;
          });
  
  
  
          return {
  
  
            results: data
  
          };
        },
        cache: false
  
      }
  
  
    });
  
  
  
    var that = this;
    $('#drpParts').on('select2:select', function (e) {
      debugger;
  
      if (typeof ((<any>e).params.data.id) != 'undefined') {
  
        debugger;
  
  
        (<any>$('#drpMake')).val('').trigger('change');
        that.f.ItemId.setValue((<any>e).params.data.id);
        that.f.partNo.setValue((<any>e).params.data.text);
        that.partNo=((<any>e).params.data.text)
        
        that.UOMId= (<any>e).params.data.invuom;
        that.f.Description.setValue((<any>e).params.data.text1);
        that.f.UOM.setValue((<any>e).params.data.invuomname);
     //   that.uomname = (<any>e).params.data.invuomname;
        
  
        that.f.MakeId.setValue(0);
        that.lstItemsStock = [];
    
        that.LoadMake();
      }
  
  
    });
    debugger;
    $("#drpParts").on("select2:unselecting", function (e) {
  
      that.f.ItemId.setValue(0);
      that.f.MakeId.setValue(0);
      that.f.ItemName.setValue('');
      that.f.Description.setValue('');
    
    });
  }
  
  LoadMake() {
    debugger;
    var that = this;
  
    (<any>$("#drpMake")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {
            debugger;
            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewMakByItemId', "Params": sstring, "Xml2": 'All', "Xml3":that.PreapareMakeParam(), "Xml4": that.APICall.GetCompanyID() })
  
          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
  
          debugger;
  
  
          var ResultData = (JSON.parse(response['Message'])).Table;
  
          var data = $.map(ResultData, function (obj) {
  
            obj.id = obj.MakeId;
            obj.text = obj.make;
            return obj;
          });
  
  
  
          return {
  
  
            results: data
  
          };
        },
        cache: false
  
      }
  
    });
  
  
  
  
    $('#drpMake').on('select2:open', function (e) {
  
  
      debugger;
  
      var html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="60%"><b>Make</b></td> <td width="20%"><b>UOMName</b></td>  <td width="20%"><b>Price</b></td> </tr > </tbody> </table>';
  
      var res = $('.select2-search');
  
      var text = res[0].innerText;
  
      if (text == "")
        $('.select2-search').append(html);
  
  
  
  
  
    });
    debugger;
    var that = this;
    $('#drpMake').on('select2:select', function (e) {
  
  
      debugger;
  
      if (typeof ((<any>e).params.data.id) != 'undefined') {
  
        debugger;
  
        that.f.MakeId.setValue((<any>e).params.data.id);
        that.f.Make.setValue((<any>e).params.data.text);
        that.Make = (<any>e).params.data.text;
  
  
  
      }
  
      var Makeselection1 = new Option(that.f.Make.value, that.f.MakeId.value.toString(), true, true);
  
      (<any>$('#drpMake')).append(Makeselection1).trigger('change');
  
  
  
    });
  
  
    $("#drpMake").on("select2:unselecting", function (e) {
  
      that.lstItemsStock = [];
  
    });
  
  }

  showError = false;
  errormsg = "";
  ValidateBankDetails(): boolean {
    
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.AccountNo1, 'string') != ""
      && this.getControlValue(this.f.TextBoxColumn_BankName_1, 'string') != ""
      && this.getControlValue(this.f.BranchName2, 'string') != ""
      && this.getControlValue(this.f.IFSCCode3, 'string') != ""
    ) {
      
      for (var i = 0; i < this.lstbankdetails.length; i++) {
        if (this.EditRecNO != this.lstbankdetails[i].SNO && this.lstbankdetails[i].AccountNo1 == this.getControlValue(this.f.AccountNo1, 'string')) {
          validate = false;
          this.showError = true;
          this.errormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";
    }
    return validate;
  }

  ValidateShippingDetails(): boolean {
    
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.ShippingName0, 'string') != ""
      && this.getControlValue(this.f.Address11, 'string') != ""
      && this.getControlValue(this.f.Address22, 'string') != ""
      && this.getControlValue(this.f.Address33, 'string') != ""
      // && this.getControlValue(this.f.Country4Id, 'string') != ""
      //  && this.getControlValue(this.f.State5Id, 'string') != ""
      // && this.getControlValue(this.f.City6Id, 'string') != ""
      && this.getControlValue(this.f.countryname, 'string') != ""
      && this.getControlValue(this.f.statename, 'string') != ""
      && this.getControlValue(this.f.cityname, 'string') != ""
    ) {
      
      for (var i = 0; i < this.lstShippingdetails.length; i++) {
        if (this.EditRecNO != this.lstShippingdetails[i].SNO && this.lstShippingdetails[i].ShippingName0 == this.getControlValue(this.f.ShippingName0, 'string')) {
          validate = false;
          this.showError = true;
          this.errormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";
    }
    return validate;
  }
  ValidateContactDetails(): boolean {
    
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.ContactName0, 'string') != ""
      && this.getControlValue(this.f.ContactNo1, 'string') != ""
      && this.getControlValue(this.f.Email2, 'string') != ""
      && this.getControlValue(this.f.Notes3, 'string') != ""

    ) {
      
      for (var i = 0; i < this.lstContact.length; i++) {
        if (this.EditRecNO != this.lstContact[i].SNO && this.lstContact[i].ContactName0 == this.getControlValue(this.f.ContactName0, 'string')) {
          validate = false;
          this.showError = true;
          this.errormsg = "Already exists!";
          break;

        }

      }
    } else {
      validate = false;
      this.showError = true;
      this.errormsg = "Invalid Data!";
    }
    return validate;
  }


  

  ShipID : number = 0;
  shippingtab=false;
  contacttab=false;
  Billingtab=false;
EditshipIndex=-1
  
  EditShipping(selectedRecord, SNO, e) {

// $('#ShippingLatest-tab').click();
    debugger;
    this.AddPlusbtnenable=false;
    this.ShipingTabEnable=1;
    $('#ShippingLatest-tab').attr('class','nav-link active')
    $('#ContactsLatest-tab').attr('class','nav-link ')
    $('#ContactsLatest').attr('class',' tab-pane fade ')
   
    this.shippingtab=true;
    this.contacttab=false;
    this.Billingtab=false;
    this.BillingEnableTAB=0;
    this.EditshipIndex=SNO;
    this.EditRecNO = SNO;
    this.EditBillingDetails=0;
    this.EditContactDetails=0;
    this.ShippingIndx=SNO;
    this.ContactTabEnable=0;
    this.ShipID = selectedRecord.ID;
    this.editAbleTab = e;
    this.EditShipDetails=-1
    this.CreateVendor.patchValue({
      SiteName : selectedRecord.SiteName,
      SHPContactName :selectedRecord.ContactName,
      
      ShipCountryId:selectedRecord.CountryID,
      ShipStateId:selectedRecord.StateID,
      ShipCityId:selectedRecord.CityID,
      SHPAddress1:selectedRecord.Address1,
      SHPAddress2 :selectedRecord.Address2,
      SHPPin : selectedRecord.Pincode,
      
      SNO: selectedRecord.SNO
    });

    var scountries=this.lstCountries;
    var data = $.map(scountries, function (obj) {
      obj.id = obj.CountryId;
      obj.text = obj.countryname
      return obj;
    });

    debugger;
    
    (<any>$('#Scountry')).select2({
      data: data
    });
    debugger;
  
    
    this.ShippingCountryName=selectedRecord.Country
    
   
    
    $('#Scountry').val(selectedRecord.CountryID).trigger('change')

debugger;

var sStates = this.lstStates.filter(x => x.country == selectedRecord.CountryID);

    var data = $.map(sStates, function (obj) {
      debugger;
      obj.id = obj.StateId;
      obj.text = obj.Statename;
      return obj;
    });
    (<any>$('#Sstate')).select2({
      data: data
    });
    this.ssName= selectedRecord.State
      $('#Sstate').val(selectedRecord.StateID).trigger('change')

    debugger;
   
    var cities = this.lstCities.filter(x => x.state ==  selectedRecord.StateID );
    var data = $.map(cities, function (obj) {
      obj.id = obj.CityId;
      obj.text = obj.Cityname;
      return obj;
    });
    

    (<any>$('#Scity')).select2({
      data: data
    });
    this.sccName=selectedRecord.City
    $('#Scity').val(selectedRecord.CityID).trigger('change')
    
    

  }
 
  // EditContact(selectedRecord, SNO) {
  // debugger;
  //   this.EditRecNO = SNO;
  //   this.SNO = SNO;
  //   this.EditContactDetails=-1;
    
  //   this.EditShipDetails=0;
  //   this.AddPlusbtnenable=false;
   
    
  //   this.CreateVendor.patchValue({

  //     ContactName0: selectedRecord.ContactName0,
  //     ContactNo1: selectedRecord.ContactNo1,
  //     Email2: selectedRecord.Email2,
  //     Notes3: selectedRecord.Notes3,
  //     VendorId: selectedRecord.VendorId,
  //     SNO: selectedRecord.SNO
  //   });
  // }
  billindex=-1;
  RemoveBank() {
    
debugger;
var index=this.bankIndx;
if (index !== -1) {
  this.lstbankdetails.splice(index, 1);
  this.clearBankDetails()
}  
  
var shipindex=this.ShippingIndx
if (shipindex !== -1) {
  this.lstShippingdetails.splice(shipindex, 1);
  this.clearShippingdetails()
} 

var billindex=this.billindex
if (billindex !== -1) {
  this.lstBillingAddresses.splice(billindex, 1);
  this.ClearBillingDetails()
} 

var Contactindex=this.ContactIndx ;

if (Contactindex !== -1) {
  this.lstContact.splice(Contactindex, 1);
  this.ContactDetailsClear()
} 


    

   // this.BankDetailsClear();

  }
  ShippingIndx=-1
  RemoveShipping() {
    

    // var sliceIndex = -1;
    // for (var i = 0; i < this.lstShippingdetails.length; i++) {
    //   this.lstShippingdetails[i].Show = 'true';

    //   if (this.lstShippingdetails[i].SNO == this.EditRecNO) {
    //     sliceIndex = i;
    //   }
    // }
    // if (sliceIndex > -1) {
    //   this.lstShippingdetails.splice(sliceIndex, 1);

    //   for (var i = 0; i < this.lstShippingdetails.length; i++) {
    //     this.lstShippingdetails[i].SNO = i + 1;
    //   }
    // }

    // this.EditRecNO = -1;
    // this.SNO = this.lstShippingdetails.length + 1;
    // this.ShippingDetailsClear();
     

  }
  RemoveContact() {
    

    var sliceIndex = -1;
    for (var i = 0; i < this.lstContact.length; i++) {
      this.lstContact[i].Show = 'true';

      if (this.lstContact[i].SNO == this.EditRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstContact.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstContact.length; i++) {
        this.lstContact[i].SNO = i + 1;
      }
    }

    this.EditRecNO = -1;
    this.SNO = this.lstContact.length + 1;
    this.ContactDetailsClear();

  }



  selectedFile: ImageSnippet;

  //#region "ImageUpload"

  ImagefileChange($event, ControlName) {
    
    if (this.getControlValue(this.f.vendorname, 'string') != '') {

      var file: File = $event.target.files[0];
      var fileType = file.type;
      var extention = (<any>$("#fileOpenModelImage").val()).split('.').pop();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (_event) => {

        var path = reader.result;
        this.selectedFile = new ImageSnippet(path.toString(), file);
        const formData = new FormData();
        let currDatetime: string = new Date().toString().trim();
        currDatetime = currDatetime.replace(/[^a-zA-Z0-9]/g, "")
        var Imagename = "Customer" + this.f.vendorname.value + ControlName + currDatetime + '.' + extention;
        formData.append('image', this.selectedFile.file);
        formData.append('imageName', Imagename);
        


        if (ControlName == 'Image') {
          this.CreateVendor.patchValue({
            Image: Imagename

          });

        }



        this.CreateVendor.controls.Image.markAsDirty();
        this.SaveImage(formData, fileType, Imagename, ControlName);

      }
    }

  }

  SaveImage(formData, fileType, Imagename, ControlName) {
    

    this.APICall.SaveImage(formData, fileType).subscribe(
      () => {
        debugger

        // ModelImg.src=this.APICall.ImagePath+'Images/'+Imagename;


        $("#Image").attr("src", this.APICall.ImagePath + Imagename);

      },
      () => {

      });
  }
  //#endregion "ImageUpload"

  viewcustomer(VendorId) {


    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = '';

    
    this.APICall.DBCalling("ViewVendor", sstring, this.FilterType, VendorId, this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        
        this.DbResult = JSON.parse(res['Message']);
        this.CreateVendor.patchValue(this.DbResult);
        if (this.DbResult.Table.length > 0) {

          var resp = this.DbResult.Table[0].ShippingDetails;


          if (resp != null && typeof (resp) != undefined) {

            var res2 = ((resp).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstShippingdetails = JSON.parse(res2);

            var i = 0;
            var data = $.map(this.lstShippingdetails, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });

            this.lstShippingdetails = data;
            this.StoreVendor.lstShippingdetails = this.lstShippingdetails;
          }

          // binding the array to resp variable contcat details

          var resp1 = this.DbResult.Table[0].ContactDetails;

          if (resp1 != null && typeof (resp1) != undefined) {

            var res3 = ((resp1).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstContact = JSON.parse(res3);

            var i = 0;
            var data = $.map(this.lstContact, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });
            this.lstContact = data;
            this.StoreVendor.lstContact = this.lstContact;

          }


          // binding the array to resp2 variable transport  details

          var resp2 = this.DbResult.Table[0].ItemDetails;
          if (resp2 != null && typeof (resp2) != undefined) {

            var res4 = ((resp2).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstItems = JSON.parse(res4);
            var i = 0;
            var data = $.map(this.lstItems, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });

            this.lstItems = data;
            this.StoreVendor.lstItems = this.lstItems;
          }


          var resp4 = this.DbResult.Table[0].BankDetails;

          if (resp4 != null && typeof (resp4) != undefined) {

            var res5 = ((resp4).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstbankdetails = JSON.parse(res5);

            var i = 0;
            var data = $.map(this.lstbankdetails, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });
            this.lstbankdetails = data;
            this.StoreVendor.lstContact = this.lstbankdetails;

          }
          this.BindControlData();
        }

        $("#loaderParent").hide();
      });


  }
  Companychecked(){
  debugger;
    this.FilterBy='Company';
    this.f.VendorType.setValue('Company')
  }
  Individual() {
    debugger;
  this.FilterBy = "Individual";
  this.f.VendorType.setValue('Individual')
  
  }

  

 
 

PurchaseChecked(target){
  debugger;
  
    var checked=target;
    if(checked==true){
        this.f.BusinessType.setValue('Purchase')
        
    }
  }

SalesChecked(target){
  debugger;
  var SalespurchaseChecked =target.checked
  if(SalespurchaseChecked==true){
    this.f.BusinessType.setValue('SalesAndPurchase')
  }
}


InvoiceTypeChange(Value: string) {
  debugger;
  var InvoiceTypeSelection=Value;
  if(InvoiceTypeSelection=='Invoice'){
    this.f.PurchaseType.setValue('Invoice')
  }else if(InvoiceTypeSelection=='ExcludeTax'){
    this.f.PurchaseType.setValue('ExcludeTax')
  }else if(InvoiceTypeSelection=='Import'){
    this.f.PurchaseType.setValue('Import')
  }else{
    this.f.PurchaseType.setValue('')
  }
  
}
  FilterByCurrency = "INR";

  GetCurrency(value: string) {
    
    this.FilterByCurrency = value;
  }

  Contact = "Billing";
  Billingstab: number = 0;
  Shippingtab: number = 0;
  Contactstab: number = 0;

  Billing() {

    this.Contact = "Billing";
    this.Billingstab = 1;
  }

  Shipping() {
    this.Contact = "Shipping";
    this.Shippingtab = 1;
  }

  Contacts() {
    this.Contact = "Contacts";
    this.Contactstab = 1;

  }
  CompanyAdd() {
    this.Contact = "Company";
  }

  // clear all tabs
  ContactTabEnable=0;
  ShipingTabEnable=0;
  ClearAllTabs(){
    debugger;
  
    // Billcountries and state and city  filed
    
    // this.EditBillingDetails=;
    // this.EditShipDetails=0;
    // this.EditContactDetails=0;
    this.AddPlusbtnenable=true;
    var billingState = new Option('' , '', true, true);
    (<any>$('#Bstate')).append(billingState).trigger('change');

    var billingState = new Option('' , '', true, true);
    (<any>$('#Bcity')).append(billingState).trigger('change')

    var billingState = new Option('' , '', true, true);
    (<any>$('#Bcountry')).append(billingState).trigger('change')

    var billingState = new Option('' , '', true, true);
    (<any>$('#Scountry')).append(billingState).trigger('change')

    var billingState = new Option('' , '', true, true);
    (<any>$('#Sstate')).append(billingState).trigger('change')

    var billingState = new Option('' , '', true, true);
    (<any>$('#Scity')).append(billingState).trigger('change')
 
    
    this.Billingtab=true;
    this.contacttab=false;
    this.shippingtab=false;
    this.ContactTabEnable=1;
    this.ShipingTabEnable=1;
    this.BillingEnableTAB=1;
  this.ShippingCountryName=''
// this.contacttab=true;
    this.CreateVendor.patchValue({

      ContactName0:'',
      Designation1:'',
     
      BillCountryId:'',
      ShipCountryId:0,
      ShipCityId:0,
      BillStateId:0,
      BillCityId:0,
      ShipStateId:0,
      address1:'',
      SHPContactName:'',
      SHPAddress1:'',
      SHPPin:0,
      SHPAddress2:'',

      SiteName:'',
      address2:'',
      Bpin:'',
      ContactNo1:'',
      WhatsappNo:'',
      Email2:'',
      Notes3:'',

    })

    //this.Billingtab=true
  }

  lstContact1 : any =[];
  lstShippingdetails1 : any =[];
  EditBillingDetails:number=0;
  EditShipDetails :number=0;
  EditContactDetails :number=0
  AddDetails(){
    debugger;
    if (this.Billingstab == 0 && this.f.address1.value != "" && this.bCId != 0
      && this.bSId != 0 && this.bCCId != 0 && this.f.Bpin.value != "" && this.lstBillingAddresses.length == 0 && this.EditShipDetails == 0) {
      debugger;

      this.lstBillingAddresses.push({ 'Address1': this.f.address1.value, 'Address2': this.f.address2.value, 'CountryID': this.bCId, 'Country': this.billCountryName, 'StateId': this.bSId, 'State': this.bsName, 'CityId': this.bCCId, 'City': this.bcityName, 'Pin': this.f.Bpin.value });
      this.BillingEnableTAB = 1;
      $('#BillingLatest-tab').attr('class','nav-link active')
      this.errromsge = ''
      this.ClearBillingDetails();
    }else if(this.f.SiteName.value != "" && this.f.SiteName.value != null && this.f.SHPContactName.value != "" && this.f.SHPContactName.value != null && this.f.SHPAddress1.value != "" && this.f.SHPAddress1.value != null &&
    (+this.sCId != 0) && this.sSId != 0 && this.sCCId != 0 && this.f.SHPPin.value != "" && this.f.SHPPin.value != null ){

     
        debugger;
    
      this.lstShippingdetails.push({
        'SiteName': this.f.SiteName.value, 'ContactName': this.f.SHPContactName.value, 'Address1': this.f.SHPAddress1.value,
        'Address2': this.f.SHPAddress2.value, 'CountryID': (+this.sCId), 'Country': this.ShippingCountryName, 'StateID': (+this.sSId),
        'State': this.ssName, 'CityID': (+this.sCCId), 'City': this.sccName, 'Pincode': this.f.SHPPin.value ,'ID':this.ShipID
      })
      this.ShipingTabEnable=1;
     
      $('#ShippingLatest-tab').attr('class','nav-link active')
    debugger;

      this.clearShippingdetails();

    }else if(this.f.ContactName0.value != "" && this.f.Designation1.value != "" && this.f.ContactNo1.value != "" || this.f.Email2.value != "" && this.ContactID == 0){

      var valid=true;
    if(this.f.Email2.touched && this.f.Email2.status=='INVALID'){
      valid=false;
    }
    if(valid){
      this.lstContact.push({
        'ContactName': this.f.ContactName0.value, 'Designation': this.f.Designation1.value, 'MobileNo': this.f.ContactNo1.value,
        'WhatsappNo': this.f.WhatsappNo.value, 'Email': this.f.Email2.value, 'Note': this.f.Notes3.value
      });
      this.ContactTabEnable=1;
      $('#ContactsLatest-tab').attr('class','nav-link active')
    }
      this.ClearContactDetails();
     
    }else{
      
    }

  }

  AddVendorDetails(e) {

    debugger;
   
if( this.EditBillingDetails ==-1){
  var modifiedbillingdetails=[];
  var that=this;
  modifiedbillingdetails.push({ 'Address1': this.f.address1.value, 'Address2': this.f.address2.value, 'CountryID': this.f.BillCountryId.value, 'Country': this.billCountryName, 'StateId': this.f.BillStateId.value, 'State': this.bsName, 'CityId': this.f.BillCityId.value, 'City': this.bcityName, 'Pin': this.f.Bpin.value });
  that.lstBillingAddresses[0]=modifiedbillingdetails[0]
  this.BillingEnableTAB=0;
  this.EditShipDetails=0;
  this.Billingtab=false;
  this.shippingtab=false;
  this.contacttab=false;
 this.ClearBillingDetails();

//  this.Billingstab == 1 || || this.f.address2.value != "" 
}else if  ( this.Billingstab == 0 && this.f.address1.value != ""  && this.bCId != 0
          && this.bSId != 0 && this.bCCId != 0 && this.f.Bpin.value != "" && this.lstBillingAddresses.length == 0 && this.EditShipDetails==0 ) {
        debugger;
        
      this.lstBillingAddresses.push({ 'Address1': this.f.address1.value, 'Address2': this.f.address2.value, 'CountryID': this.bCId, 'Country': this.billCountryName, 'StateId': this.bSId, 'State': this.bsName, 'CityId': this.bCCId, 'City': this.bcityName, 'Pin': this.f.Bpin.value });
      this.BillingEnableTAB=0;
      this.errromsge=''
       this.ClearBillingDetails();
      
    }else{
      // alert ('please fill the all details ')
    }

    debugger;
    
    // &&  this.ShipID == 0

    if(this.EditShipDetails==-1){
      var ModifiedShipDetails=[];
      ModifiedShipDetails.push({
        'SiteName': this.f.SiteName.value, 'ContactName': this.f.SHPContactName.value, 'Address1': this.f.SHPAddress1.value,
        'Address2': this.f.SHPAddress2.value, 'CountryID': this.f.ShipCountryId.value, 'Country': this.ShippingCountryName, 'StateID': this.f.ShipStateId.value,
        'State': this.ssName, 'CityID': this.f.ShipCityId.value, 'City': this.sccName, 'Pincode': this.f.SHPPin.value ,'ID':this.ShipID
      })
      this.lstShippingdetails[this.EditshipIndex]=ModifiedShipDetails[0];
      this.EditBillingDetails =0;
      this.ShipingTabEnable=0;
      this.shippingtab=false;
      this.Billingtab=false;
      this.contacttab=false;

      this.clearShippingdetails();
    }
    else if (this.f.SiteName.value != "" && this.f.SiteName.value != null && this.f.SHPContactName.value != "" && this.f.SHPContactName.value != null && this.f.SHPAddress1.value != "" && this.f.SHPAddress1.value != null &&
      (+this.sCId != 0) && this.sSId != 0 && this.sCCId != 0 && this.f.SHPPin.value != "" && this.f.SHPPin.value != null ) {
        debugger;
    
      this.lstShippingdetails.push({
        'SiteName': this.f.SiteName.value, 'ContactName': this.f.SHPContactName.value, 'Address1': this.f.SHPAddress1.value,
        'Address2': this.f.SHPAddress2.value, 'CountryID': (+this.sCId), 'Country': this.ShippingCountryName, 'StateID': (+this.sSId),
        'State': this.ssName, 'CityID': (+this.sCCId), 'City': this.sccName, 'Pincode': this.f.SHPPin.value ,'ID':this.ShipID
      })
      this.ShipingTabEnable=0;
    debugger;

      this.clearShippingdetails();
    }else{

     
    }
    
    if(this.EditContactDetails==-1){
      debugger;
      var ModifiedContactsDetails=[];
      var valid=true;
      if(this.f.Email2.touched && this.f.Email2.status=='INVALID'){
        valid=false;
      }
      if(valid){

      ModifiedContactsDetails.push({
        'ContactName': this.f.ContactName0.value, 'Designation': this.f.Designation1.value, 'MobileNo': this.f.ContactNo1.value,
        'WhatsappNo': this.f.WhatsappNo.value, 'Email': this.f.Email2.value, 'Note': this.f.Notes3.value
      });
   
      this.lstContact[0]= ModifiedContactsDetails[0];
    
      this.ContactTabEnable=0;
      this.AddPlusbtnenable=false;
      this.shippingtab=false;
      this.Billingtab=false;
      this.contacttab=false;
    }
     
      this.ClearContactDetails();
    }
    else if (this.f.ContactName0.value != "" && this.f.Designation1.value != "" && this.f.ContactNo1.value != "" || this.f.Email2.value != "" && this.ContactID == 0) {
    debugger;
    var valid=true;
    if(this.f.Email2.touched && this.f.Email2.status=='INVALID'){
      valid=false;
    }
    if(valid){
      this.lstContact.push({
        'ContactName': this.f.ContactName0.value, 'Designation': this.f.Designation1.value, 'MobileNo': this.f.ContactNo1.value,
        'WhatsappNo': this.f.WhatsappNo.value, 'Email': this.f.Email2.value, 'Note': this.f.Notes3.value
      });
      this.ContactTabEnable=0;
     
    }
      
    debugger;

      this.ClearContactDetails();
    }else{

    }
    
    
    if (e == 'Close') {
      $("#btnCloseAddItem").trigger('click');
    }

  }

  AddBank1(e) {
 debugger;
    if (this.FilterByCurrency == 'INR') {
      if(this.bankIndx > -1){
        for(var i=0; i<this.lstbankdetails.length;i++){
          if(this.bankIndx == i){
            this.lstbankdetails[i].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[i].Name = this.f.TextBoxColumn_BankName_1.value;
            this.lstbankdetails[i].IFSCcode = this.f.IFSCCode3.value;
            this.lstbankdetails[i].CurrencyType = this.FilterByCurrency;
            this.lstbankdetails[i].Address1 = this.f.BankStreet1.value;
            this.lstbankdetails[i].Address2 = this.f.BankStreet2.value;
            this.lstbankdetails[i].Country = this.f.BanksCountryId.value ;
            this.lstbankdetails[i].CountryName = this.bankcName ;
            this.lstbankdetails[i].State = this.f.BankstateId.value;
            this.lstbankdetails[i].StateName = this.BanksName;
            this.lstbankdetails[i].City = this.f.BankcityId.value;
            this.lstbankdetails[i].Cityname = this.BankcityName;
            this.lstbankdetails[i].Pin = this.f.Bankpincode.value;

           
           
          }
        }
      }
      else if(this.f.TextBoxColumn_BankName_1.value != '' && this.f.AccountNo1.value != '') {
        debugger;
        this.lstbankdetails.push({
          'AccountNo': this.f.AccountNo1.value, 'Name': this.f.TextBoxColumn_BankName_1.value, 'IFSCcode': this.f.IFSCCode3.value,
          'BeneficiaryName': '', 'SwiftCode': '', 'ABAno': '', 'RoutingNo': '', 'SortCode': '',
          'CurrencyType': this.FilterByCurrency, 
          'Address1': this.f.BankStreet1.value, 'Address2': this.f.BankStreet2.value,
          'Country': this.bankCId, 'CountryName': this.bankcName,
          'State': this.BanksSId, 'StateName': this.BanksName,
          'City': this.BankCCId, 'Cityname': this.BankcityName,
          'Pin': this.f.Bankpincode.value
        })
      }
    }


    if (this.FilterByCurrency == 'USD') {
      debugger;
      if(this.bankIndx > -1){
        for(var j=0; j<this.lstbankdetails.length;j++){
          if(this.bankIndx == j){
            this.lstbankdetails[j].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[j].Name = this.f.TextBoxColumn_BankName_1.value;
            this.lstbankdetails[j].BeneficiaryName = this.f.BeneficiaryName.value;
            this.lstbankdetails[j].SwiftCode = this.f.SwiftCode.value;
            this.lstbankdetails[j].ABAno = this.f.AbaNo.value;
            this.lstbankdetails[j].RoutingNo = this.f.RoutingNo.value;
            this.lstbankdetails[j].CurrencyType = this.FilterByCurrency;
            this.lstbankdetails[j].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[j].Address1 = this.f.BankStreet1.value;
            this.lstbankdetails[j].Address2 = this.f.BankStreet2.value;
            this.lstbankdetails[j].Country = this.bankCId ;
            this.lstbankdetails[j].CountryName = this.bankcName ;
            this.lstbankdetails[j].State = this.BanksSId;
            this.lstbankdetails[j].StateName = this.BanksName;
            this.lstbankdetails[j].City = this.BankCCId;
            this.lstbankdetails[j].Cityname = this.BankcityName;
            this.lstbankdetails[j].Pin = this.f.Bankpincode.value;
          }
        }
      }
      else if(this.f.TextBoxColumn_BankName_1.value != '' && this.f.AccountNo1.value != '') {
        this.lstbankdetails.push({
          'AccountNo': this.f.AccountNo1.value, 'Name': this.f.TextBoxColumn_BankName_1.value, 'IFSCcode': '' ,
          'BeneficiaryName': this.f.BeneficiaryName.value, 'SwiftCode': this.f.SwiftCode.value, 'ABAno': this.f.AbaNo.value, 
          'RoutingNo': this.f.RoutingNo.value, 'SortCode': '','CurrencyType': this.FilterByCurrency, 
          'Address1': this.f.BankStreet1.value, 'Address2': this.f.BankStreet2.value,
          'Country': this.bankCId, 'CountryName': this.bankcName,
          'State': this.BanksSId, 'StateName': this.BanksName,
          'City': this.BankCCId, 'Cityname': this.BankcityName,
          'Pin': this.f.Bankpincode.value
        })
      }
    }


    if (this.FilterByCurrency == 'EURO') {
      if(this.bankIndx > -1){
        for(var k=0;k<this.lstbankdetails.length;k++){
          if(this.bankIndx == k){
            this.lstbankdetails[k].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[k].Name = this.f.TextBoxColumn_BankName_1.value;
            this.lstbankdetails[k].BeneficiaryName = this.f.BeneficiaryName.value;
            this.lstbankdetails[k].SwiftCode = this.f.SwiftCode.value;
            this.lstbankdetails[k].CurrencyType = this.FilterByCurrency;
            this.lstbankdetails[k].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[k].Address1 = this.f.BankStreet1.value;
            this.lstbankdetails[k].Address2 = this.f.BankStreet2.value;
            this.lstbankdetails[k].Country = this.bankCId ;
            this.lstbankdetails[k].CountryName = this.bankcName ;
            this.lstbankdetails[k].State = this.BanksSId;
            this.lstbankdetails[k].StateName = this.BanksName;
            this.lstbankdetails[k].City = this.BankCCId;
            this.lstbankdetails[k].Cityname = this.BankcityName;
            this.lstbankdetails[k].Pin = this.f.Bankpincode.value;
          }
        }
      }
      else if(this.f.TextBoxColumn_BankName_1.value != '' && this.f.AccountNo1.value != '') {
        this.lstbankdetails.push({
          'AccountNo': this.f.AccountNo1.value, 'Name': this.f.TextBoxColumn_BankName_1.value, 'IFSCcode':'',
          'BeneficiaryName': this.f.BeneficiaryName.value, 'SwiftCode': this.f.SwiftCode.value, 'ABAno': '', 'RoutingNo': '', 'SortCode': '',
          'CurrencyType': this.FilterByCurrency, 'Address1': this.f.BankStreet1.value, 'Address2': this.f.BankStreet2.value,
          'Country': this.bankCId, 'CountryName': this.bankcName,
          'State': this.BanksSId, 'StateName': this.BanksName,
          'City': this.BankCCId, 'Cityname': this.BankcityName,
          'Pin': this.f.Bankpincode.value
        })
      }
    }


    if (this.FilterByCurrency == 'AUD') {
      if(this.bankIndx > -1){
        for(var l=0;l<this.lstbankdetails.length;l++){
          if(this.bankIndx == l){
            this.lstbankdetails[l].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[l].Name = this.f.TextBoxColumn_BankName_1.value;
            this.lstbankdetails[l].BeneficiaryName = this.f.BeneficiaryName.value;
            this.lstbankdetails[l].SwiftCode = this.f.SwiftCode.value;
            this.lstbankdetails[l].CurrencyType = this.FilterByCurrency;
            this.lstbankdetails[l].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[l].Address1 = this.f.BankStreet1.value;
            this.lstbankdetails[l].Address2 = this.f.BankStreet2.value;
            this.lstbankdetails[l].Country = this.bankCId ;
            this.lstbankdetails[l].CountryName = this.bankcName ;
            this.lstbankdetails[l].State = this.BanksSId;
            this.lstbankdetails[l].StateName = this.BanksName;
            this.lstbankdetails[l].City = this.BankCCId;
            this.lstbankdetails[l].Cityname = this.BankcityName;
            this.lstbankdetails[l].Pin = this.f.Bankpincode.value;
          }
        }
      }
      else if (this.f.TextBoxColumn_BankName_1.value != '' && this.f.AccountNo1.value != '') {
        this.lstbankdetails.push({
          'AccountNo': this.f.AccountNo1.value, 'Name': this.f.TextBoxColumn_BankName_1.value, 'IFSCcode':'',
          'BeneficiaryName': this.f.BeneficiaryName.value, 'SwiftCode': this.f.SwiftCode.value, 'ABAno': '', 'RoutingNo': '', 'SortCode': '',
          'CurrencyType': this.FilterByCurrency, 'Address1': this.f.BankStreet1.value, 'Address2': this.f.BankStreet2.value,
          'Country': this.bankCId, 'CountryName': this.bankcName,
          'State': this.BanksSId, 'StateName': this.BanksName,
          'City': this.BankCCId, 'Cityname': this.BankcityName,
          'Pin': this.f.Bankpincode.value
        })
      }
    }


    if (this.FilterByCurrency == 'POUND') {

      if(this.bankIndx > -1){
        for(var m=0;m<this.lstbankdetails.length;m++){
          if(this.bankIndx == m){
            this.lstbankdetails[m].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[m].Name = this.f.TextBoxColumn_BankName_1.value;
            this.lstbankdetails[m].BeneficiaryName = this.f.BeneficiaryName.value;
            this.lstbankdetails[m].SwiftCode = this.f.SwiftCode.value;
            this.lstbankdetails[m].SortCode = this.f.SortCode.value;
            this.lstbankdetails[m].CurrencyType = this.FilterByCurrency;
            this.lstbankdetails[m].AccountNo = this.f.AccountNo1.value;
            this.lstbankdetails[m].Address1 = this.f.BankStreet1.value;
            this.lstbankdetails[m].Address2 = this.f.BankStreet2.value;
            this.lstbankdetails[m].Country = this.bankCId ;
            this.lstbankdetails[m].CountryName = this.bankcName ;
            this.lstbankdetails[m].State = this.BanksSId;
            this.lstbankdetails[m].StateName = this.BanksName;
            this.lstbankdetails[m].City = this.BankCCId;
            this.lstbankdetails[m].Cityname = this.BankcityName;
            this.lstbankdetails[m].Pin = this.f.Bankpincode.value;
          }
        }
      }
      else if (this.f.TextBoxColumn_BankName_1.value != '' && this.f.AccountNo1.value != '') {
        this.lstbankdetails.push({
          'AccountNo': this.f.AccountNo1.value, 'Name': this.f.TextBoxColumn_BankName_1.value, 'IFSCcode': this.f.IFSCCode3.value,
          'BeneficiaryName': this.f.BeneficiaryName.value, 'SwiftCode': this.f.SwiftCode.value, 'ABAno': '', 'RoutingNo': '', 'SortCode': this.f.SortCode.value,
          'CurrencyType': this.FilterByCurrency, 'Address1': this.f.BankStreet1.value, 'Address2': this.f.BankStreet2.value,
          'Country': this.bankCId, 'CountryName': this.bankcName,
          'State': this.BanksSId, 'StateName': this.BanksName,
          'City': this.BankCCId, 'Cityname': this.BankcityName,
          'Pin': this.f.Bankpincode.value
        })
      }
    }

    //this.clearBankDetails ();
    if (e == 'Close') {
      $("#btnCloseBanks").trigger('click');
    }

   
  }
 
 
  editAbleTab : string = "";
  BillingEnableTAB=0;
  editBilling(d,e,index){
    debugger;
    this.editAbleTab = e;
    this.billindex=index;
    this.EditBillingDetails=-1;
    this.AddPlusbtnenable=false;
    $('#ContactsLatest-tab').removeAttr('aria-selected')
    $('#ContactsLatest').attr('class','tab-pane fade')
    $('#BillingLatest-tab').attr('class','nav-link active')
    $('#BillingLatest-tab').attr('aria-selected', 'true');
    $('#BillingLatest').attr('class','tab-pane fade  show active')
    this.BillingEnableTAB=1;
    this.ContactTabEnable=0;
    this.ShipingTabEnable=0;
    this.Billingtab=true;
    this.shippingtab=false;
    this.contacttab=false;
   
   
    this.CreateVendor.patchValue({ address1: d.Address1 , address2 : d.Address2, Bpin : d.Pin ,
    BillCountryId:d.CountryID,Country:d.Country,BillStateId:d.StateId,State:d.State,BillCityId:d.CityId,City:d.City});

  debugger;

     var data = $.map(this.lstCountries, function (obj) {
      obj.id = obj.CountryId;
      obj.text = obj.countryname
      return obj;
    });

   
    (<any>$('#Bcountry')).select2({
      data: data
    });
    this.billCountryName=d.Country
   
     $('#Bcountry').val(d.CountryID).trigger('change')
 
 var vStates = this.lstStates.filter(x => x.country ==  d.CountryID);
    var data = $.map( vStates, function (obj) {
      obj.id = obj.StateId;
      obj.text = obj.Statename;
      return obj;
    });
debugger;
   
    (<any>$('#Bstate')).select2({
      data: data
    });
    this.bsName=d.State
    $('#Bstate').val(d.StateId).trigger('change')

  
 
    var vcity = this.lstCities.filter(x => x.state ==  d.StateId );
    var data = $.map(vcity, function (obj) {
      obj.id = obj.CityId;
      obj.text = obj.Cityname;
      return obj;
    });
    
    

    (<any>$('#Bcity')).select2({
      data: data
    });
    this.bcityName=d.City;
    $('#Bcity').val(d.CityId).trigger('change')
    
  

  }

  ContactIndx : number = -1;
  ContactID : number = 0;
  AddPlusbtnenable=false;
  EditContacts(d,index,e){

    debugger;
    this.editAbleTab = e;
    this.ContactID = d.ID;
    this.ContactIndx = index;
    this.EditContactDetails=-1;
    this.AddPlusbtnenable=false;
    this.EditShipDetails=0;
    this.ShipingTabEnable=0;
    this.contacttab=true;
    this.Billingtab=false;
    this.shippingtab=false;
    this.ContactTabEnable=1;
    $('#ContactsLatest-tab').attr('class','nav-link active')
    $('#BillingLatest-tab').removeAttr('class')
    $('#BillingLatest-tab').remove('a')
   
    this.CreateVendor.patchValue({ContactName0:d.ContactName,Designation1:d.Designation,ContactNo1:d.MobileNo,WhatsappNo:d.WhatsappNo,Email2:d.Email,Notes3:d.Note})
  }

  EditItemRec:number=0
  bankIndx : number = -1;
  EditBankDetails=0
  EditBankDetailsClick(d, SNO) {
debugger;
    this.FilterByCurrency = d.CurrencyType; 
    this.EditItemRec= SNO;
    this.SNO = SNO;
    this.bankIndx = SNO;
   this. EditBankDetails=-1;
   this.shippingtab=false;
     this.Billingtab=false;
     this.contacttab=true;
    this.AddPlusbtnenable=false;
    this.CreateVendor.patchValue({
      BankStreet1: d.Address1,
      BankStreet2: d.Address2,
      Bankpincode : d.Pin,
      TextBoxColumn_BankName_1: d.Name,
      AccountNo1: d.AccountNo,
      BeneficiaryName: d.BeneficiaryName,
      IFSCCode3: d.IFSCcode,
      SwiftCode : d.SwiftCode,
      BanksCountryId:d.Country,
      BankstateId: d.State,
      BankcityId: d.City,
      AbaNo : d.ABAno,
      RoutingNo : d.RoutingNo,
      SortCode : d.SortCode,
      Currencyname : d.CurrencyType,
      SNO: d.SNO
    });

    var data = $.map(this.lstCountries, function (obj) {
      obj.id = obj.CountryId;
      obj.text = obj.countryname
      return obj;
    });
    debugger;
    
   
    (<any>$('#banksCountry')).select2({
      data: data
    });
    
    this.bankcName=d.CountryName
   
    $('#banksCountry').val(d.Country).trigger('change')

    var bankstates = this.lstStates.filter(x => x.country == d.Country);
    
    var data = $.map(bankstates, function (obj) {
      obj.id = obj.StateId;
      obj.text = obj.Statename;
      return obj;
    });
  

    (<any>$('#Bankstate')).select2({
      data: data
    });
    this.BanksName=d.StateName;
    $('#Bankstate').val(d.State).trigger('change')
  
    console.log(d.State)
    var cities = this.lstCities.filter(x => x.state ==  d.State );
    var data = $.map(cities, function (obj) {
      obj.id = obj.CityId;
      obj.text = obj.Cityname;
      return obj;
    });
   

    (<any>$('#Bankcity')).select2({
      data: data
    });
    this.BankcityName=d.Cityname
    $('#Bankcity').val(d.City).trigger('change')
     
  }

clearShippingdetails(){
  this.CreateVendor.controls['SiteName'].reset();
  this.CreateVendor.controls['SHPContactName'].reset();
  this.CreateVendor.controls['SHPAddress1'].reset();
  this.CreateVendor.controls['SHPAddress2'].reset();
  this.CreateVendor.controls['SHPPin'].reset();

  var shipCountry = new Option('', '' , true, true);
  (<any>$('#Scountry')).append(shipCountry).trigger('change');

  var shipState = new Option('', '', true, true);
  (<any>$('#Sstate')).append(shipState).trigger('change');

  var ShipCity = new Option('', '', true, true);
  (<any>$('#Scity')).append(ShipCity).trigger('change');

}

ClearContactDetails(){
  this.CreateVendor.controls['ContactName0'].reset();
  this.CreateVendor.controls['Designation1'].reset();
  this.CreateVendor.controls['ContactNo1'].reset();
  this.CreateVendor.controls['WhatsappNo'].reset();
  this.CreateVendor.controls['Email2'].reset();
  this.CreateVendor.controls['Notes3'].reset();
}


ClearBillingDetails(){
  debugger;
  this.CreateVendor.controls['address1'].reset();
  this.CreateVendor.controls['address2'].reset();
  this.CreateVendor.controls['Bpin'].reset();
  //this.CreateVendor.controls['CompanyAddress1'].reset();

  var billingCountry = new Option('', '' , true, true);
    (<any>$('#Bcountry')).append(billingCountry).trigger('change');

    var billingState = new Option('', '', true, true);
    (<any>$('#Bstate')).append(billingState).trigger('change');

    var billingCity = new Option('', '', true, true);
    (<any>$('#Bcity')).append(billingCity).trigger('change');

}


clearBankDetails(){
  this.CreateVendor.controls['TextBoxColumn_BankName_1'].reset();
  this.CreateVendor.controls['BankStreet1'].reset();
  this.CreateVendor.controls['BankStreet2'].reset();

  this.CreateVendor.controls['Bankpincode'].reset();
  this.CreateVendor.controls['AccountNo1'].reset();
  this.CreateVendor.controls['BeneficiaryName'].reset();
  this.CreateVendor.controls['IFSCCode3'].reset();
  this.CreateVendor.controls['SwiftCode'].reset();

  this.CreateVendor.controls['AbaNo'].reset();
  this.CreateVendor.controls['RoutingNo'].reset();
  this.CreateVendor.controls['SortCode'].reset();
  this.CreateVendor.controls['Currencyname'].reset();

  var billingCountry = new Option('', '' , true, true);
  (<any>$('#banksCountry')).append(billingCountry).trigger('change');
  var billingState = new Option('', '', true, true);
  (<any>$('#Bankstate')).append(billingState).trigger('change');
  var billingCity = new Option('', '', true, true);
  (<any>$('#Bankcity')).append(billingCity).trigger('change');
}



editSaveBilling(e){
  
  
  this.lstBillingAddresses1 = this.lstBillingAddresses;
  this.lstBillingAddresses =[];
  if (this.Billingstab == 1 || this.Billingstab == 0 && this.f.address1.value != "" && this.f.address2.value != "" && (+this.bCId) != 0
  && (+this.bSId) != 0 && (+this.bCCId) != 0 && this.f.Bpin.value != "") {
  this.lstBillingAddresses.push({ 'Address1': this.f.address1.value, 'Address2': this.f.address2.value, 'CountryID': this.bCId, 'Country': this.billCountryName, 'StateId': this.bSId, 'State': this.bsName, 'CityId': this.bCCId, 'City': this.bcityName, 'Pin': this.f.Bpin.value });
  this.editAbleTab = "";
  this.ClearBillingDetails();
  }else{
    this.lstBillingAddresses = this.lstBillingAddresses1;
    this.ClearBillingDetails();
  }
  if (e == 'Close') {
    $("#btnClosebillingItems").trigger('click');


  }
}

editSavesite(e){
  
  for(var i=0;i<this.lstShippingdetails.length;i++){
    if(this.SNO ==  i){
      
      this.lstShippingdetails[i].SiteName = this.f.SiteName.value;
      this.lstShippingdetails[i].ContactName = this.f.SHPContactName.value;
      this.lstShippingdetails[i].Address1 = this.f.SHPAddress1.value;
      this.lstShippingdetails[i].Address2 = this.f.SHPAddress2.value;
      this.lstShippingdetails[i].CountryID = (+this.sCId);
      this.lstShippingdetails[i].Country = this.ShippingCountryName;
      this.lstShippingdetails[i].StateId = (+this.sSId);
      this.lstShippingdetails[i].State =  this.ssName;
      this.lstShippingdetails[i].CityID = (+this.sCCId);
      this.lstShippingdetails[i].City = this.sccName;
      this.lstShippingdetails[i].Pincode = this.f.SHPPin.value;
      this.clearShippingdetails();
      this.SNO = -1;
    break;

    }
  }
  if (e == 'Close') {
    $("#btnCloseshippingItems").trigger('click');
  }
}

editSaveContact(e){
  
  for(var i=0;i<this.lstContact.length;i++){
    if(this.ContactIndx == i){
      this.lstContact[i].ContactName = this.f.ContactName0.value;
      this.lstContact[i].Designation = this.f.Designation1.value;
      this.lstContact[i].MobileNo = this.f.ContactNo1.value;
      this.lstContact[i].WhatsappNo = this.f.WhatsappNo.value;
      this.lstContact[i].Email = this.f.Email2.value;
      this.lstContact[i].Note = this.f.Notes3.value;
      this.ClearContactDetails();
      this.ContactIndx = -1;
      if (e == 'Close') {
        $("#closeContacts").trigger('click');
      }
    }
  }
 
}

AddShipping(val)
{}

AddContact(val){}

}


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}