import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { APICallingService } from 'src/app/apicalling.service';
import    '../../../assets/vendors/select2/js/select2.min.js';
import    "../../../assets/vendors/select2/css/select2.min.css";
import * as $ from 'jquery';
@Component({
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SavePartyComponent),
      multi: true
    }
  ],
  selector: 'SaveParty',
  templateUrl: './save-party.component.html',
  styleUrls: ['./save-party.component.css']
})
export class SavePartyComponent implements OnInit {

  CreateParty:FormGroup;

  constructor(private formBuilder: FormBuilder,private APICall:APICallingService) { 
    this.CreateParty=formBuilder.group(
      {
        country:new FormControl(0),
        countryname:new FormControl(''),
        state:new FormControl(0),
        statename:new FormControl(''),
        city:new FormControl(0),
        cityname:new FormControl(''),

      })
  }



public _PartyType='';
  @Input()
set  PartyType(val)
{

this._PartyType=val;
}
get f() { 
  return this.CreateParty.controls;
}
@Output()
 public PartySaved= new EventEmitter();

 
 GstSearch()
 {
debugger;
  this.GetPartDetFromGSTNO($("#GstNo").val());
 }


 ngAfterViewInit()
 {
  
 }
 LoadBranchCountries()
 {
   var that=this;
   debugger;
 
   
 
 
   (<any> $('#drpBranchCountry')).select2({
    allowClear: true,
    placeholder:"Select",
      ajax: { 
       url:this.APICall.DBCallingURL,
       type: "POST",
       dataType: 'json',
       delay: 250,
       data: 
       function (params) {
    
    var sstring="";
    if( params.term!=undefined)
    {
      sstring=params.term;
    }
    debugger;
    return JSON.stringify( {"Operation": 'ViewCountries',  "Params":sstring,"Xml2":'All' ,"Xml3":"","Xml4" :that.APICall.GetCompanyID() })
        
       }
       ,
       contentType: 'application/json; charset=utf-8',
       processResults: function (response) {
        
    
         debugger;
    
    var ResultData=(JSON.parse(response['Message'])).Table;
    
          var  data = $.map(ResultData, function (obj) {
          
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
     var BranchCountrySelection = new Option(this.f.countryname.value,this.f.country.value.toString(), true, true);
 
     (<any> $('#drpBranchCountry')).append(BranchCountrySelection).trigger('change');
 
 
    $('#drpBranchCountry').on('select2:select', function (e) {
    
    debugger;
 
   
    if(typeof((<any>e).params.data.id)!='undefined')
    {
     debugger;
  
   // that.CountryId = (<any>e).params.data.id;
   
    that.f.country.setValue( (<any>e).params.data.id);
    that.f.countryname.setValue( (<any>e).params.data.text);
    that.LoadBranchStates();
    
  }
  
   
    });
    
  
    $('#drpBranchCountry').on("select2:unselecting", function(e) {
     debugger;
    
     that.f.country.setValue(0);
     that.f.countryname.setValue("");
     
    });
 
 }
 LoadBranchStates()
 {
   var that=this;
   debugger;
 
   
 
 
   (<any> $("#drpBranchState")).select2({
    allowClear: true,
    placeholder:"Select",
      ajax: { 
       url:this.APICall.DBCallingURL,
       type: "POST",
       dataType: 'json',
       delay: 250,
       data: 
       function (params) {
    
    var sstring="";
    if( params.term!=undefined)
    {
      sstring=params.term;
    }
    debugger;
    return JSON.stringify( {"Operation": 'ViewStateByCountry', "Params":sstring,"Xml2":'All' ,"Xml3":that.f.country.value,"Xml4" :that.APICall.GetCompanyID() })
        
       }
       ,
       contentType: 'application/json; charset=utf-8',
       processResults: function (response) {
        
    
         debugger;
    
    var ResultData=(JSON.parse(response['Message'])).Table;
    
          var  data = $.map(ResultData, function (obj) {
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
    
 
     var BranchStateSelection = new Option(this.f.statename.value,this.f.state.toString(), true, true);
   
     (<any> $('#drpBranchState')).append(BranchStateSelection).trigger('change');
 
 
    $('#drpBranchState').on('select2:select', function (e) {
    
    debugger;
 
   
    if(typeof((<any>e).params.data.id)!='undefined')
    {
     debugger;
    
   that.f.state.setValue( (<any>e).params.data.id);
   that.f.statename.setValue( (<any>e).params.data.text);
   that.LoadBranchCities();
  }
  
   
    });
    
  
    $("#drpBranchState").on("select2:unselecting", function(e) {
     debugger;
    
     that.f.state.setValue(0);
     that.f.statename.setValue("");
    
    });
 
 }
 LoadBranchCities()
 {
   var that=this;
   debugger;
 
   
 
 
   (<any> $("#drpBranchCity")).select2({
    allowClear: true,
    placeholder:"Select",
      ajax: { 
       url:this.APICall.DBCallingURL,
       type: "POST",
       dataType: 'json',
       delay: 250,
       data: 
       function (params) {
    
    var sstring="";
    if( params.term!=undefined)
    {
      sstring=params.term;
    }
    debugger;
    return JSON.stringify( {"Operation": 'ViewCityByState', "Params":sstring,"Xml2":'All' ,"Xml3":that.f.state.value,"Xml4" :that.APICall.GetCompanyID() })
        
       }
       ,
       contentType: 'application/json; charset=utf-8',
       processResults: function (response) {
        
    
         debugger;
    
    var ResultData=(JSON.parse(response['Message'])).Table;
    
          var  data = $.map(ResultData, function (obj) {
      
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
     var BranchCitySelection = new Option(this.f.cityname.value,this.f.city.value.toString(), true, true);
   
   (<any> $('#drpBranchCity')).append(BranchCitySelection).trigger('change');
 
 
 
    $('#drpBranchCity').on('select2:select', function (e) {
    
    debugger;
 
   
    if(typeof((<any>e).params.data.id)!='undefined')
    {
     debugger;
     that.f.city.setValue( (<any>e).params.data.id);
     that.f.cityname.setValue( (<any>e).params.data.text);
 
  }
  
   
    });
    
  
    $("#drpBranchCity").on("select2:unselecting", function(e) {
     debugger;
    
     
     that.f.city.setValue(0);
     that.f.cityname.setValue("");
    
    });
 
 }
GetPartDetFromGSTNO(GSTNO)
{
  debugger;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-domain-name/commonapi/v1.1/search",
    "method": "GET",
    "headers": {
     
      "content-type": "application/json"
    },
    "data": {
      "action":"TP",
      "gstin": ""+GSTNO+""
    }
  }
  
  $.ajax(settings).done(function (response) {
    debugger;
    console.log(response);
  });



  

  // var data = "gstIN="+GSTNO+"&key_secret=OCM7ztf3i3QpJpBLljGseaWmaNV2";

  // var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  
  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === this.DONE) {
  //     debugger;
  //     console.log(this.responseText);
  //   }
  // });
  
  // xhr.open("POST", "https://api-domain-name/commonapi/v0.2/authenticate");
  // xhr.setRequestHeader("x-rapidapi-host", "gst-number-verify-or-search.p.rapidapi.com");
  // xhr.setRequestHeader("x-rapidapi-key", "d8a9e4c0cbmsh536c18352509909p1d1184jsn7ce1c324af39");
  // xhr.setRequestHeader("content-type", "application/json");
  
  // xhr.send(data);


}

SaveClick()
{


}

  ngOnInit() {
    debugger;
    (<any> $("#drpBranchCountry")).select2();
  (<any> $("#drpBranchState")).select2();
  (<any> $("#drpBranchCity")).select2();

  this.LoadBranchCountries();
  // this.LoadBranchStates();
  // this.LoadBranchCities();
  }

}
