import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { APICallingService } from 'src/app/apicalling.service';
//import { formatDate,DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/store/StoreVendor';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { CommonDbCallings } from 'src/app/shared-module/common-db-callings';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css']
})
export class CreateVendorComponent implements OnInit {

  CreateVendor: FormGroup;
  //#region "View constructor"
  DisplaySequenceNumberId = 0;
  DispalyAccountName = "";
  DispalyFormName = 'Vendor'
  DisplayCOAId = "";
  constructor(private DbCallings: CommonDbCallings,private router: Router, private formBuilder: FormBuilder, 
    private APICall: APICallingService, private store: Store<any>) {
    this.CreateVendor = formBuilder.group(

      {
        SequenceNumberId: new FormControl(0),
        vendorcode: new FormControl(''),
        vendorname: new FormControl('', [Validators.required]),
        shortname: new FormControl('', [Validators.required]),
        country: new FormControl(''),
        //state:new FormControl(''),
        // city:new FormControl(''),
        iscompany: new FormControl(''),
        AccountName: new FormControl(''),
        companyname: new FormControl(''),
        TransporterId: new FormControl(''),
        gstno: new FormControl(''),
        Contactno: new FormControl(''),
        email: new FormControl('', [Validators.email]),
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
        ContactNo1: new FormControl(''),
        Email2: new FormControl(''),
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

        ItemId: new FormControl(0),       
        ItemName: new FormControl(''),
        Description1: new FormControl(''),
        MakeId: new FormControl(0),
        Make: new FormControl(''),
        UOMID: new FormControl(0),
        UOM: new FormControl(''),
        UnitPrice: new FormControl(0),
      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

  }


  
itemsubmit=false;
item:number=0;
make:number=0;
price:number=0;
EditItemNO:number=0;
//   MoveItems(value) {
//     debugger;
//     try {
// this.itemsubmit=true;

// this.item=this.f.ItemId.value;
// this.make=this.f.MakeId.value;
// this.price=this.f.UnitPrice.value;

// if(this.ValidateItemDetails())
//  {
//         $('#ItemDetails').hide();
//         var that = this;
//         var obj = {
        
//           ItemID: this.f.ItemId.value,
//           partNo: this.partNo,
//           MakeID: this.f.MakeId.value,
//           Make: this.Make,   
//           UOMID: this.uomid,
//           UomName: this.uomname,
//           Description: this.f.Description1.value,
//           Price:this.f.UnitPrice.value,
//         };
// debugger;
//         that.lstItems.push(obj);
//       }
//       else
//       {
//         $('#ItemDetails').show();
//       }



// debugger;
//     if (this.ValidateItemDetails()) {
//       //let WeekName:string= this.from
//       debugger;

//       //let WeekName:string= this.from




//       // for (var i = 0; i < this.lstItems.length; i++) {
//       //   this.lstItems[i].Show = 'true';


//       //   if (this.lstItems[i].SNO == this.EditRecNO) {

         
//       //     this.lstItems[i].VendorId = this.getControlValue(this.f.VendorId, 'int');
//       //     this.lstItems[i].ContactName0 = this.getControlValue(this.f.ContactName0, 'string');
//       //     this.lstItems[i].ContactNo1 = this.getControlValue(this.f.ContactNo1, 'string');
//       //     this.lstItems[i].Email2 = this.getControlValue(this.f.Email2, 'string');
//       //     this.lstItems[i].Notes3 = this.getControlValue(this.f.Notes3, 'string');

//       //   }
//       // }
//       if (this.EditItemNO == -1) {
//          var res3 ='';
//         //   ({
//         //     SNO: this.SNO
//         //     ,ItemID: this.getControlValue(this.f.ItemId.value, 'int')
//         //     ,          partNo: this.partNo,
//         //     ,           MakeID: this.getControlValue(this.f.MakeId.value,'int')
//         //     ,          Make: this.Make
//         //     ,           UOMID: this.uomid,
//         //      ,          UomName: this.uomname,
//         //      ,         Description: this.f.Description1.value,
//         //      ,         Price:this.getControlValue(this.f.UnitPrice.value,'int')
//         //      , Show: 'true'

//         //   });

//         if (this.lstItems.length == 0) {
//           this.lstItems = [res3];

//         }
//         else {
//           this.lstItems.push(res3);

//         }
//       }
//       this.EditRecNO = -1;

//       this.ItemDetailsClear();

//       if (value == 'Close') {
//         $("#btnCloseAddItem").trigger('click');
//       }

//       this.SNO = this.lstItems.length + 1;
//     }
//     this.f.LineChanges2.setValue(0);


//     }
//     catch (error) { }
//   }


EditItemDetails(selectedRecord, SNO) {
  
  debugger;
  this.EditRecNO = SNO;
  this.SNO = SNO;
  this.itemid=selectedRecord.ItemId;
  this.itemname=selectedRecord.partNo;

  

  this.CreateVendor.patchValue({
    VendorId: selectedRecord.VendorId  ,
     Show: 'true',
    ItemId: selectedRecord.ItemId,
    partNo: selectedRecord.partNo,
    MakeId: selectedRecord.MakeId,
    Make: selectedRecord.Make,
    UOMID: selectedRecord.UOMID,
    UOM: selectedRecord.UOM,
    Description1: selectedRecord.Description,
    UnitPrice: selectedRecord.Price,
    SNO: selectedRecord.SNO
  });
  this.f.ItemId.setValue(0);
  this.f.partNo.setValue('')
 this.f.ItemId.setValue(selectedRecord.ItemId);
 this.f.partNo.setValue(selectedRecord.partNo)
}

ItemsAdd()
  {
    try
    {

      debugger;

    this.SNO = 1;
    this.EditRecNO = -1;
    
    this.ItemDetailsClear();


    }
    catch(error){}
  }


MoveItems(type) {
  debugger;
  var that=this;
if(this.lstItems==undefined || this.lstItems==null)
{
  this.lstItems=[];
}

  if (this.ValidateItemDetails()) {
  
    debugger;
   

    for (var i = 0; i < this.lstItems.length; i++) {
      this.lstItems[i].Show = 'true';


      if (this.lstItems[i].SNO == this.EditRecNO) {
        this.lstItems[i].VendorId = this.getControlValue(this.f.VendorId, 'int');
        this.lstItems[i].Id = 0;
        this.lstItems[i].ItemId = this.getControlValue(this.f.ItemId, 'int');
        this.lstItems[i].partNo = this.partNo;
        this.lstItems[i].MakeId = this.getControlValue(this.f.MakeId, 'int');
        this.lstItems[i].Make = this.Make;
        this.lstItems[i].UOMId = this.uomid;
        this.lstItems[i].UOM = this.uomname;
        this.lstItems[i].Description = this.getControlValue(this.f.Description1, 'string');
        this.lstItems[i].Price = this.getControlValue(this.f.UnitPrice, 'string');
        this.lstItems[i].ModifiedDate =  new Date();
      }
    }
    if (this.EditRecNO == -1) {
      var res3 =
        ({
          SNO: this.SNO
          , VendorId: this.getControlValue(this.f.VendorId, 'int')  
         ,ItemId : this.getControlValue(this.f.ItemId, 'int')
          ,partNo : this.partNo
          ,MakeId : this.getControlValue(this.f.MakeId, 'int')
          ,Make : this.Make
          ,UOMID : this.uomid
          ,UOM : this.uomname
          ,Description : this.getControlValue(this.f.Description1, 'string')
          ,Price : this.getControlValue(this.f.UnitPrice, 'string')
          , Show: 'true'
          ,ModifiedDate:new Date()
        });

      if (this.lstItems.length == 0) {
        this.lstItems = [res3];

      }
      else {
        this.lstItems.push(res3);

      }
    }
    this.EditRecNO = -1;

    this.ItemDetailsClear();

    if (type == 'Close') {
      $("#btnCloseAddItem").trigger('click');
    }

    this.SNO = this.lstItems.length + 1;
  }
  this.f.LineChanges2.setValue(0);
}

  ItemDetailsClear() {
    debugger;
    this.f.ItemId.setValue(0);
    this.f.ItemName.setValue('');
    this.f.Description1.setValue('');
    this.f.MakeId.setValue(0);
    this.f.Make.setValue('');
    this.f.UOM.setValue('');
    this.f.UOMID.setValue(0);
    this.f.UnitPrice.setValue(0);
    this.submitted = false;
    this.ModifiedDate = "";
    
    this.CreateVendor.patchValue( {

      ItemID: 0,
      ItemName:'',
      Description1:'',
      MakeId:0,
      Make:'',
      UOM:'',
      UOMID:0,
      UnitPrice:0
      });

      this.LoadParts();
    this.LoadMakes();
  }

  RemoveItem() {
    debugger;

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
    this.ItemDetailsClear();

  }

  ValidateItemDetails(): boolean {
    debugger;
    var validate = true;
    this.showError = false;

    
      if ((this.f.ItemId.value != "" && this.f.ItemId.value != undefined ) && 
      (this.f.MakeId.value != "" && this.f.MakeId.value != undefined)   &&
      (this.f.UnitPrice.value != "" && this.f.UnitPrice.value != undefined)    )

   {
      debugger;
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
    debugger;

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
    debugger;

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
  LoadShippingCountries() {
    var that = this;
    debugger;




    (<any>$('#drpshippingsCountry')).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewCountries', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.CountryId;
            obj.text = obj.countryname;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      //, templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });
    debugger;
    var CountrySelection = new Option(this.f.countryname.value, this.f.Country4Id.value.toString(), true, true);

    (<any>$('#drpshippingsCountry')).append(CountrySelection).trigger('change');


    // $('#drpshippingsCountry').on('select2:open', function (e) {

    // debugger;


    //    var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Code</b></td> <td width="50%"><b>Name</b></td> </tr > </tbody> </table>';

    //   var res= $('.select2-search');

    //   var text=res[0].innerText;

    //   if(text=="")
    //    $('.select2-search').append(html);





    // });

    // var that =this;
    $('#drpshippingsCountry').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        // that.CountryId = (<any>e).params.data.id;

        that.f.Country4Id.setValue((<any>e).params.data.id);
        that.f.countryname.setValue((<any>e).params.data.text);
        that.LoadShippingStates();

      }


    });


    $('#drpshippingsCountry').on("select2:unselecting", function (e) {
      debugger;

      that.f.Country4Id.setValue(0);
      that.f.countryname.setValue("");

    });

  }

  Make:string="";
  uomid:number=0;
  uomname:string="";
  partNo:string="";
itemid:number=0;
itemname:string="";
//   LoadParts() {
//     debugger;
//     var that = this;
//     debugger;
//     (<any>$("#stfdrpParts")).select2({
//       allowClear: true,
//       placeholder: "Select",
//       ajax: {
//         url: this.APICall.DBCallingURL,
//         type: "POST",
//         dataType: 'json',
//         delay: 250,
//         data:
//           function (params) {

//             var sstring = "";
//             if (params.term != undefined) {
//               sstring = params.term;
//             }
//             debugger;
//             return JSON.stringify({ "Operation": 'ViewItems', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

//           }
//         ,
//         contentType: 'application/json; charset=utf-8',
//         processResults: function (response) {
//           debugger;

//           var ResultData = (JSON.parse(response['Message'])).Table;
//           var data = $.map(ResultData, function (obj) {

//             obj.id = obj.ItemId;
//             obj.text = obj.partno;
//             obj.text1 = obj.description;
//             obj.uom = obj.uomid;
//             obj.uomname = obj.unitname;
//             obj.text3 = obj.dashno;
//             obj.partno = obj.partno;

//             return obj;
//           });
//           return {
//             results: data
//           };
//         },
//         cache: false
//       }
//     });

//     var that = this;
//     $('#stfdrpParts').on('select2:select', function (e) {    
// debugger;
//       if (typeof ((<any>e).params.data.id) != 'undefined') { 
// debugger;
// that.itemname=(<any>e).params.data.text;
// that.itemid=(<any>e).params.data.id;
//         that.f.ItemId.setValue((<any>e).params.data.id);
//         that.f.ItemName.setValue((<any>e).params.data.text);
//         that.uomid = (<any>e).params.data.invuom;
//         that.f.Description1.setValue((<any>e).params.data.text1);
//         that.f.UOM.setValue((<any>e).params.data.invuomname);
//         that.uomname = (<any>e).params.data.invuomname;
//         that.partNo = (<any>e).params.data.partno;

//         that.f.MakeId.setValue(0);
       
//         that.LoadMakes();
//       }


//     });
//     debugger;
//     $("#stfdrpParts").on("select2:unselecting", function (e) {

//       that.itemname='';
//       that.itemid=0;
//       that.f.ItemId.setValue(0);
//       that.f.MakeID.setValue(0);
//       that.f.ItemName.setValue('');
//       that.f.Description1.setValue('');
//       that.f.transferQty.setValue('');
//     });

//     var selection = new Option(that.itemname, that.itemid.toString(), true, true);
//     //alert(that.ExpenseTypeName);
//     (<any>$('#stfdrpParts')).append(selection).trigger('change');

//   }

LoadParts() {
  debugger;
  var that = this;
  debugger;
  (<any>$("#stfdrpParts")).select2({
    allowClear: true,
    placeholder: "Select",
    ajax: {
      url: this.APICall.DBCallingURL,
      type: "POST",
      dataType: 'json',
      delay: 250,
      data:
        function (params) {

          var sstring = "";
          if (params.term != undefined) {
            sstring = params.term;
          }
          debugger;
          return JSON.stringify({ "Operation": 'ViewItems', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

        }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {


       

        var ResultData = (JSON.parse(response['Message'])).Table;

        var data = $.map(ResultData, function (obj) {


          obj.id = obj.ItemId;
          obj.text = obj.partno;
          obj.text1 = obj.description;
          obj.uom = obj.uom;
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
  $('#stfdrpParts').on('select2:select', function (e) {
    debugger;

    if (typeof ((<any>e).params.data.id) != 'undefined') {

      debugger;



      that.f.ItemId.setValue((<any>e).params.data.id);
      that.f.ItemName.setValue((<any>e).params.data.text);
      that.uomid = (<any>e).params.data.uom;
      that.f.Description1.setValue((<any>e).params.data.text1);
      that.f.UOM.setValue((<any>e).params.data.uomname);
      that.f.UOMID.setValue((<any>e).params.data.uom);
      
     // that.f.uomname.setValue((<any>e).params.data.uomname);
      that.uomname = (<any>e).params.data.uomname;
      that.partNo = (<any>e).params.data.partno;

      that.f.MakeId.setValue(0);
      
      that.LoadMakes();
    }

   

  });
  debugger;
  $("#stfdrpParts").on("select2:unselecting", function (e) {


    that.f.ItemId.setValue(0);
    that.f.ItemId.setValue(0);
    that.f.UOM.setValue(0);
    that.f.ItemName.setValue('');
    that.f.uomname.setValue('');
    that.f.Description1.setValue('');
    that.f.transferQty.setValue('');
  });


  var selection = new Option(that.itemname, that.itemid.toString(), true, true);
 
      (<any>$('#stfdrpParts')).append(selection).trigger('change');
 
}

  PreapareMakeParam(): string {
    debugger;
    var that = this;
    var xmlParaminput = ""
    var uomval = '';
    debugger;
    if (that.f.UOM != undefined && that.f.UOM != null) {
      uomval = that.f.UOM.value;
    }

    xmlParaminput = '<NewDataSet><Table1>'
      + '<ItemID>' + that.f.ItemId.value + '</ItemID>'
      + '<Type>' + 'Sales' + '</Type>'
      + '<PartyId>' + 0 + '</PartyId>'
      + '<UOMID>' + that.uomid + '</UOMID>'
      + '</Table1></NewDataSet>';

    return xmlParaminput;
  }
makeid=0;
  LoadMakes() {
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
            return JSON.stringify({ "Operation": 'ViewMakByItemId', "Params": sstring, "Xml2": 'All', "Xml3": that.PreapareMakeParam(), "Xml4": that.APICall.GetCompanyID() })

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
that.makeid=(<any>e).params.data.id;
      }

      var Makeselection1 = new Option(that.f.Make.value, that.f.MakeId.value.toString(), true, true);

      (<any>$('#drpMake')).append(Makeselection1).trigger('change');



    });


    $("#drpMake").on("select2:unselecting", function (e) {

     

    });

     var selection = new Option(that.Make, that.makeid.toString(), true, true);

    (<any>$('#drpMake')).append(selection).trigger('change');

  }

  LoadShippingStates() {
    var that = this;
    debugger;




    (<any>$("#drpshippingState")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewStateByCountry', "Params": sstring, "Xml2": 'All', "Xml3": that.f.Country4Id.value, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {
            /// if(obj.country.toString()==that.CountryId)
            {
              obj.id = obj.StateId;
              obj.text = obj.Statename;

            }
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      //, templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });


    var StateSelection = new Option(this.f.statename.value, this.f.State5Id.toString(), true, true);

    (<any>$('#drpshippingState')).append(StateSelection).trigger('change');


    //$('#drpshippingState').on('select2:open', function (e) {

    // debugger;


    //    var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Name</b></td> <td width="50%"><b>Gst State Code</b></td> </tr > </tbody> </table>';

    //   var res= $('.select2-search');

    //   var text=res[0].innerText;

    //   if(text=="")
    //    $('.select2-search').append(html);





    // });

    //var that =this;
    $('#drpshippingState').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.State5Id.setValue((<any>e).params.data.id);
        that.f.statename.setValue((<any>e).params.data.text);
        that.LoadShippingCities();
      }


    });


    $("#drpshippingState").on("select2:unselecting", function (e) {
      debugger;

      that.f.State5Id.setValue(0);
      that.f.statename.setValue("");

    });

  }
  LoadCuurency() {
    var that = this;

    (<any>$("#drpCurrency")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewCurrency', "Params": sstring, "Xml2": 'All', "Xml3": '', "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {




          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.CurrencyId;
            obj.text = obj.Currencyname;


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
    $('#drpCurrency').on('select2:select', function (e) {


      debugger;

      if (typeof ((<any>e).params.data.id) != 'undefined') {

        try {
          that.f.CurrencyId.setValue((<any>e).params.data.id);
          that.f.Currencyname.setValue((<any>e).params.data.text);




        } catch (e) {


        }
      }


    });
    debugger;
    var UOMselection = new Option(this.f.Currencyname.value, this.f.CurrencyId.value.toString(), true, true);

    (<any>$('#drpCurrency')).append(UOMselection).trigger('change');






    $("#drpCurrency").on("select2:unselecting", function (e) {


      that.f.CurrencyId.setValue(0);
      that.f.Currencyname.setValue('');

    });

  }
  LoadShippingCities() {
    var that = this;
    debugger;




    (<any>$("#drpshippingCity")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewCityByState', "Params": sstring, "Xml2": 'All', "Xml3": that.f.State5Id.value, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {
            // if(obj.country.toString()==StateId)
            {
              obj.id = obj.CityId;
              obj.text = obj.Cityname;

            }
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      //, templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });
    var CitySelection = new Option(this.f.cityname.value, this.f.City6Id.value.toString(), true, true);

    (<any>$('#drpshippingCity')).append(CitySelection).trigger('change');



    // $('#drpshippingCity').on('select2:open', function (e) {

    // debugger;


    //    var  html = '<table class="table table-bordered table-striped table-responsive-stack" style="margin-top: 5px;margin-bottom: 0px;"> <tbody> <tr> <td width="50%"><b>Code</b></td> <td width="50%"><b>Name</b></td> </tr > </tbody> </table>';

    //   var res= $('.select2-search');

    //   var text=res[0].innerText;

    //   if(text=="")
    //    $('.select2-search').append(html);





    // });

    // var that =this;
    $('#drpshippingCity').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        that.f.City6Id.setValue((<any>e).params.data.id);
        that.f.cityname.setValue((<any>e).params.data.text);

      }


    });


    $("#drpshippingCity").on("select2:unselecting", function (e) {
      debugger;


      that.f.City6Id.setValue(0);
      that.f.cityname.setValue("");

    });

  }
  
  LoadBranchCountries() {
    var that = this;
    debugger;




    (<any>$('#drpBranchCountry')).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewCountries', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.CountryId;
            obj.text = obj.countryname;


            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }
      //, templateResult: this.format
      // ,templateSelection: this.format
      //,minimumInputLength: 3
    });
    debugger;
    var BranchCountrySelection = new Option(this.f.countryname.value, this.f.country.value.toString(), true, true);

    (<any>$('#drpBranchCountry')).append(BranchCountrySelection).trigger('change');


    $('#drpBranchCountry').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        // that.CountryId = (<any>e).params.data.id;

        that.f.country.setValue((<any>e).params.data.id);
        that.f.countryname.setValue((<any>e).params.data.text);
        that.LoadBranchStates();

      }


    });


    $('#drpBranchCountry').on("select2:unselecting", function (e) {
      debugger;

      that.f.country.setValue(0);
      that.f.countryname.setValue("");

    });

  }
  LoadBranchStates() {
    var that = this;
    debugger;




    (<any>$("#drpBranchState")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewStateByCountry', "Params": sstring, "Xml2": 'All', "Xml3": that.f.country.value, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {
            /// if(obj.country.toString()==that.CountryId)
            {
              obj.id = obj.StateId;
              obj.text = obj.Statename;

            }
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }

    });


    var BranchStateSelection = new Option(this.f.statename.value, this.f.state.toString(), true, true);

    (<any>$('#drpBranchState')).append(BranchStateSelection).trigger('change');


    $('#drpBranchState').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.state.setValue((<any>e).params.data.id);
        that.f.statename.setValue((<any>e).params.data.text);
        that.LoadBranchCities();
      }


    });


    $("#drpBranchState").on("select2:unselecting", function (e) {
      debugger;

      that.f.state.setValue(0);
      that.f.statename.setValue("");

    });

  }
  LoadBranchCities() {
    var that = this;
    debugger;




    (<any>$("#drpBranchCity")).select2({
      allowClear: true,
      placeholder: "Select",
      ajax: {
        url: this.APICall.DBCallingURL,
        type: "POST",
        dataType: 'json',
        delay: 250,
        data:
          function (params) {

            var sstring = "";
            if (params.term != undefined) {
              sstring = params.term;
            }
            debugger;
            return JSON.stringify({ "Operation": 'ViewCityByState', "Params": sstring, "Xml2": 'All', "Xml3": that.f.state.value, "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            {
              obj.id = obj.CityId;
              obj.text = obj.Cityname;

            }
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }

    });
    var BranchCitySelection = new Option(this.f.cityname.value, this.f.city.value.toString(), true, true);

    (<any>$('#drpBranchCity')).append(BranchCitySelection).trigger('change');



    $('#drpBranchCity').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        that.f.city.setValue((<any>e).params.data.id);
        that.f.cityname.setValue((<any>e).params.data.text);

      }


    });


    $("#drpBranchCity").on("select2:unselecting", function (e) {
      debugger;


      that.f.city.setValue(0);
      that.f.cityname.setValue("");

    });

  }

  lstDbResult:any=[];
  lstItems:any=[];
  // ViewVendorItems()
  // {   
  //   if(AppSettings.ShowLoaderOnView)
  //     {
  //     $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
  //  $("#loaderParent").show();
  //     }
  //     var sstring="";
  //    debugger;
  //     this.APICall.DBCalling("VendorItemsView",sstring,this.FilterType,this.StoreVendor.VendorId,this.APICall.GetCompanyID()).subscribe(
  //       (res:Response) => {
  //         debugger;
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

    this.SNO = 1;
    this.EditRecNO = -1;

    this.CreateVendor.patchValue({


      AccountNo1: "",
      TextBoxColumn_BankName_1: "",
      BranchName2: "",
      IFSCCode3: "",

    });


  }

  

  ContactAdd() {
    debugger;

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
  // debugger;
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
    debugger;

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
    debugger;
    var value = false;
    if (this.f.iscompany.value == true) {
      value = true;
    }
    return value;

  }
  OnSave() {
    debugger;
    this.submitted = true;

    if (this.CreateVendor.invalid) {
      var Cvalid = true;


      if (this.f.vendorname.invalid && Cvalid) {
        debugger;
        this.windowScroll('vendorname');
        Cvalid = false;
      }
      if (this.f.email.invalid && Cvalid) {
        debugger;
        this.windowScroll('email');
        Cvalid = false;
      }


      return;
    }
    else {
      if (this.f.country.value > 0) {
        this.SaveVendor();
      }
      else {
        (window as any).swal({
          icon: 'warning',
          title: 'Required Field',
          text: 'Country is required field in Billing Tab.!',
          confirmButtonText: 'Dismiss',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-lg btn-warning'
        });
      }

    }
  }
  //#endregion "OnSave"
  //#region "Save city"
  DbResult: any = [];
  lstVendor: any = [];
  lstbankdetails: any = [];
  lstShippingdetails: any = [];
  lstContact: any = [];
  lstTransport: any = [];
  SaveVendor() {
    var valStatus: any = this.getStatus();
    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();


var itemsrow="";
var xxxx="";
    if (this.lstItems != null && this.lstItems != undefined) {
      for (var i = 0; i < this.lstItems.length; i++) {

var val=this.lstItems[i].Id;
if(val==undefined || val == null)
{
val=0;
}


        itemsrow = itemsrow + '<Table2><VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'
          +'<Id>' + val + '</Id>'
          + '<ItemId>' + this.lstItems[i].ItemId + '</ItemId>'        
          + '<PartNo>' + this.lstItems[i].partNo + '</PartNo>'
          + '<MakeId>' + this.lstItems[i].MakeId + '</MakeId>'
          + '<Make>' + this.lstItems[i].Make + '</Make>'
          + '<UOMId>' + this.lstItems[i].UOMID + '</UOMId>'
          + '<UOM>' + this.lstItems[i].UOM + '</UOM>'
          + '<UnitPrice>' + this.lstItems[i].Price + '</UnitPrice>'
          + '<Description>' + this.lstItems[i].Description + '</Description>'
          + '<ModifiedBy>' + this.APICall.GetUserName() + '</ModifiedBy>'
          + '<ModifiedDate>' + this.lstItems[i].ModifiedDate + '</ModifiedDate>'
          +'</Table2>'
      }
      
    }

    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<VendorId>' + this.getControlValue(this.f.VendorId, 'int') + '</VendorId>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<vendorcode>' + this.getControlValue(this.f.vendorcode, 'string') + '</vendorcode>'
      + '<country>' + this.getControlValue(this.f.country, 'int') + '</country>'
      + '<state>' + this.getControlValue(this.f.state, 'int') + '</state>'
      + '<shortname>' + this.getControlValue(this.f.shortname, 'string') + '</shortname>'
      + '<city>' + this.getControlValue(this.f.city, 'int') + '</city>'
      + '<iscompany>' + valStatus + '</iscompany>'
      + '<currency>' + this.f.CurrencyId.value + '</currency>'
      + '<companyname>' + this.getControlValue(this.f.companyname, 'string') + '</companyname>'
      + '<gstno>' + this.getControlValue(this.f.gstno, 'string') + '</gstno>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'int') + '</Contactno>'
      + '<email>' + "" + '</email>'
      //  +'<email>'+this.getControlValue(this.f.email,'string')+'</email>'
      + '<website>' + this.getControlValue(this.f.website, 'string') + '</website>'
      + '<creditlimit>' + this.getControlValue(this.f.creditlimit, 'string') + '</creditlimit>'
      + '<creditdays>' + this.getControlValue(this.f.creditdays, 'string') + '</creditdays>'
      + '<maxbill>' + this.getControlValue(this.f.maxbill, 'string') + '</maxbill>'
      + '<creditrating>' + this.getControlValue(this.f.creditrating, 'int') + '</creditrating>'
      + '<vendorrating>' + this.getControlValue(this.f.vendorrating, 'int') + '</vendorrating>'
      + '<vendorclass>' + this.getControlValue(this.f.vendorclass, 'int') + '</vendorclass>'
      + '<address1>' + this.getControlValue(this.f.address1, 'string') + '</address1>'
      + '<address2>' + this.getControlValue(this.f.address2, 'string') + '</address2>'
      + '<address3>' + this.getControlValue(this.f.address3, 'string') + '</address3>'
      + '<pincode>' + this.getControlValue(this.f.pincode, 'string') + '</pincode>'
      + '<coaid>' + this.getControlValue(this.f.coaid, 'int') + '</coaid>'
      //+'<panno>'+this.getControlValue(this.f.panno,'string')+'</panno>'
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

    if (this.lstbankdetails != null && this.lstbankdetails != undefined) {
      for (var i = 0; i < this.lstbankdetails.length; i++) {

        rows = rows + '<Table1><VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'
          // +'<SNO>'+this.SNO+ '</SNO>'
          + '<PartyBankDetailsgrv_grv4_3Id>' + this.lstbankdetails[i].PartyBankDetailsgrv_grv4_3Id + '</PartyBankDetailsgrv_grv4_3Id>'
          + '<AccountNo1>' + (typeof (this.lstbankdetails[i].AccountNo1) != 'undefined' ? this.lstbankdetails[i].AccountNo1 : '0') + '</AccountNo1>'
          + '<TextBoxColumn_BankName_1>' + this.lstbankdetails[i].TextBoxColumn_BankName_1 + '</TextBoxColumn_BankName_1>'
          + '<BranchName2>' + this.lstbankdetails[i].BranchName2 + '</BranchName2>'
          + '<IFSCCode3>' + this.lstbankdetails[i].IFSCCode3 + '</IFSCCode3></Table1>'
      }
      xml2 = '<NewDataSet>' + rows + '</NewDataSet>';
    }

    var xml3 = "";
    var rows = "";
    debugger;

    if (this.lstShippingdetails != undefined && this.lstShippingdetails != null) {
      for (var i = 0; i < this.lstShippingdetails.length; i++) {
        rows = rows + '<Table1><VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'
          + '<ShippingInfogrv_grv4_3Id>' + this.lstShippingdetails[i].ShippingInfogrv_grv4_3Id + '</ShippingInfogrv_grv4_3Id>'
          + '<ShippingName0>' + (typeof (this.lstShippingdetails[i].ShippingName0) != 'undefined' ? this.lstShippingdetails[i].ShippingName0 : '0') + '</ShippingName0>'
          + '<Address11>' + this.lstShippingdetails[i].Address11 + '</Address11>'
          + '<Address22>' + this.lstShippingdetails[i].Address22 + '</Address22>'
          + '<Address33>' + this.lstShippingdetails[i].Address33 + '</Address33>'
          + '<Country4Id>' + this.lstShippingdetails[i].Country4Id + '</Country4Id>'
          + '<State5Id>' + this.lstShippingdetails[i].State5Id + '</State5Id>'
          + '<City6Id>' + this.lstShippingdetails[i].City6Id + '</City6Id></Table1>'
      }
      xml3 = '<NewDataSet>' + rows + '</NewDataSet>';
    }
    var xml4 = "";
    var rows = "";

    if (this.lstContact != undefined && this.lstContact != null) {
      for (var i = 0; i < this.lstContact.length; i++) {
        rows = rows + '<Table1><VendorId>' + this.getControlValue(this.f.VendorId, 'string') + '</VendorId>'
          + '<ContactInfoMechknowGridView1Id>' + this.lstContact[i].ContactInfoMechknowGridView1Id + '</ContactInfoMechknowGridView1Id>'
          + '<ContactName0>' + (typeof (this.lstContact[i].ContactName0) != 'undefined' ? this.lstContact[i].ContactName0 : '0') + '</ContactName0>'
          + '<ContactNo1>' + this.lstContact[i].ContactNo1 + '</ContactNo1>'
          + '<Email2>' + this.lstContact[i].Email2 + '</Email2>'
          + '<Notes3>' + this.lstContact[i].Notes3 + '</Notes3></Table1>'
      }

      //  var xmlContact=rows;

      //  var rows="";

      //  for(var i=0;i<this.lstTransport.length;i++)
      //  { 
      //   rows=rows+'<Transport><VendorId>'+this.getControlValue(this.f.VendorId,'string')+'</VendorId>'
      //     +'<CustomerTransportId>'+(typeof(this.lstTransport[i].CustomerTransportId)!='undefined'?this.lstTransport[i].CustomerTransportId:'0')+'</CustomerTransportId>'
      //   +'<transportername>'+this.lstTransport[i].transportername+'</transportername>'
      //   +'<TransporterId>'+(typeof(this.lstTransport[i].TransporterId)!='undefined'?this.lstTransport[i].TransporterId:'0')+'</TransporterId>'
      //   +'<area>'+this.lstTransport[i].area+'</area></Transport>'

      //  }
      xml4 = '<NewDataSet>' + rows + '</NewDataSet>';
    }


    debugger;
    this.APICall.DBCalling("SaveVendor", xml1, xml2, xml3, xml4).subscribe(
      (res: Response) => {
        debugger;
        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);
        debugger;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if (this.f.VendorId.value > 0) {
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


            this.f.VendorId.setValue(this.DbResult.Table[0].VendorId);
            //  this.f.coaid.setValue(this.DbResult.Table[0].coaid);
            //  this.f.AccountName.setValue(this.DbResult.Table[0].AccountName);
           // this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;

            //  });
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Saved successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          }
          this.lstVendor = null;
          this.lstVendor = [];
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if (this.DbResult.Table1.length > 0) {
              if (this.DbResult.Table.length > 0) {

                //         try{

                // if(this.DbResult.Table1.length>0)//lstres[0].Table=="DC1")
                // {
                //   //var res1=(( this.DbResult.Table1[0].BankDetails).replace(/\n/g, "")).replace(/'/g,"\"");
                // //var res1=JSON.parse((( this.DbResult.Table1[0].lstDCItems).replace(/\n/g, "")).replace(/'/g,"\""));
                // var lstresbankItems=JSON.parse((( this.DbResult.Table1[0].lstbankdetails).replace(/\n/g, "")).replace(/'/g,"\""));
                // var i=0;
                // var  DC1Itemsdata = $.map(lstresbankItems, function (obj) {
                // i=i+1;
                // obj.SNO = i; 

                // return obj;
                // });

                //         this.lstbankdetails=DC1Itemsdata;


                // }
                // }catch(exce)
                // {}
                // try{
                // if(this.DbResult.Table2.length>0)//lstres[0].Table=="DCTermDetails")
                // {
                // //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                // var lstresshippingChild=JSON.parse((( this.DbResult.Table2[0].lstShippingdetails).replace(/\n/g, "")).replace(/'/g,"\""));

                // var  lstresTermsChilddata = $.map(lstresshippingChild, function (obj) {
                // i=i+1;
                // obj.SNO = i; 

                // return obj;
                // });

                //         this.lstShippingdetails=lstresTermsChilddata;
                // }
                // }catch(exce){}





                // try{
                // if(this.DbResult.Table3.length>0)//lstres[0].Table=="DCTermDetails")
                // {
                // //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                // var lstresContactStock=JSON.parse((( this.DbResult.Table3[0].lstContact).replace(/\n/g, "")).replace(/'/g,"\""));

                // var  lstresDCItemsStockdata = $.map(lstresContactStock, function (obj) {
                // i=i+1;
                // obj.SNO = i; 

                // return obj;
                // });

                //          this.lstContact=lstresDCItemsStockdata;
                // }
                // }catch(exce){}




                // try{
                // if(this.DbResult.Table4.length>0)//lstres[0].Table=="DCTermDetails")
                // {
                // //var res2=(( this.DbResult.Table2[0].lstTermsChild).replace(/\n/g, "")).replace(/'/g,"\"");
                // var lstrestransport=JSON.parse((( this.DbResult.Table4[0].lstTransport).replace(/\n/g, "")).replace(/'/g,"\""));

                // var  lstresChargesdet = $.map(lstrestransport, function (obj) {
                //   i=i+1;
                //   obj.SNO = i; 

                //   return obj;
                // });

                //            this.lstTransport=lstresChargesdet;
                // }
                // }catch(exce){}



              }


              //  var res1=(( this.DbResult.Table1[0].BankDetails).replace(/\n/g, "")).replace(/'/g,"\"");
              //  this.lstbankdetails=JSON.parse(res1);
              //  var res2=(( this.DbResult.Table1[0].ShippingDetails).replace(/\n/g, "")).replace(/'/g,"\"");
              //  this.lstShippingdetails=JSON.parse(res2);
              //  var res3=(( this.DbResult.Table1[0].ContactDetails).replace(/\n/g, "")).replace(/'/g,"\"");
              //  this.lstContact=JSON.parse(res3);
              //  var res4=(( this.DbResult.Table1[0].TransporttDetails).replace(/\n/g, "")).replace(/'/g,"\"");
              //  this.lstContact=JSON.parse(res4);

            }




            //    this.lstbranchTimePropL=this.DbResult.tasks[1];

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
              debugger;

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
debugger;
    this.CreateVendor.patchValue({

      AccountNo1: "",
      TextBoxColumn_BankName_1: "",
      BranchName2: "",
      IFSCCode3: "",


    });

    // $('#drpVehicleModel').val(null).trigger('change');
    if(this.lstbankdetails.length>0){
    this.SNO = this.lstbankdetails.length + 1;
    }else{
      this.lstbankdetails.length===0;
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
    debugger;
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

    debugger;
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

    debugger;
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

    debugger;
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

  // debugger;
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

    debugger;
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

    debugger;
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

    debugger;
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

  // debugger;
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
    debugger;

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
    debugger;
    this.f.SequenceNumberId.setValue(value);

  }
  ClearViewData() {

    this.ModifiedDate = "";
    this.CreateVendor.patchValue({
      vendorname: "",
      vendorcode: "",
      country: 0,
      shortname: "",
      SequenceNumberId: 0,
      city: "",
      iscompany: "",
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
      //Citycode:"",
      address3: "",
      state: "",
      coaid: 0,
      panno: "",
      companyname: ""

    });

    this.DispalyAccountName = "";
    //this.Displaytransportname="";
    this.DisplayCOAId = "0";
    this.BankDetailsClear();
    this.ShippingDetailsClear();
    this.ContactDetailsClear();
   // this.CustomerTransporterClear();
    this.lstVendor = [];
    this.lstItems=[];
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
  ModifiedDate = "";

  //#region "View OnInit"
  DeviceType = "";
  StoreVendor: Vendor;
  UniqueserialNoChange(target) {
    debugger;
    this.StoreVendor.iscompany = target.checked;



  }
  ngOnInit() {
    this.DeviceType = localStorage.getItem('DeviceType')

    this.StoreVendor = new Vendor;
  
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


 var result1 = this.store.source['value']['Tab'].filter((x) => { return (x.TabId == ActivatedRoute && x.ViewName == "RequestFromDC"); });
 if (result1.length > 0) {
   debugger;
  this.StoreVendor = result1[0];
  var VendorId = this.StoreVendor.VendorId;
  this.submitted = Boolean(this.StoreVendor.submitted);
  this.CreateVendor.patchValue(this.StoreVendor);
this.f.vendorname.setValue(this.StoreVendor.vendorname1)
 this.f.vendorcode.setValue(this.StoreVendor.vendorcode1)
this.f.iscompany.setValue('true')
//this.f.Address22.setValue
  this.StoreVendor.TabId = ActivatedRoute;
  this.viewcustomer(VendorId);
}else{
 
 var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
debugger;
    if (result.length > 0) {
            this.StoreVendor = result[0]
      this.ModifiedDate = this.StoreVendor.ModifiedDate.toString();
      this.StoreVendor.TabId = ActivatedRoute;
      this.submitted = Boolean(this.StoreVendor.submitted);
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
      that.StoreVendor.address3 = value.address3;
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

  //#endregion "View OnInit"

  //#region "After View Init"
  ngAfterViewInit() {
    (<any>$("#drpshippingState")).select2();
    (<any>$("#drpshippingCity")).select2();
    // (<any> $("#drptransport")).select2();
    (<any>$("#drpBranchCountry")).select2();
    (<any>$("#drpBranchState")).select2();
    (<any>$("#drpBranchCity")).select2();
    (<any>$("#drpCurrency")).select2();
    this.LoadShippingCountries();
    //  this.LoadTransport();
    this.LoadBranchCountries();
     this.LoadBranchStates();
     this.LoadBranchCities();
    this.LoadCuurency();
    this.LoadParts();
    
    $("#Image").attr("src", this.APICall.ImagePath + this.getControlValue(this.f.Image, 'string'));




    //this.LoadShippingTransport();

    //   var TransportSelection = new Option(this.f.transportername.value,this.f.TransporterId.value.toString(), true, true);

    // (<any> $('#drptransport')).append(TransportSelection).trigger('change');
  }

  EditRecNO = -1;
  //#region "Package Line Items"


  showError = false;
  errormsg = "";
  ValidateBankDetails(): boolean {
    debugger;
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.AccountNo1, 'string') != ""
      && this.getControlValue(this.f.TextBoxColumn_BankName_1, 'string') != ""
      && this.getControlValue(this.f.BranchName2, 'string') != ""
      && this.getControlValue(this.f.IFSCCode3, 'string') != ""
    ) {
      debugger;
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
    debugger;
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
      debugger;
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
    debugger;
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.ContactName0, 'string') != ""
      && this.getControlValue(this.f.ContactNo1, 'string') != ""
      && this.getControlValue(this.f.Email2, 'string') != ""
      && this.getControlValue(this.f.Notes3, 'string') != ""

    ) {
      debugger;
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
  // ValidateCustomerTransporter():boolean
  // {
  // debugger;
  // var validate=true;
  // this.showError=false;


  // if(
  // this.getControlValue(this.f.transportername,'string')!="" 
  // && this.getControlValue(this.f.area,'string')!=""


  // )
  // {
  // debugger;
  // for(var  i=0;i<this.lstTransport.length;i++)
  // {
  // if( this.EditRecNO!=this.lstTransport[i].SNO && this.lstTransport[i].transportername==this.getControlValue(this.f.transportername,'string'))
  // {
  // validate=false;
  // this.showError=true;
  // this.errormsg="Already exists!";
  // break;

  // }  

  // }
  // }else
  // {
  // validate=false;
  // this.showError=true;
  // this.errormsg="Invalid Data!";
  // }
  // return validate;
  // }
  EditBankDetailsClick(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateVendor.patchValue({

      AccountNo1: selectedRecord.AccountNo1,
      TextBoxColumn_BankName_1: selectedRecord.TextBoxColumn_BankName_1,
      BranchName2: selectedRecord.BranchName2,
      IFSCCode3: selectedRecord.IFSCCode3,
      VendorId: selectedRecord.VendorId,
      SNO: selectedRecord.SNO
    });
  }


  EditShipping(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateVendor.patchValue({

      ShippingName0: selectedRecord.ShippingName0,
      Address11: selectedRecord.Address11,
      Address22: selectedRecord.Address22,
      Address33: selectedRecord.Address33,
      Country4Id: selectedRecord.Country4Id,
      State5Id: selectedRecord.State5Id,
      City6Id: selectedRecord.City6Id,
      countryname: selectedRecord.countryname,
      statename: selectedRecord.statename,
      cityname: selectedRecord.cityname,
      VendorId: selectedRecord.VendorId,
      SNO: selectedRecord.SNO
    });


    var CitySelection = new Option(this.f.cityname.value, this.f.City6Id.value.toString(), true, true);

    (<any>$('#drpshippingCity')).append(CitySelection).trigger('change');

    var StateSelection = new Option(this.f.statename.value, this.f.State5Id.toString(), true, true);

    (<any>$('#drpshippingState')).append(StateSelection).trigger('change');

    var CountrySelection = new Option(this.f.countryname.value, this.f.Country4Id.value.toString(), true, true);

    (<any>$('#drpshippingsCountry')).append(CountrySelection).trigger('change');

  }

  EditContact(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateVendor.patchValue({

      ContactName0: selectedRecord.ContactName0,
      ContactNo1: selectedRecord.ContactNo1,
      Email2: selectedRecord.Email2,
      Notes3: selectedRecord.Notes3,
      VendorId: selectedRecord.VendorId,
      SNO: selectedRecord.SNO
    });
  }
  
  AddBank(type) {
    debugger;

    if (this.ValidateBankDetails()) {
      //let WeekName:string= this.from
      debugger;
      for (var i = 0; i < this.lstbankdetails.length; i++) {
        this.lstbankdetails[i].Show = 'true';


        if (this.lstbankdetails[i].SNO == this.EditRecNO) {

          //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstbankdetails[i].VendorId = this.getControlValue(this.f.VendorId, 'int')

          this.lstbankdetails[i].AccountNo1 = this.getControlValue(this.f.AccountNo1, 'string');
          this.lstbankdetails[i].TextBoxColumn_BankName_1 = this.getControlValue(this.f.TextBoxColumn_BankName_1, 'string');
          this.lstbankdetails[i].BranchName2 = this.getControlValue(this.f.BranchName2, 'string');
          this.lstbankdetails[i].IFSCCode3 = this.getControlValue(this.f.IFSCCode3, 'string');

        }
      }
      if (this.EditRecNO == -1) {
        var res1 =
          ({
            SNO: this.SNO
            , VendorId: this.getControlValue(this.f.VendorId, 'int')
            , PartyBankDetailsgrv_grv4_3Id: 0
            , AccountNo1: this.getControlValue(this.f.AccountNo1, 'string')
            , TextBoxColumn_BankName_1: this.getControlValue(this.f.TextBoxColumn_BankName_1, 'string')
            , BranchName2: this.getControlValue(this.f.BranchName2, 'string')
            , IFSCCode3: this.getControlValue(this.f.IFSCCode3, 'string')
            , Show: 'true'
          });

        if (this.lstbankdetails.length == 0) {
          this.lstbankdetails = [res1];

        }
        else {
          this.lstbankdetails.push(res1);

        }
      }
      this.EditRecNO = -1;

      this.BankDetailsClear();

      if (type == 'Close') {
        $("#btnCloseBankItems").trigger('click');
      }

      this.SNO = this.lstbankdetails.length + 1;

    }
    this.f.LineChanges.setValue(0);
  }
  
  AddShipping(type) {
    debugger;

    if (this.ValidateShippingDetails()) {
      //let WeekName:string= this.from
      debugger;
      //let WeekName:string= this.from

      for (var i = 0; i < this.lstShippingdetails.length; i++) {
        this.lstShippingdetails[i].Show = 'true';


        if (this.lstShippingdetails[i].SNO == this.EditRecNO) {

          //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstShippingdetails[i].VendorId = this.getControlValue(this.f.VendorId, 'int');

          this.lstShippingdetails[i].ShippingName0 = this.getControlValue(this.f.ShippingName0, 'string');
          this.lstShippingdetails[i].Address11 = this.getControlValue(this.f.Address11, 'string');
          this.lstShippingdetails[i].Address22 = this.getControlValue(this.f.Address22, 'string');
          this.lstShippingdetails[i].Address33 = this.getControlValue(this.f.Address33, 'string');
          this.lstShippingdetails[i].Country4Id = this.getControlValue(this.f.Country4Id, 'string');
          this.lstShippingdetails[i].State5Id = this.getControlValue(this.f.State5Id, 'string');
          this.lstShippingdetails[i].City6Id = this.getControlValue(this.f.City6Id, 'string');
          this.lstShippingdetails[i].countryname = this.getControlValue(this.f.countryname, 'string');
          this.lstShippingdetails[i].statename = this.getControlValue(this.f.statename, 'string');
          this.lstShippingdetails[i].cityname = this.getControlValue(this.f.cityname, 'string');

        }
      }
      if (this.EditRecNO == -1) {
        var res2 =
          ({
            SNO: this.SNO
            , VendorId: this.getControlValue(this.f.VendorId, 'int')
            , ShippingInfogrv_grv4_3Id: 0
            , ShippingName0: this.getControlValue(this.f.ShippingName0, 'string')
            , Address11: this.getControlValue(this.f.Address11, 'string')
            , Address22: this.getControlValue(this.f.Address22, 'string')
            , Address33: this.getControlValue(this.f.Address33, 'string')
            , Country4Id: this.getControlValue(this.f.Country4Id, 'string')
            , State5Id: this.getControlValue(this.f.State5Id, 'string')
            , City6Id: this.getControlValue(this.f.City6Id, 'string')
            , countryname: this.getControlValue(this.f.countryname, 'string')
            , statename: this.getControlValue(this.f.statename, 'string')
            , cityname: this.getControlValue(this.f.cityname, 'string')
            , Show: 'true'
          });

        if (this.lstShippingdetails.length == 0) {
          this.lstShippingdetails = [res2];

        }
        else {
          this.lstShippingdetails.push(res2);

        }
      }
      this.EditRecNO = -1;

      this.ShippingDetailsClear();

      if (type == 'Close') {
        $("#btnCloseShippingItems").trigger('click');
      }

      this.SNO = this.lstShippingdetails.length + 1;
    }
    this.f.LineChanges1.setValue(0);
  }


  AddContact(type) {
    debugger;
    if (this.ValidateContactDetails()) {
      //let WeekName:string= this.from
      debugger;

      //let WeekName:string= this.from

      for (var i = 0; i < this.lstContact.length; i++) {
        this.lstContact[i].Show = 'true';


        if (this.lstContact[i].SNO == this.EditRecNO) {

          //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstContact[i].VendorId = this.getControlValue(this.f.VendorId, 'int');
          this.lstContact[i].ContactName0 = this.getControlValue(this.f.ContactName0, 'string');
          this.lstContact[i].ContactNo1 = this.getControlValue(this.f.ContactNo1, 'string');
          this.lstContact[i].Email2 = this.getControlValue(this.f.Email2, 'string');
          this.lstContact[i].Notes3 = this.getControlValue(this.f.Notes3, 'string');

        }
      }
      if (this.EditRecNO == -1) {
        var res3 =
          ({
            SNO: this.SNO
            , VendorId: this.getControlValue(this.f.VendorId, 'int')
            , ContactInfoMechknowGridView1Id: 0
            , ContactName0: this.getControlValue(this.f.ContactName0, 'string')
            , ContactNo1: this.getControlValue(this.f.ContactNo1, 'string')
            , Email2: this.getControlValue(this.f.Email2, 'string')
            , Notes3: this.getControlValue(this.f.Notes3, 'string')
            , Show: 'true'
          });

        if (this.lstContact.length == 0) {
          this.lstContact = [res3];

        }
        else {
          this.lstContact.push(res3);

        }
      }
      this.EditRecNO = -1;

      this.ContactDetailsClear();

      if (type == 'Close') {
        $("#btnCloseContactItems").trigger('click');
      }

      this.SNO = this.lstContact.length + 1;
    }
    this.f.LineChanges2.setValue(0);
  }
  // AddTransport(type)
  // {
  // debugger;
  // if(this.ValidateCustomerTransporter())
  // {
  // //let WeekName:string= this.from
  // debugger;

  // //let WeekName:string= this.from

  // for(var  i=0;i<this.lstTransport.length;i++)
  // {
  // this.lstTransport[i].Show='true';


  // if(this.lstTransport[i].SNO==this.EditRecNO)
  // {

  // //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
  //  this.lstTransport[i].VendorId=this.getControlValue(this.f.VendorId,'int');
  //  this.lstTransport[i].TransporterId=this.getControlValue(this.f.TransporterId,'int');
  //   this.lstTransport[i].transportername=this.getControlValue(this.f.transportername,'string');
  //   this.lstTransport[i].area=this.getControlValue(this.f.area,'string');


  // }
  // }
  // if(this.EditRecNO==-1)
  // {
  // var res4=
  //          ({
  //           SNO:this.SNO
  //          ,VendorId:this.getControlValue(this.f.VendorId,'int')
  //          ,TransporterId:this.getControlValue(this.f.TransporterId,'int')
  //          ,transportername:this.getControlValue(this.f.transportername,'string')
  //          ,area:this.getControlValue(this.f.area,'string')

  //          ,Show:'true'
  //          });

  // if(this.lstTransport.length==0)
  // {
  // this.lstTransport=[res4];

  // }
  // else{
  // this.lstTransport.push(res4);

  // }
  // }
  // this.EditRecNO=-1;

  //          this.CustomerTransporterClear();

  //          if(type=='Close')
  //          {
  //            $("#btnCloseTransportItems").trigger('click');
  //          }

  //          this.SNO=this.lstTransport.length+1;
  //         }
  //          this.f.LineChanges3.setValue(0);
  // }

  RemoveBank() {
    debugger;

    var sliceIndex = -1;
    for (var i = 0; i < this.lstbankdetails.length; i++) {
      this.lstbankdetails[i].Show = 'true';

      if (this.lstbankdetails[i].SNO == this.EditRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstbankdetails.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstbankdetails.length; i++) {
        this.lstbankdetails[i].SNO = i + 1;
      }
    }

    this.EditRecNO = -1;
    this.SNO = this.lstbankdetails.length + 1;
    this.BankDetailsClear();

  }

  RemoveShipping() {
    debugger;

    var sliceIndex = -1;
    for (var i = 0; i < this.lstShippingdetails.length; i++) {
      this.lstShippingdetails[i].Show = 'true';

      if (this.lstShippingdetails[i].SNO == this.EditRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstShippingdetails.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstShippingdetails.length; i++) {
        this.lstShippingdetails[i].SNO = i + 1;
      }
    }

    this.EditRecNO = -1;
    this.SNO = this.lstShippingdetails.length + 1;
    this.ShippingDetailsClear();

  }
  RemoveContact() {
    debugger;

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
  // RemoveTransport()
  // {
  // debugger;

  // var  sliceIndex=-1;
  // for(var  i=0;i<this.lstTransport.length;i++)
  // {
  // this.lstTransport[i].Show='true';

  //  if(this.lstTransport[i].SNO==this.EditRecNO)
  //  {
  //  sliceIndex=i;
  //  }
  // }
  // if(sliceIndex>-1)
  // {
  // this.lstTransport.splice(sliceIndex, 1);

  // for(var  i=0;i<this.lstTransport.length;i++)
  // {
  //   this.lstTransport[i].SNO=i+1;
  // }
  // }

  // this.EditRecNO=-1;
  // this.SNO=this.lstTransport.length+1;
  //        this.CustomerTransporterClear();

  // }//#endregion "After View Init"


  selectedFile: ImageSnippet;

  //#region "ImageUpload"

  ImagefileChange($event, ControlName) {
    debugger;
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
        debugger;


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
    debugger;

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

  viewcustomer(VendorId){

 
    if(AppSettings.ShowLoaderOnView)
      {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
   
   $("#loaderParent").show();
      }
      var sstring='';
     
     debugger;
      this.APICall.DBCalling("ViewVendor",sstring,this.FilterType,VendorId,this.APICall.GetCompanyID()).subscribe(
        (res:Response) => {
          debugger;
          this.DbResult = JSON.parse(res['Message']);
          this.CreateVendor.patchValue(this.DbResult);
          if (this.DbResult.Table.length > 0) {

            var resp = this.DbResult.Table[0].ShippingDetails;
            
   
          if(resp!=null && typeof(resp)!=undefined)
          {
   
          var res2=((resp).replace(/\n/g, "")).replace(/'/g,"\"");
          
          
          this.lstShippingdetails=JSON.parse(res2);
   
          var i=0;
          var  data = $.map(this.lstShippingdetails, function (obj) {
            i=i+1;
            obj.SNO = i; 
         
            return obj;
          });
        
          this.lstShippingdetails=data;
          this.StoreVendor.lstShippingdetails=this.lstShippingdetails;
        }
   
         // binding the array to resp variable contcat details
   
        var resp1 = this.DbResult.Table[0].ContactDetails;
   
        if(resp1!=null && typeof(resp1)!=undefined)
        {
          
          var res3=((resp1).replace(/\n/g, "")).replace(/'/g,"\"");
          
          
          this.lstContact=JSON.parse(res3);
   
          var i=0;
          var  data = $.map(this.lstContact, function (obj) {
            i=i+1;
            obj.SNO = i; 
         
            return obj;
          });
          this.lstContact=data;
          this.StoreVendor.lstContact=this.lstContact;
   
          }
  

          // binding the array to resp2 variable transport  details
   
          var resp2 = this.DbResult.Table[0].ItemDetails;
          if(resp2!=null && typeof(resp2)!=undefined)
          {
   
          var res4=((resp2).replace(/\n/g, "")).replace(/'/g,"\"");
          
          
          this.lstItems=JSON.parse(res4);
          var i=0;
    var  data = $.map(this.lstItems, function (obj) {
      i=i+1;
      obj.SNO = i; 
   
      return obj;
    });
   
    this.lstItems=data;
    this.StoreVendor.lstItems=this.lstItems;
           }
   
           
          var resp4 = this.DbResult.Table[0].BankDetails;
   
          if(resp4!=null && typeof(resp4)!=undefined)
          {
            
            var res5=((resp4).replace(/\n/g, "")).replace(/'/g,"\"");
            
            
            this.lstbankdetails=JSON.parse(res5);
     
            var i=0;
            var  data = $.map(this.lstbankdetails, function (obj) {
              i=i+1;
              obj.SNO = i; 
           
              return obj;
            });
            this.lstbankdetails=data;
            this.StoreVendor.lstContact=this.lstbankdetails;
     
            }
           this.BindControlData();
         }

          $("#loaderParent").hide();
        });


  }

}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}