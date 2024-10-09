import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';

import { APICallingService } from '../apicalling.service';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import * as $ from 'jquery';
import { Store } from '@ngrx/store';
import { StoreAccountingSettings } from 'src/app/store/StoreAccountingSettings';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import '../../assets/vendors/select2/js/select2.min.js';
import '../../assets/vendors/select2/css/select2.min.css';
import { AppSettings } from 'src/assets/Appsettings/AppSettings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Login:FormGroup;
  ErrorMsg="";
  submitted:boolean=false;
  //Xml5:string="DatabaseDetails";
  
  constructor(private formBuilder: FormBuilder,private APICall:APICallingService,private router: Router,private AuthenticationService:AuthenticationServiceService,private store: Store<any>) { 
    


    this.Login=formBuilder.group(

      {
        UserName:new FormControl('',Validators.required),
        Password:new FormControl('',Validators.required),
        ReferenceDbId:new FormControl('',Validators.required),
        DatabaseName:new FormControl(''),
      });
  }
 
  ngOnInit() {
    debugger;
    sessionStorage.setItem("Database","DatabaseDetails");
    //var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   // var result = this.store.source['value']['Tab'].filter((x) => { return x.TabId == ActivatedRoute; });
this.LoadDatabases();
  
  }

  DatabaseID:number=0;
  DatabaseName:string="";



LoadDatabases() {
  try{
  var that = this;
  debugger;
  
  (<any>$('#drpdatabases')).select2({
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
          return JSON.stringify({ "Operation": 'CompanyReferenceDb', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": '1' })

        }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {


        debugger;

        var ResultData = (JSON.parse(response['Message'])).Table;

        var data = $.map(ResultData, function (obj) {
debugger;
            obj.id = obj.ID;
            obj.text = obj.DatabaseName;
           obj.apicalling=obj.Apiurl
         obj.img=obj.ImageUrl


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
  var DbSelection = new Option(this.f.DatabaseName.value, this.f.ReferenceDbId.value.toString(), true, true);

  (<any>$('#drpdatabases')).append(DbSelection).trigger('change');

     $('#drpdatabases').on('select2:select', function (e) {

    debugger;


    if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger; 
      


      sessionStorage.removeItem('UploadImageUrl'); 
      sessionStorage.removeItem('ImagePath');
      sessionStorage.removeItem('DBPath');
      that.f.ReferenceDbId.setValue((<any>e).params.data.id);
      that.f.DatabaseName.setValue((<any>e).params.data.text);
      that.APICall.storedbcaling=((<any>e).params.data.apicalling) + 'ValuePass'
      that.APICall.DBCallingURL=((<any>e).params.data.apicalling) + 'ValuePass'
     that.APICall.uploadurl=((<any>e).params.data.apicalling) + 'FileUpload'
     that.APICall.imagepath=((<any>e).params.data.img) + 'documents/'
    

    }
  });


  $('#drpdatabases').on("select2:unselecting", function (e) {
    debugger;

    that.f.ReferenceDbId.setValue(0);
    that.f.DatabaseName.setValue("");
    that.APICall.storedbcaling='';
    that.APICall.uploadurl='';
    that.APICall.imagepath='';
  });
}
catch(e){

}
}
  CompanyID:number=0;
  lstDbResult:any=[];
  Loadcompany()
  {
    debugger;
    this.APICall.DBCalling("ViewComnpanyDetails",this.DatabaseName,"","","").subscribe(
      (res:Response) => {
        debugger;
        this.lstDbResult=JSON.parse(res['Message']);
      
        
       
        if(this.lstDbResult.Table.length>0)
        {
          this.CompanyID=this.lstDbResult.Table[0].CompanyId;
          sessionStorage.setItem("CompanyID",this.lstDbResult.Table[0].CompanyId);
          sessionStorage.setItem("Database",this.DatabaseName);
          this.BranchID = 0;
          this.BranchName = "";
        (<any> $('#drpBranch')).val(null).trigger('change');
        this.LoadBranch();
        }

        $("#loaderParent").hide();
      });
  }

  BranchID:number=0;
  BranchName:string="";
  LoadBranch() {
    debugger;
    var that = this;
    (<any>$("#drpBranch")).select2({
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
     debugger;    
          }
        ,
        contentType: 'application/json; charset=utf-8',
        processResults: function (response) {
          var ResultData = (JSON.parse(response['Message'])).Table;

          var data = $.map(ResultData, function (obj) {

            obj.id = obj.BranchId;
            obj.text = obj.branchname;


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
    $('#drpBranch').on('select2:select', function (e) {
      
      if (typeof ((<any>e).params.data.BranchId) != 'undefined') {
      
        debugger;
   
        that.BranchID = (<any>e).params.data.BranchId;
        that.BranchName = (<any>e).params.data.branchname;
        
       
      
      }


    });


    $("#drpBranch").on("select2:unselecting", function (e) {

      //that.ItemValueChange.emit((<any>e).params.data);
      //  that.ItemId =0;

      that.BranchID = 0;
      that.BranchName = "";
     
    });

  }
  DbResult:any  = [];
  StoreAccountingSettings: StoreAccountingSettings;
  
  LoginClick()
  {
    debugger;
   this.submitted=true;
   if(  this.f.ReferenceDbId.value > 0 &&  this.f.UserName.value!='' && this.f.Password.value!=''){
    //
    this.APICall.DBCalling("GetMenuByRole","0",this.Login.get("UserName").value,this.Login.get("Password").value,"").subscribe(
      (res) => {
        debugger;
        
        this.DbResult=JSON.parse(res['Message']);
        debugger;
       // var ress=JSON.parse(this.DbResult);
       
       try{
        if( this.DbResult.Table.length>=0 )
        {          

          this.AuthenticationService.login(this.DbResult.Table[0].UserID);
        //  sessionStorage.setItem("UserID",this.DbResult.Table[0][0].UserID);
          localStorage.setItem("UserName",this.DbResult.Table[0].UserName);
          localStorage.setItem("Email",this.DbResult.Table[0].Email);
          sessionStorage.setItem("CompanyID",this.DbResult.Table[0].CompanyID);
 
         
         sessionStorage.setItem("ImagePath",this.APICall.imagepath);
         sessionStorage.setItem("UploadImageUrl",this.APICall.uploadurl);
          sessionStorage.setItem("DBPath",this.APICall.storedbcaling);
          
        debugger;
          sessionStorage.setItem("BranchID",this.DbResult.Table[0].BranchID);
         // sessionStorage.setItem("CurrencyId",this.DbResult.Table[0].CurrencyId);

          
          localStorage.setItem('Menu', JSON.stringify(this.DbResult.Table));
          
         

          if(this.DbResult.Table[0].CompanyInfo!=null && typeof(this.DbResult.Table[0].CompanyInfo)!=undefined)
          {
          var resC=((this.DbResult.Table[0].CompanyInfo).replace(/\n/g, "")).replace(/'/g,"\"");
          
        var  lstCompanyInfo=JSON.parse(resC);
debugger;
 //  sessionStorage.setItem("BranchID",lstCompanyInfo[0].BranchID);
          sessionStorage.setItem("CurrencyId",lstCompanyInfo[0].CurrencyId);
          sessionStorage.setItem("CompanyStateId",lstCompanyInfo[0].SateId);

          debugger;

          var Address=lstCompanyInfo[0].address1!=''?lstCompanyInfo[0].address1:'';
          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].address2!=''?lstCompanyInfo[0].address2:'')):lstCompanyInfo[0].address2!=''?lstCompanyInfo[0].address2:'');

          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].address3!=''?lstCompanyInfo[0].address3:'')):lstCompanyInfo[0].address3!=''?lstCompanyInfo[0].address3:'');

         // Address=(Address!=''?Address+(','+(lstCompanyInfo[0].CityName!=''?lstCompanyInfo[0].CityName:'')):lstCompanyInfo[0].CityName!=''?lstCompanyInfo[0].CityName:'');

          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].StateName!=''?lstCompanyInfo[0].StateName:'')):lstCompanyInfo[0].StateName!=''?lstCompanyInfo[0].StateName:'');

          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].CountryName!=''?lstCompanyInfo[0].CountryName:'')):lstCompanyInfo[0].CountryName!=''?lstCompanyInfo[0].CountryName:'');

          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].zipcode!=''?lstCompanyInfo[0].zipcode:'')):lstCompanyInfo[0].zipcode!=''?lstCompanyInfo[0].zipcode:'');

          Address=(Address!=''?Address+(','+(lstCompanyInfo[0].ContactNo!=''?lstCompanyInfo[0].ContactNo:'')):lstCompanyInfo[0].ContactNo!=''?lstCompanyInfo[0].ContactNo:'');

          sessionStorage.setItem("CompanyName",lstCompanyInfo[0].companyname);
          debugger;
          sessionStorage.setItem("CompanyAddress",Address);
          //sessionStorage.setItem("DBPath",lstCompanyInfo[0].CurrencyId);
          debugger;
          sessionStorage.setItem("GSTNo",lstCompanyInfo[0].gstinno)
          sessionStorage.setItem("StateCode",lstCompanyInfo[0].StateCode);
          sessionStorage.setItem("StateName",lstCompanyInfo[0].StateName);
          sessionStorage.setItem("CompanyEmailId",lstCompanyInfo[0].EmailId);
          sessionStorage.setItem("CompanyContactNo",lstCompanyInfo[0].ContactNo);
          sessionStorage.setItem("AllowNegativeStock",lstCompanyInfo[0].AllowNegativeStock);
          

          sessionStorage.setItem("CompanyBank",lstCompanyInfo[0].DefaultBank);
          sessionStorage.setItem("CompanyBankBranch",lstCompanyInfo[0].BankBranch);
          sessionStorage.setItem("CompanyBankIFSCCode",lstCompanyInfo[0].IFSCCode);
          sessionStorage.setItem("CompanyBankAccountNo",lstCompanyInfo[0].BankAccountNo);
          
          }
          debugger;
          this.StoreAccountingSettings=new StoreAccountingSettings;

          if(this.DbResult.Table[0].AccountGroupMapping!=null && typeof(this.DbResult.Table[0].AccountGroupMapping)!=undefined)
          {

            var resC=((this.DbResult.Table[0].AccountGroupMapping).replace(/\n/g, "")).replace(/'/g,"\"");
          
          
            this.StoreAccountingSettings.lstAccountGroupMapping=JSON.parse(resC);

          }

          if(this.DbResult.Table[0].DefaultAccount!=null && typeof(this.DbResult.Table[0].DefaultAccount)!=undefined)
          {

            var resC=((this.DbResult.Table[0].DefaultAccount).replace(/\n/g, "")).replace(/'/g,"\"");
            this.StoreAccountingSettings.lstDefaultAccount=JSON.parse(resC);

          }

          this.StoreAccountingSettings.DefaultCashAccountId=this.DbResult.Table[0].DefaultCashAccountId;
          this.StoreAccountingSettings.DefaultCashAccountName=this.DbResult.Table[0].DefaultCashAccountName;
          this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingSettings));
         // sessionStorage.setItem("UserId",this.DbResult.Table[0][0].LoginUserID);
         window.location.href = "./#/Common/Dashboard";
       //  window.location.reload();
        }else{
          this.ErrorMsg="Invalid UserName Or Password";
        }
       
      }
        catch(e)
        {
          this.ErrorMsg="Invalid UserName Or Password";
          debugger;
        }
      });
  }else if(this.f.ReferenceDbId.invalid || this.f.UserName.invalid || this.f.Password.invalid){
      this.submitted=true
         }else{

         }
          
  
  }
  get f() {
    return this.Login.controls;

  }
  Submit=false;
  CreateCompany()
  {
    debugger;
    // this.Submit=true;
    // if(this.f.UserName.value !="" && this.f.Password.value !="")
    // {
      this.router.navigate(['/CompanyCreation']);
  //  }
  }
}
