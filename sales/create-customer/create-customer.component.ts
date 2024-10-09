import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { APICallingService } from 'src/app/apicalling.service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Customer } from 'src/app/store/Customer';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import { StoreAccountingSettings } from 'src/app/Store/StoreAccountingSettings';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers:[DatePipe]
})
export class CreateCustomerComponent implements OnInit {
  CreateCustomer: FormGroup;
  //#region "View constructor"

  DispalyAccountName = "";
  DispalyFormName = 'Customer';
  DisplayCOAId = "";
  DisplaySequenceNumberId = 0;
  ModifiedDate = "";
  StoreAccountingSettings: StoreAccountingSettings;
  myDate :string='';

  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>,private datePipe: DatePipe) {


    this.CreateCustomer = formBuilder.group(

      {
        SequenceNumberId: new FormControl(0),
        Customercode: new FormControl(''),
        Customername: new FormControl('', [Validators.required]),
        shortname: new FormControl('', [Validators.required]),
        country: new FormControl(''),
        //state:new FormControl(''),
        // city:new FormControl(''),
        IsCashCustomer:new FormControl(''),
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
        customerrating: new FormControl(''),
        SearchString: new FormControl(''),
        customerclass: new FormControl(''),
        Customeraccount: new FormControl(0),
        address1: new FormControl(''),
        address2: new FormControl(''),
        address3: new FormControl(''),
        countryname: new FormControl(''),
        Pincode: new FormControl(''),
        //DispalyStateName:new FormControl(''),
        DispalyCityName: new FormControl(''),
        coaid: new FormControl(0),
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
        Ctyname: new FormControl(''),
        ShippingName0: new FormControl(''),
        Address11: new FormControl(''),
        Address22: new FormControl(''),
        Address33: new FormControl(''),
        ShippingCountry: new FormControl(''),
        ContactName0: new FormControl(''),
        ContactNo1: new FormControl(''),
        Email2: new FormControl('', [Validators.email]),
        LineChanges: new FormControl(0),
        LineChanges1: new FormControl(0),
        LineChanges2: new FormControl(0),
        LineChanges3: new FormControl(0),
        transportername: new FormControl(''),
        Image: new FormControl(''),
        CustomerId: new FormControl(0),
        Transportername: new FormControl(''),
        //TransporterId:new FormControl(''),
        TransportId: new FormControl(''),
        area: new FormControl(''),
        Notes3: new FormControl(''),
        statename: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl('')


      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

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
  //CustomerId=0;

  GetCountryDetById($event) {
    debugger;

    this.f.CustomerId = $event;
    //this.CustomerId=$event;
  }
  

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


    var StateSelection = new Option(this.f.statename.value, this.f.State5Id.toString(), true, true);

    (<any>$('#drpshippingState')).append(StateSelection).trigger('change');

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

    });
    var CitySelection = new Option(this.f.cityname.value, this.f.City6Id.value.toString(), true, true);

    (<any>$('#drpshippingCity')).append(CitySelection).trigger('change');


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
  LoadTransport() {
    var that = this;
    debugger;
    (<any>$('#drptransport')).select2({
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
            return JSON.stringify({ "Operation": 'ViewTransporter', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": that.APICall.GetCompanyID() })

          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {


          debugger;

          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.TransporterId;
            obj.text = obj.Transportername;
            obj.text1=obj.area;
            return obj;
          });



          return {


            results: data

          };
        },
        cache: false

      }

    });
    debugger;
    var TransportSelection = new Option(this.f.transportername.value, this.f.TransporterId.value.toString(), true, true);

    (<any>$('#drptransport')).append(TransportSelection).trigger('change');


    $('#drptransport').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        that.f.TransporterId.setValue((<any>e).params.data.id);
        that.f.transportername.setValue((<any>e).params.data.text);
      that.f.area.setValue((<any>e).params.data.text1)

      }


    });


    $('#drptransport').on("select2:unselecting", function (e) {
      debugger;

      that.f.TransporterId.setValue(0);
      that.f.transportername.setValue("");
      that.f.area.setValue("")

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
  BankAdd() {
    debugger;

    this.SNO = 1;
    this.EditRecNO = -1;
    this.CreateCustomer.patchValue({


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

    this.CreateCustomer.patchValue({


      ContactName0: "",
      ContactNo1: "",
      Email2: "",


    });


  }
  transportAdd() {
    debugger;
    this.EditRecNO = -1;
    this.SNO = 1;


    this.CreateCustomer.patchValue({


      area: "",
      transportername: "",
      //WEF:'',


    });
    $('#drptransport').val(null).trigger('change');


  }
  OnshippingAdd() {
    debugger;

    this.SNO = 1;
    this.EditRecNO = -1;

    this.CreateCustomer.patchValue({


      Address11: "",
      Address22: "",
      Address33: "",
      Country4Id: 0,
      State5Id: 0,
      City6Id: 0,
      ShippingName0: "",
      countryname: "",
      statename: "",
      cityname: ""



      //WEF:'',


    });
    (<any>$('#drpshippingsCountry')).val(null).trigger('change');
    (<any>$('#drpshippingState')).val(null).trigger('change');
    (<any>$('#drpshippingCity')).val(null).trigger('change');

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


    if (this.CreateCustomer.invalid) {
      var Cvalid = true;


      // if (this.f.Customername.invalid && Cvalid) {
      //   debugger;
      //   this.windowScroll('Customername');
      //   Cvalid = false;
      // }
      // if (this.f.email.invalid && Cvalid) {
      //   debugger;
      //   this.windowScroll('email');
      //   Cvalid = false;
      // }

      return;
    }
    else {
      this.SaveCustomer();
    }
  }
  NumberSequenceValueChange(value) {
    debugger;
    this.f.SequenceNumberId.setValue(value);

  }

  CustomernameChange(event) {
    debugger;
    var val = event;
    this.CreateCustomer.patchValue({
      shortname: val,
      companyname: val

    });

  }

  //#endregion "OnSave"
  //#region "Save city"
  DbResult: any = [];
  lstCustomer: any = [];
  lstbankdetails: any = [];
  lstShippingdetails: any = [];
  lstContact: any = [];
  lstTransport: any = [];
  SaveCustomer() {
    if (this.ModifiedDate == '' || this.ModifiedDate == null || this.ModifiedDate == undefined) {

      var dt = new Date();
      var day, mth, yr, hr, mm, ss;

      day = dt.getDate();
      mth = dt.getMonth();
      yr = dt.getFullYear();
      hr = dt.getHours();
      mm = dt.getMonth();
      ss = dt.getSeconds();

      var strDate = yr + "-" + mm + "-" + day + " " + hr + ":" + mm + ":" + ss;

      this.ModifiedDate = strDate;

    }

    var valStatus: any = this.getStatus();
    debugger;
    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<CustomerId>' + this.getControlValue(this.f.CustomerId, 'int') + '</CustomerId>'
      + '<SequenceNumberId>' + this.getControlValue(this.f.SequenceNumberId, 'int') + '</SequenceNumberId>'
      + '<Customercode>' + this.getControlValue(this.f.Customercode, 'string') + '</Customercode>'
      + '<country>' + this.getControlValue(this.f.country, 'int') + '</country>'
      + '<state>' + this.getControlValue(this.f.state, 'int') + '</state>'
      + '<shortname>' + this.getControlValue(this.f.shortname, 'string') + '</shortname>'
      + '<city>' + this.getControlValue(this.f.city, 'int') + '</city>'
      + '<iscompany>' + valStatus + '</iscompany>'
      + '<IsCashCustomer>' + this.getControlValue(this.f.IsCashCustomer, 'int')  + '</IsCashCustomer>'
      + '<companyname>' + this.getControlValue(this.f.companyname, 'string') + '</companyname>'
      + '<gstno>' + this.getControlValue(this.f.gstno, 'string') + '</gstno>'
      + '<Contactno>' + this.getControlValue(this.f.Contactno, 'int') + '</Contactno>'
      + '<email>' + this.getControlValue(this.f.email, 'string') + '</email>'
      + '<website>' + this.getControlValue(this.f.website, 'string') + '</website>'
      + '<creditlimit>' + this.getControlValue(this.f.creditlimit, 'string') + '</creditlimit>'
      + '<creditdays>' + this.getControlValue(this.f.creditdays, 'string') + '</creditdays>'
      + '<maxbill>' + this.getControlValue(this.f.maxbill, 'string') + '</maxbill>'
      + '<creditrating>' + this.getControlValue(this.f.creditrating, 'int') + '</creditrating>'
      + '<customerrating>' + this.getControlValue(this.f.customerrating, 'int') + '</customerrating>'
      + '<customerclass>' + this.getControlValue(this.f.customerclass, 'int') + '</customerclass>'
      + '<address1>' + this.getControlValue(this.f.address1, 'string') + '</address1>'
      + '<address2>' + this.getControlValue(this.f.address2, 'string') + '</address2>'
      + '<address3>' + this.getControlValue(this.f.address3, 'string') + '</address3>'
      + '<pincode>' + this.getControlValue(this.f.Pincode, 'string') + '</pincode>'
      + '<coaid>' + this.getControlValue(this.f.coaid, 'int') + '</coaid>'
      + '<panno>' + this.getControlValue(this.f.panno, 'string') + '</panno>'
      + '<Image>' + this.getControlValue(this.f.Image, 'string') + '</Image>'


      + '<Customername>' + this.getControlValue(this.f.Customername, 'string') + '</Customername>'

      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '</Table1></NewDataSet>';
    var xml2 = "";
    var rows = "";


    if(this.lstbankdetails==undefined ||  this.lstbankdetails==null)
    {
      this.lstbankdetails=[];
    }


    for (var i = 0; i < this.lstbankdetails.length; i++) {

      rows = rows + '<Table1><CustomerId>' + this.getControlValue(this.f.CustomerId, 'string') + '</CustomerId>'
        // +'<SNO>'+this.SNO+ '</SNO>'
        + '<PartyBankDetailsgrv_grv4_3Id>' + this.lstbankdetails[i].PartyBankDetailsgrv_grv4_3Id + '</PartyBankDetailsgrv_grv4_3Id>'
        + '<AccountNo1>' + (typeof (this.lstbankdetails[i].AccountNo1) != 'undefined' ? this.lstbankdetails[i].AccountNo1 : '0') + '</AccountNo1>'
        + '<TextBoxColumn_BankName_1>' + this.lstbankdetails[i].TextBoxColumn_BankName_1 + '</TextBoxColumn_BankName_1>'
        + '<BranchName2>' + this.lstbankdetails[i].BranchName2 + '</BranchName2>'
        + '<IFSCCode3>' + this.lstbankdetails[i].IFSCCode3 + '</IFSCCode3></Table1>'
    }
    xml2 = '<NewDataSet>' + rows + '</NewDataSet>';

    var xml3 = "";
    var rows = "";
    debugger;

    if(this.lstShippingdetails==undefined ||  this.lstShippingdetails==null)
    {
      this.lstShippingdetails=[];
    }

    for (var i = 0; i < this.lstShippingdetails.length; i++) {
      rows = rows + '<Table1><CustomerId>' + this.getControlValue(this.f.CustomerId, 'string') + '</CustomerId>'
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

    var xml4 = "";
    var rows = "";

    if(this.lstContact==undefined ||  this.lstContact==null)
    {
      this.lstContact=[];
    }
    for (var i = 0; i < this.lstContact.length; i++) {
      rows = rows + '<Contact><CustomerId>' + this.getControlValue(this.f.CustomerId, 'string') + '</CustomerId>'
        + '<ContactInfoMechknowGridView1Id>' + this.lstContact[i].ContactInfoMechknowGridView1Id + '</ContactInfoMechknowGridView1Id>'
        + '<ContactName0>' + (typeof (this.lstContact[i].ContactName0) != 'undefined' ? this.lstContact[i].ContactName0 : '0') + '</ContactName0>'
        + '<ContactNo1>' + this.lstContact[i].ContactNo1 + '</ContactNo1>'
        + '<Email2>' + this.lstContact[i].Email2 + '</Email2>'
        + '<Notes3>' + this.lstContact[i].Notes3 + '</Notes3></Contact>'
    }
    var xmlContact = rows;

    var rows = "";
    if(this.lstTransport==undefined ||  this.lstTransport==null)
    {
      this.lstTransport=[];
    }
    for (var i = 0; i < this.lstTransport.length; i++) {
      rows = rows + '<Transport><CustomerId>' + this.getControlValue(this.f.CustomerId, 'string') + '</CustomerId>'
        + '<CustomerTransportId>' + (typeof (this.lstTransport[i].CustomerTransportId) != 'undefined' ? this.lstTransport[i].CustomerTransportId : '0') + '</CustomerTransportId>'
        + '<transportername>' + this.lstTransport[i].transportername + '</transportername>'
        + '<TransporterId>' + (typeof (this.lstTransport[i].TransporterId) != 'undefined' ? this.lstTransport[i].TransporterId : '0') + '</TransporterId>'
        + '<area>' + this.lstTransport[i].area + '</area></Transport>'

    }
    xml4 = '<NewDataSet>' + xmlContact + rows + '</NewDataSet>';

    debugger;
    this.APICall.DBCalling("SaveCustomer", xml1, xml2, xml3, xml4).subscribe(
      (res: Response) => {
        debugger;
        $("#loaderParent").hide();

        this.DbResult = JSON.parse(res['Message']);
        debugger;
        if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
          if (this.f.CustomerId.value > 0) {
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


            this.f.CustomerId.setValue(this.DbResult.Table[0].CustomerId);
            //  this.f.coaid.setValue(this.DbResult.Table[0].coaid);
            //  this.f.AccountName.setValue(this.DbResult.Table[0].AccountName);
            this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;

            //  });
            (window as any).swal({
              icon: 'success',
              title: 'Information!',
              text: 'Record Saved successfully.',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-success'
            });
          }
          this.lstCustomer = null;
          this.lstCustomer = [];
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

                  that.SaveCustomer();
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

    this.CreateCustomer.patchValue({

      AccountNo1: "",
      TextBoxColumn_BankName_1: "",
      BranchName2: "",
      IFSCCode3: "",


    });

    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstbankdetails.length + 1;


  }
  ShippingDetailsClear() {

    this.CreateCustomer.patchValue({

      ShippingName0: "",
      Address11: "",
      Address22: "",
      Address33: "",
      Country4Id: 0,
      State5Id: 0,
      City6Id: 0,

    });
    (<any>$('#drpshippingsCountry')).val(null).trigger('change');
    (<any>$('#drpshippingState')).val(null).trigger('change');
    (<any>$('#drpshippingCity')).val(null).trigger('change');
    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstShippingdetails.length + 1;


  }

  ContactDetailsClear() {
    debugger;
    this.CreateCustomer.patchValue({

      ContactName0: "",
      ContactNo1: "",
      Email2: "",
      Notes3: "",




    });

    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstContact.length + 1;


  }
  CustomerTransporterClear() {

    this.CreateCustomer.patchValue({
      transportername: "",
      area: "",



    });

    // $('#drpVehicleModel').val(null).trigger('change');
    this.SNO = this.lstTransport.length + 1;

  }
  //#endregion "Save city"

  //#region "Search"
  SearchClick() {

    this.GetSearchDetails();
    this.GetShippingDetails1();
    this.GetContactDetails1();
    this.GetTransportDetails1();
  }

  Search() {
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.store.dispatch(new TabStore.RemoveTab(ActivatedRoute));
    this.APICall.UpdatedSelectedPath('./Sales/Customer');
    this.router.navigate(['Sales/Customer']);
  }
  FilterType = 'All'
  GetSearchDetails() {

    if(this.lstbankdetails==undefined || this.lstbankdetails==null)
    {
      this.lstbankdetails=[];
    }

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
  GetTransportDetails1() {

    debugger;
    var SearchString = "";
    if (this.FilterType != 'All') {
      this.PrepareSerchStringByField3();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")

      for (var i = 0; i < this.lstTransport.length; i++) {

        if (

          (this.lstTransport[i].transportername).toString().includes(SearchString) ||
          (this.lstTransport[i].area).toString().includes(SearchString)




          //(this.lstbranchTimePropL[i].ExcessRsPerKms).toString().includes(SearchString)  
        ) {

          this.lstTransport[i].Show = 'true';
        } else {
          this.lstTransport[i].Show = 'false';

        }
      }

    }
    return SearchString;

  }
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
  PrepareSerchStringByField3() {

    var Name = this.getControlValue(this.f.transportername, "string");

    debugger;
    if (this.SerchType == 'Like') {


      if (Name != "") {
        for (var i = 0; i < this.lstTransport.length; i++) {

          if ((this.lstTransport[i].transportername).int().includes(Name)) {



            this.lstTransport[i].Show = 'true';
          } else {
            this.lstTransport[i].Show = 'false';


          }
        }
      }


    }
    else {

      if (Name != "") {
        for (var i = 0; i < this.lstTransport.length; i++) {

          if ((this.lstTransport[i].transportername) == (Name)) {

            this.lstTransport[i].Show = 'true';
          } else {
            this.lstTransport[i].Show = 'false';


          }
        }
      }


    }


  }

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

  DeleteCustomer() {


    $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

    $("#loaderParent").show();
    debugger;
    var xml1 = '<NewDataSet><Table1>'
      + '<CustomerId>' + this.getControlValue(this.f.CustomerId, 'string') + '</CustomerId>'

      + '<Customername>' + this.getControlValue(this.f.Customername, 'string') + '</Customername>'


      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<UserID>' + this.APICall.GetUserID() + '</UserID>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'

      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<BranchId>' + this.APICall.GetBranchID() + '</BranchId>'
      + '</Table1></NewDataSet>';

    this.APICall.DBCalling("DeleteCustomer", xml1, "", "", "").subscribe(
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

        that.DeleteCustomer();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }


    });

  }

  //#endregion "Delete city"

  //#region "Clear ViewData"

  ClearViewData(){

    this.ModifiedDate = "";
    this.CreateCustomer.patchValue({
      Customername: "",
      Customercode: "",
      country: 0,
      shortname: "",
      IsCashCustomer:"",
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
      customerrating: "",
      customerclass: "",
      address1: "",
      address2: "",
      Image: "",
      //Citycode:"",
      address3: "",
      state: "",
      coaid: 0,
      panno: "",
      companyname: "",
      Customeraccount: this.DefaultCustomerAccount

    });

    this.DispalyAccountName = "";
    //this.Displaytransportname="";
    this.DisplayCOAId = "0";
    this.BankDetailsClear();
    this.ShippingDetailsClear();
    this.ContactDetailsClear();
    this.CustomerTransporterClear();
    this.lstCustomer = [];
    this.lstbankdetails = null;
    this.lstShippingdetails = null;
    this.lstContact = null;
    this.lstTransport = null;
    this.f.LineChanges.setValue(0);
    this.f.LineChanges1.setValue(0);
    this.f.LineChanges2.setValue(0);
    this.f.LineChanges3.setValue(0);
    $("#Image").attr("src", "");
    (<any>$('#drpshippingsCountry')).val(null).trigger('change');
    (<any>$('#drpshippingState')).val(null).trigger('change');
    (<any>$('#drpshippingCity')).val(null).trigger('change');
    // (<any> $('#drptransport')).val(null).trigger('change');
    (<any>$('#drptransport')).val(null).trigger('change');

    this.StoreCustomer = new Customer;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreCustomer.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreCustomer));

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
    return this.CreateCustomer.controls;
  }


  //#region "View OnInit"
  DeviceType = "";
  StoreCustomer: Customer;
  UniqueserialNoChange(target) {
    debugger;
    this.StoreCustomer.iscompany = target.checked;
  }

  cashcustomerstatus:number=0
  isCashCustomer(target) {
    if(target.checked==true){
     this.f.IsCashCustomer.setValue(1)
     this.StoreCustomer.IsCashCustomer=1
    }else{
      this.f.IsCashCustomer.setValue(0);
      this.StoreCustomer.IsCashCustomer=0
    }
    //console.log(this.cashcustomerstatus)
  }
  DefaultCustomerAccount = 0;
  ngOnInit() {


    this.DeviceType = localStorage.getItem('DeviceType');
    this.StoreCustomer = new Customer;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");

    var Asresult = this.store.source['value']['Tab'].filter((x) => { return x.StoreId == 'AccountingSettings'; });
    if (Asresult.length > 0) {
      debugger;
      this.StoreAccountingSettings = (Asresult[0]);
      this.DefaultCustomerAccount = (this.StoreAccountingSettings.lstAccountGroupMapping.filter((x) => { return x.Name == 'Customer'; }))[0].AccountId;
    }
    this.StoreCustomer.Customeraccount = ((typeof (this.StoreCustomer.Customeraccount) == 'undefined' ? 0 : this.StoreCustomer.Customeraccount) == 0 ? this.DefaultCustomerAccount : this.StoreCustomer.Customeraccount);

    var result1 = this.store.source['value']['Tab'].filter((x) => { return (x.TabId == ActivatedRoute ); });

    if (result1.length > 0) {
     // this.StoreCustomer=(result1[0]);
      Object.assign(this.StoreCustomer ,result1[0])
      var customerid = this.StoreCustomer.CustomerId;
      this.submitted = Boolean(this.StoreCustomer.submitted);
      this.f.Pincode.setValue(this.StoreCustomer.pincode)
      this.CreateCustomer.patchValue(this.StoreCustomer);
      this.StoreCustomer.TabId = ActivatedRoute;
      this.viewcustomer(customerid);
    }
    else {
      var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute && x.ViewName =='AddNewCustomer'; });

      if (result.length > 0) {

        this.StoreCustomer = result[0];
        this.ModifiedDate = this.StoreCustomer.ModifiedDate;
        this.submitted = Boolean(this.StoreCustomer.submitted);
        this.CreateCustomer.patchValue(this.StoreCustomer);
        this.StoreCustomer.TabId = ActivatedRoute;
      }

      this.BindControlsData();
    }

  }




  lstDbResult: any = []
  private BindControlsData() {
    var that = this;
    debugger;

    this.DisplayCOAId = this.StoreCustomer.coaid;
    this.DispalyAccountName = this.StoreCustomer.AccountName;
    this.lstContact = this.StoreCustomer.lstContact;
    this.lstShippingdetails = this.StoreCustomer.lstShippingdetails;
    this.lstTransport = this.StoreCustomer.lstTransport;
    this.lstbankdetails = this.StoreCustomer.lstbankdetails;
    this.lstCustomer = this.StoreCustomer.lstCustomer;

    this.CreateCustomer.valueChanges.subscribe(value => {

      debugger;
      that.StoreCustomer.SequenceNumberId = value.SequenceNumberId;
      that.StoreCustomer.Customername = value.Customername;
      that.StoreCustomer.Customercode = value.Customercode;
      that.StoreCustomer.country = value.country;
      that.StoreCustomer.shortname = value.shortname;
      that.StoreCustomer.city = value.city;
     
      that.StoreCustomer.IsCashCustomer=value.IsCashCustomer; 
      that.StoreCustomer.iscompany = value.iscompany;
      that.StoreCustomer.gstno = value.gstno;
      that.StoreCustomer.Contactno = value.Contactno;
      that.StoreCustomer.email = value.email;
      that.StoreCustomer.website = value.website;
      that.StoreCustomer.creditlimit = value.creditlimit;
      that.StoreCustomer.creditdays = value.creditdays;
      that.StoreCustomer.maxbill = value.maxbill;
      that.StoreCustomer.creditrating = value.creditrating;
      that.StoreCustomer.customerrating = value.customerrating;
      that.StoreCustomer.customerclass = value.customerclass;
      that.StoreCustomer.address1 = value.address1;
      that.StoreCustomer.address2 = value.address2;
      that.StoreCustomer.countryname = value.countryname;
      that.StoreCustomer.statename = value.statename;

      that.StoreCustomer.cityname = value.cityname;
      //that.StoreCustomer.Citycode=value.Citycode;
      that.StoreCustomer.address3 = value.address3;
      that.StoreCustomer.state = value.state;
      that.StoreCustomer.coaid = value.coaid;
      that.StoreCustomer.AccountName = value.AccountName;
      that.StoreCustomer.Image = value.Image;

      that.StoreCustomer.ContactName0 = value.ContactName0;
      that.StoreCustomer.ContactNo1 = value.ContactNo1;
      that.StoreCustomer.Email2 = value.Email2;
      that.StoreCustomer.Notes3 = value.Notes3;
      that.StoreCustomer.companyname = value.companyname;
      that.StoreCustomer.ViewName = 'customer';

      //  that.DisplayCOAId=value.coaid;
      //  that.DispalyAccountName=value.AccountName;
      that.StoreCustomer.CustomerId = value.CustomerId;


      if (that.StoreCustomer.ModifiedDate == null) {
        that.StoreCustomer.ModifiedDate = new Date().toString();
      }
      that.StoreCustomer.ModifiedDate = (that.StoreCustomer.ModifiedDate == null ? '' : that.StoreCustomer.ModifiedDate.toString());
     
// var date:string='';
//     this.myDate = this.datePipe.transform(this.StoreCustomer.ModifiedDate, 'MM/dd/yyyy', 'en');
//     console.log(this.myDate)
//     that.StoreCustomer.ModifiedDate =(date);
      that.StoreCustomer.submitted = that.submitted;

      that.store.dispatch(new TabStore.AddTab(Object.assign([],that.StoreCustomer )));
    });
  }

  viewcustomer(customerid) {

    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = '';

    debugger;
    this.APICall.DBCalling("ViewCustomers", sstring, '', customerid, this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.DbResult = JSON.parse(res['Message']);

        var that = this;


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
            this.StoreCustomer.lstShippingdetails = this.lstShippingdetails;
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
            this.StoreCustomer.lstContact = this.lstContact;

          }

          // binding the array to resp2 variable transport  details

          var resp2 = this.DbResult.Table[0].CustomerTransporter;
          if (resp2 != null && typeof (resp2) != undefined) {

            var res4 = ((resp2).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstTransport = JSON.parse(res4);
            var i = 0;
            var data = $.map(this.lstTransport, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });

            this.lstTransport = data;
            this.StoreCustomer.lstTransport = this.lstTransport;
          }
         
           var resp3 = this.DbResult.Table[0].BankDetails;
           if (resp3 != null && typeof (resp3) != undefined) {

            var res5 = ((resp3).replace(/\n/g, "")).replace(/'/g, "\"");


            this.lstbankdetails = JSON.parse(res5);
            var i = 0;
            var data = $.map(this.lstbankdetails, function (obj) {
              i = i + 1;
              obj.SNO = i;

              return obj;
            });

            this.lstbankdetails = data;
            this.StoreCustomer.lstbankdetails = this.lstbankdetails;
          }

          this.BindControlsData();
        }
        this.StoreCustomer=new Customer;
        $("#loaderParent").hide();

      });

  }
  //#endregion "View OnInit"

  //#region "After View Init"
  ngAfterViewInit() {
    debugger;
    (<any>$("#drpshippingState")).select2();
    (<any>$("#drpshippingCity")).select2();
    (<any>$("#drptransport")).select2();
    (<any>$("#drpBranchCountry")).select2();
    (<any>$("#drpBranchState")).select2();
    (<any>$("#drpBranchCity")).select2();

    this.LoadShippingCountries();
    this.LoadTransport();
    this.LoadBranchCountries();
    this.LoadBranchStates();
    this.LoadBranchCities();


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

      && this.getControlValue(this.f.Country4Id, 'string') != ""

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
  ValidateCustomerTransporter(): boolean {
    debugger;
    var validate = true;
    this.showError = false;


    if (
      this.getControlValue(this.f.TransporterId, 'int') != "0"
      && this.getControlValue(this.f.area, 'string') != ""


    ) {
      debugger;
      for (var i = 0; i < this.lstTransport.length; i++) {
        if (this.EditRecNO != this.lstTransport[i].SNO &&
          this.lstTransport[i].TransporterId == this.getControlValue(this.f.TransporterId, 'string')) {
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
  EditBankDetailsClick(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateCustomer.patchValue({

      AccountNo1: selectedRecord.AccountNo1,
      TextBoxColumn_BankName_1: selectedRecord.TextBoxColumn_BankName_1,
      BranchName2: selectedRecord.BranchName2,
      IFSCCode3: selectedRecord.IFSCCode3,
      CustomerId: selectedRecord.CustomerId,
      SNO: selectedRecord.SNO
    });
  }
  EditShipping(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateCustomer.patchValue({

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
      CustomerId: selectedRecord.CustomerId,
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
    this.CreateCustomer.patchValue({

      ContactName0: selectedRecord.ContactName0,
      ContactNo1: selectedRecord.ContactNo1,
      Email2: selectedRecord.Email2,
      Notes3: selectedRecord.Notes3,
      CustomerId: selectedRecord.CustomerId,
      SNO: selectedRecord.SNO
    });
  }
  EditTransport(selectedRecord, SNO) {

    debugger;
    this.EditRecNO = SNO;
    this.SNO = SNO;
    this.CreateCustomer.patchValue({

      transportername: selectedRecord.transportername,
      TransporterId: selectedRecord.TransporterId,
      area: selectedRecord.area,

      SNO: selectedRecord.SNO
    });
    var TransportSelection = new Option(this.f.transportername.value, this.f.TransporterId.value.toString(), true, true);

    (<any>$('#drptransport')).append(TransportSelection).trigger('change');
    //   var TransportSelection = new Option(this.getControlValue(this.f.transportername,'string'),
    //    this.getControlValue(this.f.TransporterId,'int'), true, true);
    // (<any> $('#drptransport')).append(TransportSelection).trigger('change');


    // var TransportSelection = new Option(this.f.transportername.value,this.f.TransporterId.value.toString(), true, true);

    // (<any> $('#drptransport')).append(TransportSelection).trigger('change');
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
          this.lstbankdetails[i].CustomerId = this.getControlValue(this.f.CustomerId, 'int')

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
            , CustomerId: this.getControlValue(this.f.CustomerId, 'int')
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
          this.lstShippingdetails[i].CustomerId = this.getControlValue(this.f.CustomerId, 'int');

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
            , CustomerId: this.getControlValue(this.f.CustomerId, 'int')
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
          this.lstContact[i].CustomerId = this.getControlValue(this.f.CustomerId, 'int');
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
            , CustomerId: this.getControlValue(this.f.CustomerId, 'int')
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
  AddTransport(type) {
    debugger;
    if (this.ValidateCustomerTransporter()) {
      //let WeekName:string= this.from
      debugger;

      //let WeekName:string= this.from

      for (var i = 0; i < this.lstTransport.length; i++) {
        this.lstTransport[i].Show = 'true';


        if (this.lstTransport[i].SNO == this.EditRecNO) {

          //  this.lstbranchTimePropL[i].ID=this.getControlValue(this.f.BranchTimingsID,'int');
          this.lstTransport[i].CustomerId = this.getControlValue(this.f.CustomerId, 'int');
          this.lstTransport[i].TransporterId = this.getControlValue(this.f.TransporterId, 'int');
          this.lstTransport[i].transportername = this.getControlValue(this.f.transportername, 'string');
          this.lstTransport[i].area = this.getControlValue(this.f.area, 'string');


        }
      }
      if (this.EditRecNO == -1) {
        var res4 =
          ({
            SNO: this.SNO
            , CustomerId: this.getControlValue(this.f.CustomerId, 'int')
            , TransporterId: this.getControlValue(this.f.TransporterId, 'int')
            , transportername: this.getControlValue(this.f.transportername, 'string')
            , area: this.getControlValue(this.f.area, 'string')

            , Show: 'true'
          });

        if (this.lstTransport.length == 0) {
          this.lstTransport = [res4];

        }
        else {
          this.lstTransport.push(res4);

        }
      }
      this.EditRecNO = -1;

      this.CustomerTransporterClear();

      if (type == 'Close') {
        $("#btnCloseTransportItems").trigger('click');
      }

      this.SNO = this.lstTransport.length + 1;
    }
    this.f.LineChanges3.setValue(0);
  }

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
  RemoveTransport() {
    debugger;

    var sliceIndex = -1;
    for (var i = 0; i < this.lstTransport.length; i++) {
      this.lstTransport[i].Show = 'true';

      if (this.lstTransport[i].SNO == this.EditRecNO) {
        sliceIndex = i;
      }
    }
    if (sliceIndex > -1) {
      this.lstTransport.splice(sliceIndex, 1);

      for (var i = 0; i < this.lstTransport.length; i++) {
        this.lstTransport[i].SNO = i + 1;
      }
    }

    this.EditRecNO = -1;
    this.SNO = this.lstTransport.length + 1;
    this.CustomerTransporterClear();

  }


  selectedFile: ImageSnippet;

  //#region "ImageUpload"

  ImagefileChange($event, ControlName) {
    debugger;
    if (this.getControlValue(this.f.Customername, 'string') != '') {

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
        var Imagename = "Customer" + this.f.Customername.value + ControlName + currDatetime + '.' + extention;
        formData.append('image', this.selectedFile.file);
        formData.append('imageName', Imagename);
        debugger;


        if (ControlName == 'Image') {
          this.CreateCustomer.patchValue({
            Image: Imagename

          });

        }



        this.CreateCustomer.controls.Image.markAsDirty();
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

}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}