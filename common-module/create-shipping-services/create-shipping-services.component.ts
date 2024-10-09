import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import '../../../assets/vendors/select2/js/select2.min.js';
import '../../../assets/vendors/select2/js/select2.min.js';
import "../../../assets/vendors/select2/css/select2.min.css";
import '../../../assets/vendors/datepicker/daterangepicker.js';
import "../../../assets/vendors/datepicker/daterangepicker.css";
import * as $ from 'jquery';
import { ShippingService } from 'src/app/store/ShippingService';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create-shipping-services',
  templateUrl: './create-shipping-services.component.html',
  styleUrls: ['./create-shipping-services.component.css']
})
export class CreateShippingServicesComponent implements OnInit {

  CreateShippingService:FormGroup
  
  constructor(private router:Router,private APICall: APICallingService,private fb:FormBuilder,private store: Store<any>) { 
    this.CreateShippingService=this.fb.group({
    
      Id: new FormControl(''),
      ServiceName: new FormControl('',Validators.required),
      Address1: new FormControl('',Validators.required),
      Address2: new FormControl(''),
      Address3: new FormControl(''),
      CountryId: new FormControl('',Validators.required),
      StateId: new FormControl('',Validators.required),
      CityId: new FormControl('',Validators.required),
      PinCode: new FormControl('',Validators.required),
      ContactNo1: new FormControl('',Validators.required),
     
      CountryName:new FormControl(''),
      CityName:new FormControl(''),
      StateName: new FormControl(''),
      Email:new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      Website:new FormControl(''),
      Description:new FormControl(''),
      ContactNo2:new FormControl('',Validators.required)
  
    })

  }
  CountryName="";
  StateName="";
  CityName="";
  DeviceType = "";
  ngOnInit() {
    debugger;
    this.LoadCountries();
   
    this.StoreShippingService = new ShippingService;

    var ActivatedRoute = localStorage.getItem("ActivatedRoute");


    var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });


    if (result.length > 0) {

      debugger;
      this.StoreShippingService = result[0]
      this.ModifiedDate = this.StoreShippingService.ModifiedDate.toString();
      
      this.submitted = Boolean(this.StoreShippingService.submitted);
         }
    debugger;

    if (this.StoreShippingService.ModifiedDate.toString().includes('India')) {

      var date = new Date(this.StoreShippingService.ModifiedDate);


      this.StoreShippingService.ModifiedDate = formatDate(new Date(date), 'yyyy-MM-ddTHH:mm:ss.SSS', 'en');
    }

    var that = this;

  
    this.DeviceType = localStorage.getItem('DeviceType')
    debugger;
    var ViewData = this.APICall.GetViewData();


    if (ViewData != undefined && typeof (ViewData) != undefined && typeof (ViewData.ViewName) != undefined) {
      // JSON.parse(ViewData).forEach(item => {

      debugger;
      if (ViewData.ViewName == 'ShippingService') {
        this.CreateShippingService.patchValue({

          Id:ViewData.Id,
          Address1: ViewData.Address1,
          Address2: ViewData.Address2,
          Address3: ViewData.Address3,
          CountryId: ViewData.CountryId,
          CountryName: ViewData.CountryName,
          StateId:ViewData.StateId,
          StateName:ViewData.StateName,
          CityId: ViewData.CityId,
          CityName: ViewData.CityName,
          PinCode:ViewData.PinCode,
          ContactNo1:ViewData.ContactNo1,
          ContactNo2:ViewData.ContactNo2,
          Email:ViewData.Email,
          Website:ViewData.Website,
          Description:ViewData.Description,
          ServiceName:ViewData.ServiceName,


        });

        this.ModifiedDate = ViewData.ModifiedDate;
      }
      this.ModifiedDate = ViewData.ModifiedDate;

    }

    this.CreateShippingService.valueChanges.subscribe(value => {

      debugger;
      this.StoreShippingService.Id = value.Id;
      this.StoreShippingService.Address1 = value.Address1;
      this.StoreShippingService.Address2 = value.Address2;
      this.StoreShippingService.Address3 = value.Address3;
      this.StoreShippingService.CountryId = value.CountryId;
      this.StoreShippingService.CountryName = value.CountryName;
      this.StoreShippingService.StateId = value.StateId;
      this.StoreShippingService.StateName = value.StateName;
      this.StoreShippingService.CityId = value.CityId;
      this.StoreShippingService.CityName = value.CityName;
      this.StoreShippingService.PinCode=value.PinCode;
      this.StoreShippingService.ContactNo1=value.ContactNo1;
      this.StoreShippingService.ContactNo2=value.ContactNo2;
      this.StoreShippingService.Email=value.Email;

      this.StoreShippingService.Website = value.Website;
      this.StoreShippingService.ViewName = ' ShippingService';
      this.StoreShippingService.ModifiedDate = (this.ModifiedDate == null ? '' : this.ModifiedDate.toString());
      this.StoreShippingService.submitted = this.submitted;
      this.StoreShippingService.TabId = ActivatedRoute;
      this.store.dispatch(new TabStore.AddTab(this.StoreShippingService));
    });
  
  }

  

  LoadCountries() {
    try{
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
      
    });
    debugger;
    var CountrySelection = new Option(this.f.CountryName.value, this.f.CountryId.value.toString(), true, true);

    (<any>$('#drpshippingsCountry')).append(CountrySelection).trigger('change');


       $('#drpshippingsCountry').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

       

        that.f.CountryId.setValue((<any>e).params.data.id);
        that.f.CountryName.setValue((<any>e).params.data.text);
        that.LoadStates();

      }
    });


    $('#drpshippingsCountry').on("select2:unselecting", function (e) {
      debugger;

      that.f.CountryId.setValue(0);
      that.f.CountryName.setValue("");

    });
  }
catch(e){

}
  }
 
  LoadStates(){
    try{
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
              return JSON.stringify({ "Operation": 'ViewStateByCountry', "Params": sstring, "Xml2": 'All', "Xml3": that.f.CountryId.value, "Xml4": that.APICall.GetCompanyID() })
  
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
  
  
      var StateSelection = new Option(this.f.StateName.value, this.f.StateId.value.toString(), true, true);
  
      (<any>$('#drpshippingState')).append(StateSelection).trigger('change');
  
  
     
      $('#drpshippingState').on('select2:select', function (e) {
  
        debugger;
  
  
        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;
  
          that.f.StateId.setValue((<any>e).params.data.id);
          that.f.StateName.setValue((<any>e).params.data.text);
          that.LoadCity();
        }
  
  
      });
  
  
      $("#drpshippingState").on("select2:unselecting", function (e) {
        debugger;
  
        that.f.StateId.setValue(0);
        that.f.StateName.setValue("");
  
      });
  
    
    }catch(e){

    }

  }
    
  LoadCity(){
    try{
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
              return JSON.stringify({ "Operation": 'ViewCityByState', "Params": sstring, "Xml2": 'All', "Xml3": that.f.StateId.value, "Xml4": that.APICall.GetCompanyID() })
  
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
      var CitySelection = new Option(this.f.CityName.value, this.f.CityId.value.toString(), true, true);
  
      (<any>$('#drpshippingCity')).append(CitySelection).trigger('change');
  
  
      $('#drpshippingCity').on('select2:select', function (e) {
  
        debugger;
  
  
        if (typeof ((<any>e).params.data.id) != 'undefined') {
          debugger;
          that.f.CityId.setValue((<any>e).params.data.id);
          that.f.CityName.setValue((<any>e).params.data.text);
  
        }
  
  
      });
  
  
      $("#drpshippingCity").on("select2:unselecting", function (e) {
        debugger;
  
  
        that.f.CityId.setValue(0);
        that.f.CityName.setValue("");
  
      });
    }catch(e){

    }
  }

  getControlValue(Control, Type): string {
try{

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }catch(e){

  }
  }
  GetTaxtypesDetById($event) {
    debugger;
    this.f.Id.setValue = $event;
  }
  
  submitted = false;
  ct2valid=true;
  OnSave() {
    debugger;
    this.submitted = true;
    var valid=true;
     this.ct2valid=true;
var ct1=(this.getControlValue(this.f.ContactNo1, 'string'));
var ct2=(this.getControlValue(this.f.ContactNo2, 'string'));
 
    if((this.getControlValue(this.f.ServiceName, 'string') =="")
  || (this.getControlValue(this.f.Address1, 'string') =="")
    || (this.getControlValue(this.f.CountryId, 'string') =="") 
    || (this.getControlValue(this.f.StateId, 'string') =="")
    || (this.getControlValue(this.f.CityId, 'string') =="")
    || (this.getControlValue(this.f.PinCode, 'string') =="")
    || (this.getControlValue(this.f.ContactNo1, 'string') =="")

    || (ct1.length!==10   ) )
    {
      valid=false;
    }
  
   if( this.f.ContactNo2.touched && this.f.ContactNo2.status=='INVALID' ) {
     valid=false;
     
   }
   if( this.f.Email.touched && this.f.Email.status=='INVALID' ) {
    valid=false;
    
  }
  
    
    

    
    
    if(valid)
    {
      this.SaveShippingService()
    }
  }
  
  
  ModifiedBy="";
  ModifiedDate="";
  DbResult: any = [];
  StoreShippingService: ShippingService
  SaveShippingService(){
    
      debugger;
      try{
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
      $("#loaderParent").show();
  
      var xml1 = '<NewDataSet><Table1>'
      // this.getControlValue(this.f.Id, 'int')
  
        + '<Id>' +this.StoreShippingService.Id + '</Id>'
        + '<Address1>' + this.getControlValue(this.f.Address1, 'string') + '</Address1>'
        + '<Address2>' + this.getControlValue(this.f.Address2, 'string') + '</Address2>'
        + '<Address3>' +this.getControlValue(this.f.Address3, 'string') + '</Address3>'
        + '<CountryId>' + this.getControlValue(this.f.CountryId, 'int') + '</CountryId>'
        + '<CountryName>' +this.getControlValue(this.f.CountryName, 'string') + '</CountryName>'
        + '<StateId>' + this.getControlValue(this.f.StateId, 'int') + '</StateId>'
        + '<StateName>' + this.getControlValue(this.f.StateName, 'string') + '</StateName>'
        + '<CityId>' + this.getControlValue(this.f.CityId, 'int') + '</CityId>'
        + '<CityName>' + this.getControlValue(this.f.CityName, 'string') + '</CityName>'
        + '<PinCode>' + this.getControlValue(this.f.PinCode, 'string') + '</PinCode>'
        + '<ContactNo1>' + this.getControlValue(this.f.ContactNo1, 'string') + '</ContactNo1>'
        + '<ContactNo2>' + this.getControlValue(this.f.ContactNo2, 'string') + '</ContactNo2>'
        + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
        + '<Website>' + this.getControlValue(this.f.Website, 'string') + '</Website>'
        + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
        + '<ModifiedBy>' + this.ModifiedBy + '</ModifiedBy>'
        + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
        + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
        + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
        + '<ServiceName>' + this.getControlValue(this.f.ServiceName, 'string') + '</ServiceName>'
  
        + '</Table1></NewDataSet>';
  
      debugger;
      this.APICall.DBCalling("SaveShippingService", xml1, "", "", "").subscribe(
        (res: Response) => {
          debugger;
  
          $("#loaderParent").hide();
  
          this.DbResult = JSON.parse(res['Message']);
          debugger;
          if (this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBresult > 0) {
            if (this.f.Id.value > 0) {
              this.ModifiedDate = this.DbResult.Table[0].ModifiedDate;
              (window as any).swal({
                icon: 'success',
                title: 'Information!',
                text: 'Record Updated successfully.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-success'
              });
            } else {
              
  
  
              this.f.Id= this.DbResult.Table[0].Id;
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
  
  
  
          } else {
  
  
  
            if (this.DbResult.Table[0].DBresult == -3) {
              (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'Groupname Already Exists.!',
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
                  title: "Treansaction modified by " + this.DbResult.Table[0].ModifiedBy + "!",
                  text: "Do you wants to overwrite?",
  
                  buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                  ],
                  dangerMode: true,
                }).then(function (isConfirm) {
  
                  if (isConfirm) {
  
                    that.ModifiedDate = that.DbResult.Table[0].ModifiedDate;
  
                    that.SaveShippingService();
                  } else {
                    (window as any).swal("Cancelled", "this file is not updated :)", "error");
                  }
                  debugger;
  
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
  catch(e){

  }    
       
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

        that.DeleteShippingService();
      } else {
        (window as any).swal("Cancelled", "this record is safe:)", "error");
      }


    });

  } 

  DeleteShippingService()
  {
    
try{
      debugger;
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");
  
      $("#loaderParent").show();
  
      var xml1 = '<NewDataSet><Table1>'
  
      + '<Id>' + this.StoreShippingService.Id+ '</Id>'
      + '<Address1>' + this.getControlValue(this.f.Address1, 'string') + '</Address1>'
      + '<Address2>' + this.getControlValue(this.f.Address2, 'string') + '</Address2>'
      + '<Address3>' +this.getControlValue(this.f.Address3, 'string') + '</Address3>'
      + '<CountryId>' + this.getControlValue(this.f.CountryId, 'int') + '</CountryId>'
      + '<CountryName>' +this.getControlValue(this.f.CountryName, 'string') + '</CountryName>'
      + '<StateId>' + this.getControlValue(this.f.StateId, 'int') + '</StateId>'
      + '<StateName>' + this.getControlValue(this.f.StateName, 'string') + '</StateName>'
      + '<CityId>' + this.getControlValue(this.f.CityId, 'int') + '</CityId>'
      + '<CityName>' + this.getControlValue(this.f.CityName, 'string') + '</CityName>'
      + '<PinCode>' + this.getControlValue(this.f.PinCode, 'string') + '</PinCode>'
      + '<ContactNo1>' + this.getControlValue(this.f.ContactNo1, 'string') + '</ContactNo1>'
      + '<ContactNo2>' + this.getControlValue(this.f.ContactNo2, 'string') + '</ContactNo2>'
      + '<Email>' + this.getControlValue(this.f.Email, 'string') + '</Email>'
      + '<Website>' + this.getControlValue(this.f.Website, 'string') + '</Website>'
      + '<Description>' + this.getControlValue(this.f.Description, 'string') + '</Description>'
      + '<ModifiedBy>' + this.ModifiedBy + '</ModifiedBy>'
      + '<ModifiedDate>' + this.ModifiedDate + '</ModifiedDate>'
      + '<UserName>' + this.APICall.GetUserName() + '</UserName>'
      + '<CompanyId>' + this.APICall.GetCompanyID() + '</CompanyId>'
      + '<ServiceName>' + this.getControlValue(this.f.ServiceName, 'string') + '</ServiceName>'

        + '</Table1></NewDataSet>';
  
      this.APICall.DBCalling("DeleteShippingService", xml1, "", "", "").subscribe(
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
      
      }catch(e){

      }
      this.router.navigate(['Common/ShippingServices']);

  }

  ClearViewData() {
    debugger;

    this.ModifiedDate = "";
    this.CreateShippingService.patchValue({
      Id: 0,
      Address1: '',
      Address2: '',
      Address3: '',
      CountryId: '',
      StateId: '',
      CityId:'',
      PinCode:'',
      ContactNo1:'',
      ContactNo2:'',
      Email:'',
      Website:'',
      ServiceName:'',
      Description:''

    });
    this.LoadCountries();
    this.LoadStates();
    this.LoadCity();
    
    
   
    debugger;
    this.StoreShippingService = new ShippingService;
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.StoreShippingService.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.StoreShippingService));
  }

  ngAfterViewInit() {

    (<any>$("#drpshippingsCountry")).select2();
    (<any>$("#drpshippingState")).select2();
    (<any>$("#drpshippingCity")).select2();


    this.LoadStates();
    this.LoadCountries();
    this.LoadCity();



  }

get f(){
  return this.CreateShippingService.controls;
}
Search(){
this.router.navigate(['Common/ShippingServices']);
}
}
