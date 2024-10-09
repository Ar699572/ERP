import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../apicalling.service';



@Component({
  selector: 'app-company-creation',
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.css']
})
export class CompanyCreationComponent implements OnInit {

  creatingCompany:any='./assets/icons/companyIcons/awaitspin.gif';
  CreatingDatabase:any='./assets/icons/companyIcons/awaitspin.gif';
  CreatingServices:any='./assets/icons/companyIcons/awaitspin.gif';
  CreateCompany:FormGroup;
  @ViewChild('closebutton',{static:false}) closebutton;

  
  constructor(private router: Router,private fb:FormBuilder,private APICall: APICallingService) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.CreateCompany = fb.group({
      CompanyName: new FormControl('',Validators.required),
      CompanyCode : new FormControl('',Validators.required),
      Currency: new FormControl('',Validators.required),
      financialstartdate: new FormControl('01-01-2010',Validators.required),
      Financialenddate: new FormControl('01-01-2011',Validators.required),
      ReferenceDbId:new FormControl('',Validators.required),
      DatabaseName:new FormControl(''),
      address1: new FormControl(''),
      address2 : new FormControl(''),
      CountryId : new FormControl(''),
      StateId: new FormControl(''),
      CityId: new FormControl(''),
      zipcode: new FormControl(''),
      contactno: new FormControl(''),
      contactname: new FormControl(''),
      BranchCityName:new FormControl(''),
      BranchStateName:new FormControl(''),
      email:new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      //website: new FormControl(''),
     website: ['', [Validators.required, Validators.pattern(urlRegex)]],
      branchaname: new FormControl(''),
      branchaddress: new FormControl(''),
      branchaddress2: new FormControl(''),
      BranchCountryName:new FormControl(''),
      City2Id: new FormControl(''),
      Country2Id: new FormControl(''),
      State2Id: new FormControl(''),
      zipcode2: new FormControl(''),
      BranchContactNo:new FormControl(''),
      BranchContactName:new FormControl(''),
      branchemail:new FormControl(''),
      BranchWebsite:new FormControl(''),
      bankaname:new FormControl(''),
      AccountNo:new FormControl(''),
      ifsccode:new FormControl(''),
      branch:new FormControl(''),
      CountryName:new FormControl(''),
      CityName:new FormControl(''),
      StateName: new FormControl('')
    },{validator: this.checkDates});
   }

   checkDates(group: FormGroup) {
    
  
   if(group.controls.Financialenddate.value  <= group.controls.financialstartdate.value )
      {
     return { notValid:true }
   }
   return null;
 } 


  ngOnInit() {
debugger;
// this.next(1)
// var allWells = $('.setup-content')
// allWells.hide()
$('.step-1').removeProp('display');
this.ReferenceDb();
this.ComapanyCountries();
this.ComapanyStates();
this.ComapanyCity();
this.branchCountries();
this.branchStates();
this.branchCity();
  }

  

  private StartTimer() {
    debugger;
      var timer2 = "10:00";
      var interval ;
    let  lastSeconds:any=-1;
      $("#start").click(function() {
        if (timer2 !== null) return;  
      });
       interval= setInterval(function () {
        var timer = timer2.split(':');
        //by parsing integer, I avoid all extra string processing
        var minutes = parseInt(timer[0], 10);
        var seconds: any = parseInt(timer[1], 10);
      debugger;
        if(seconds==0  )
        {
          if( lastSeconds==-1)
          {
            lastSeconds=60;
          }
         
          if(lastSeconds<=1)
        {
          clearInterval(interval);
        }
        }
          // --lastSeconds;
          if( lastSeconds==1)
          {
            lastSeconds=0;

          }
        --seconds;
        minutes = (seconds < 0) ? --minutes : minutes;
  
        if (minutes < 0)
          clearInterval(interval);
        if (minutes == (-1)) {
          minutes = 0;
        }
        seconds = (seconds < 0) ? lastSeconds : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 10) ? +minutes : minutes;
        $('#time').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;
        
      }, 1000);
    
      
    }
    Companywizrd:boolean=false;

  CompanyName(event){
    debugger;
     var val=event.target.value;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var test = specialChars.test(event.target.value);
  var control= val.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/]/,"");
  control= val.replace(/\s/g, "")
  var test2 = specialChars.test(control);
 
  // console.log(test);
  if(test2 == true){
  var control2= control.replace(/[^\w\s]/gi, "")
 
  }
  else{
    control2 = control; 
  }
  var test2 = specialChars.test(control2);
    if(test2 ==false){
       this.CreateCompany.patchValue({
        CompanyCode:control2,
       })
    }
  var out = val.replace(/\s/g, "");

  }
  
  Login()
  {
    this.router.navigate(['/Login']);
  }
  getControlValue(Control, Type): string {

    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }
  DbResult:any=[]
CurrentProcess:string='';
startingminutes:number=0

  SaveCompany()
  {
    try{

      if(this.CreateCompany.valid){
        this.CurrentProcess='CreateCompany';
        debugger;
       this.Save('CreateCompany');
      }else{
       this.Save('CreateCompany');
    }
    }
    catch(error){}
  }

  Save(operationName){
  debugger;

 
  var xml1 = '<NewDataSet><Table1>'

  +'<referenceDatabaseID>'+this.getControlValue(this.f.ReferenceDbId,'int')+'</referenceDatabaseID>'
  + '<companycode>' + this.getControlValue(this.f.CompanyCode,'string')+ '</companycode>'
  + '<financialfromdate>' + this.getControlValue(this.f.financialstartdate,'string') + '</financialfromdate>'
  + '<financialtodate>' + this.getControlValue(this.f.Financialenddate,'string') + '</financialtodate>'
  + '<companyname>' + this.getControlValue(this.f.CompanyName,'string') + '</companyname>'
  + '<currency>' +this.getControlValue( this.f.Currency,'int')+ '</currency>'
  + '<other1>' +this.getControlValue( this.f.address1,'string') + '</other1>'
  + '<other2>' +  this.getControlValue(this.f.address2,'string')+ '</other2>'
  + '<country>' + this.getControlValue( this.f.CountryId,'int') + '</country>'
  + '<state>' + this.getControlValue(this.f.StateId,'string')+ '</state>'
  + '<city>' +this.getControlValue(this.f.CityId,'string') + '</city>'
  + '<zipcode>' +this.getControlValue(this.f. zipcode,'string') + '</zipcode>'
  + '<ContactNo>' +this.getControlValue(this.f.contactno,'string')  + '</ContactNo>'
  + '<Contactname>' + this.getControlValue(this.f.contactname,'string')+ '</Contactname>'
  + '<EmailId>' + this.getControlValue(this.f.email,'string')+ '</EmailId>'
  + '<WebSite>' + this.getControlValue(this.f.website,'string')+ '</WebSite>'
  + '<branchname>' + this.getControlValue(this.f.branchaname,'string') + '</branchname>'
  + '<address1>' +  this.getControlValue(this.f.branchaddress,'string')+ '</address1>'
  + '<address2>' +this.getControlValue(this.f.branchaddress2,'string')  + '</address2>'
  + '<country>' + this.getControlValue(this.f.Country2Id,'int')+ '</country>'
  + '<state>' + this.getControlValue(this.f.State2Id,'int')+ '</state>'
  + '<city>' + this.getControlValue(this.f.City2Id,'string') + '</city>'
  + '<zipcode>' + this.getControlValue(this.f.zipcode2,'string')+ '</zipcode>'
  + '<ContactNo>' + this.getControlValue( this.f.BranchContactNo,'int')+ '</ContactNo>'
  + '<ContactName>' + this.getControlValue(this.f.BranchContactName,'string')+ '</ContactName>'
  + '<Email>' +  this.getControlValue(this.f.branchemail,'string')+ '</Email>'
  + '<Website>' + this.getControlValue( this.f.BranchWebsite,'string')+ '</Website>'
  + '<DefaultBank>' +  this.getControlValue(this.f.bankaname,'string')+ '</DefaultBank>'
  + '<BankBranch>' +  this.getControlValue(this.f.branch,'string')+ '</BankBranch>'
  + '<BankAccountNo>' + this.getControlValue(this.f.AccountNo,'int')+ '</BankAccountNo>'
  + '<IFSCCode>' + this.getControlValue( this.f.ifsccode,'string')+ '</IFSCCode>'
  + '<DeleteFlag>0</DeleteFlag>'
  

  + '</Table1></NewDataSet>';

debugger;
if(this.DbResult==''){
  if(operationName='CreateCompany'){
    this.StartTimer()
  }
}

 

  this.DbResult=[]
if(this.CurrentProcess=='CreateCompany'){
this.creatingCompany='./assets/icons/companyIcons/loader.gif'
}
if(this.CurrentProcess=='CreateDabase'){
  this.CreatingDatabase='./assets/icons/companyIcons/loader.gif'
  }
    if(this.CurrentProcess=='CheckApICreation'){
      
      this.CreatingServices='./assets/icons/companyIcons/loader.gif'
      }
    

this.APICall.DBCalling('CreateCompany',xml1,operationName,"", "").subscribe(
  (res: Response) => {
    debugger;

    if(operationName=='CreateCompany'){
      this.DbResult = JSON.parse(res['Message']);
      if(this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBResult > 0){
        this.creatingCompany='./assets/icons/companyIcons/progess.png'
        this.CreatingDatabase='./assets/icons/companyIcons/loader.gif'
        this.CurrentProcess='CreateDabase'
        this.Save('CreateDabase')
      }
    } 
    
  else if(operationName=='CreateDabase'){
    this.DbResult = JSON.parse(res['Message']);
    if(this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBResult > 0){
      this.CreatingDatabase='./assets/icons/companyIcons/progess.png'
      this.CurrentProcess='CheckApICreation'
      this.Save('CheckApICreation')
    }
  }
  else if(operationName=='CheckApICreation'){
    this.DbResult = JSON.parse(res['Message']);
    if(this.DbResult.Table[0].DBResult == -1){
      this.CreatingServices='./assets/icons/companyIcons/failed1.png'
    }else if(this.DbResult.Table.length > 0 && this.DbResult.Table[0].DBResult > 0){
      this.CreatingServices='./assets/icons/companyIcons/progess.png'
    }
else{

}
  }
    else  {
      if (this.DbResult.Table[0].DBResult == -23) {
           
        (window as any).swal({
                icon: 'warning',
                title: 'Exists',
                text: 'Company Already Exists.!',
                confirmButtonText: 'Dismiss',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-lg btn-warning'
              });
              
    }
    else  if (this.DbResult.Table[0].DBResult == -1) {
           
      (window as any).swal({
              icon: 'warning',
              title: 'Exists',
              text: 'Company Creation Failed.!',
              confirmButtonText: 'Dismiss',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-lg btn-warning'
            });
      this.CreatingServices='../../assets/icons/companyIcons/failed1.png'  
  }
    else{
      if(this.CurrentProcess=='CreateCompany')
      {
      this.creatingCompany='./assets/icons/companyIcons/failed1.png'
      this.CreatingDatabase='./assets/icons/companyIcons/failed1.png'
      this.CreatingServices='./assets/icons/companyIcons/failed1.png'
      }
      else  if(this.CurrentProcess=='CreateDabase')
      {
        this.CreatingDatabase='./assets/icons/companyIcons/failed1.png'
        this.CreatingServices='./assets/icons/companyIcons/failed1.png'
      }
      else  if(this.CurrentProcess=='CreateDabase')
      {
        this.CreatingServices='./assets/icons/companyIcons/failed1.png'
      }
    }
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
  submitted=false;
 
  StopTimer()
  {
    var that=this;
    debugger;  
    (window as any).swal({
      icon: "warning",
      title: "company creation is under process",
      text: "Do you wants to close popup",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {

      if (isConfirm) {
        var timer2 = "0:00";
        var interval = setInterval(function (interval) {
          var timer = timer2.split(':');
          //by parsing integer, I avoid all extra string processing
          var minutes = parseInt(timer[0], 10);
          var seconds: any = parseInt(timer[1], 10);
          --seconds;
          minutes = (seconds < 0) ? --minutes : minutes;
          if (minutes < 0)
           // clearInterval(interval);
          if (minutes == (-1)) {
            minutes = 0;
          }
          seconds = (seconds < 0) ? 0 : seconds;
          seconds = (seconds < 10) ? '0' + seconds : seconds;
          minutes = (minutes < 10) ? +minutes : minutes;
          clearInterval(interval)
          $('#time').html(minutes + ':' + seconds);
         clearInterval(interval)
         var id=$('#time')
          timer2 = minutes + ':' + seconds;
          
          clearTimeout(this.id) 
    if(timer2.length > 0){
    clearInterval(interval)
    }
     }, interval);
     that.closebutton.nativeElement.click();
      } else { 
      }


    }); 
  }

  nextstep=1
 next(step){
  debugger;
  
 if(step == 2){
  debugger;
  if(this.f.CompanyCode.value!=="" && this.f.Financialenddate.value!=="" && this.f.Financialenddate.value!=="01-01-2011"  &&
     this.f.financialstartdate.value!==""  && this.f.financialstartdate.value!=="01-01-2010"  && this.f.Currency.value!=='0' && this.f.ReferenceDbId.value!=='0'){
      $('#step-2').removeAttr('hidden')
      $('#step-2').removeAttr('style')
     

      
      $('#step-1').attr('style','display:none')
      $('#step2').attr('class','btn btn-success btn-circle')
      $('#step1').attr('class','btn btn-default  btn-circle')
     
     }else{
      this.submitted=true;
    }
}else if(step == 3){
  $('#step-3').removeAttr('hidden')
  $('#step-3').removeAttr('style')
  $('#step-2').attr('style','display:none')
  $('#step3').attr('class','btn btn-success btn-circle')
  $('#step2').attr('class','btn btn-default  btn-circle')
}else if(step == 4){
  var Cvalid=true;
  if( this.f.email.touched && this.f.email.status=='INVALID' ) {
    Cvalid=false;
 }
 if(Cvalid){
  $('#step-4').removeAttr('hidden')
  $('#step-4').removeAttr('style')
  $('#step-3').attr('style','display:none')
  $('#step4').attr('class','btn btn-success btn-circle')
  $('#step3').attr('class','btn btn-default  btn-circle')
 }
}else if(step == 5){
  
  $('#step-5').removeAttr('hidden')
  $('#step-5').removeAttr('style')
  $('#step-4').attr('style','display:none')
  $('#step5').attr('class','btn btn-success btn-circle')
  $('#step4').attr('class','btn btn-default  btn-circle')
 
  
}else if(step == 6){
  $('#step-6').removeAttr('hidden')
  $('#step-6').removeAttr('style')
  $('#step-5').attr('style','display:none')
  $('#step6').attr('class','btn btn-success btn-circle')
  $('#step5').attr('class','btn btn-default  btn-circle')
}else{
  alert('no tab collected')
}
 }

 prev(step){
  if(step == 1){
    $('#step-1').removeAttr('style')
    $('#step-2').attr('style','display:none')
    $('#step1').attr('class','btn btn-success btn-circle')
    $('#step2').attr('class','btn btn-default  btn-circle')
  }else if(step == 2){
    $('#step-2').removeAttr('style')
    $('#step-3').attr('style','display:none')
    $('#step2').attr('class','btn btn-success btn-circle')
  $('#step3').attr('class','btn btn-default  btn-circle')

  }else if(step == 3){
    $('#step-3').removeAttr('style')
    $('#step-4').attr('style','display:none')
    $('#step3').attr('class','btn btn-success btn-circle')
    $('#step4').attr('class','btn btn-default  btn-circle')
  }else if(step == 4){
    $('#step-4').removeAttr('style')
    $('#step-5').attr('style','display:none')
    $('#step4').attr('class','btn btn-success btn-circle')
    $('#step5').attr('class','btn btn-default  btn-circle')
  }else if(step == 5){
    $('#step-5').removeAttr('style')
    $('#step-4').attr('style','display:none')
    $('#step-6').attr('style','display:none')
    $('#step5').attr('class','btn btn-success btn-circle')
    $('#step6').attr('class','btn btn-default  btn-circle')
  }else if(step == 6){
    $('#step-6').removeAttr('style')
    $('#step-5').attr('style','display:none')
    // $('#step5').attr('class','btn btn-success btn-circle')
    // $('#step6').attr('class','btn btn-default  btn-circle')
  }else{

  }
  
 }
  // next(){
  //   debugger;
   
  //   if(this.f.CompanyCode.value!=="" && this.f.Financialenddate.value!=="" && this.f.Financialenddate.value!=="01-01-2011"  &&
  //     this.f.financialstartdate.value!==""  && this.f.financialstartdate.value!=="01-01-2010"  && this.f.Currency.value!=='0' && this.f.ReferenceDbId.value!=='0'){
  //    var   allNextBtn = $('.validbtn');
  //    this.Companywizrd=true;
  //    allNextBtn.click(function () {
  //     debugger;
    
  //       var curStep = $(this).closest(".setup-content"),
  //           curStepBtn = curStep.attr("id"),
  //           nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
  //           curInputs = curStep.find("input[type='text'],input[type='url']"),
  //           isValid = true;
  
  //       $(".form-group").removeClass("has-error");
  //       for (var i = 0; i < curInputs.length; i++) {
            
  //       }
  
  //       if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
  //   });
  //     }else{
  //       this.submitted=true;
  //     }
  // }
  ngAfterViewInit(){
 
    // $(document).ready(function () {

    //   var navListItems = $('div.setup-panel div a'),
    //       allWells = $('.setup-content'),
    //       allNextBtn = $('.nextBtn');
    //     var prvbtn=$('.PrvBtn');
    
    //   allWells.hide();
    
    //   navListItems.click(function (e) {
    //       e.preventDefault();
    //       var $target = $($(this).attr('href')),
    //           $item = $(this);
    
    //       if (!$item.hasClass('disabled')) {
    //           navListItems.removeClass('btn-success').addClass('btn-default');
    //           $item.addClass('btn-success');
    //           allWells.hide();
    //           $target.show();
    //           $target.find('input:eq(0)').focus();
    //       }
    //   });
    
    //   allNextBtn.click(function () {
    //     debugger;
    //       var curStep = $(this).closest(".setup-content"),
    //           curStepBtn = curStep.attr("id"),
    //           nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
    //           curInputs = curStep.find("input[type='text'],input[type='url']"),
    //           isValid = true;
    
    //       $(".form-group").removeClass("has-error");
    //       for (var i = 0; i < curInputs.length; i++) {
              
    //       }
    
    //       if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    //   });
    //   prvbtn.click(function () {
    
    //     var curStep = $(this).closest(".setup-content"),
    //         curStepBtn = curStep.attr("id"),
    //         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
    //         curInputs = curStep.find("input[type='text'],input[type='url']"),
    //         isValid = true;
    
    //     $(".form-group").removeClass("has-error");
    //     for (var i = 0; i < curInputs.length; i++) {
            
    //     }
    
    //     if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    // });
      
    //   $('div.setup-panel div a.btn-success').trigger('click');
     
      
    // });

}

ComapanyCity(){
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
            return JSON.stringify({ "Operation": 'ViewCityByState', "Params": sstring, "Xml2": 'All', "Xml3": that.f.StateId.value, "Xml4": '1' })

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

ComapanyStates(){
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
            return JSON.stringify({ "Operation": 'ViewStateByCountry', "Params": sstring, "Xml2": 'All', "Xml3": that.f.CountryId.value, "Xml4": '1'})

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
     that.ComapanyCity()
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

branchCountries() {
  try{
  var that = this;
  debugger;

  (<any>$('#BranchCountry')).select2({
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
          return JSON.stringify({ "Operation": 'ViewCountries', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": '1' })

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
  var CountrySelection = new Option(this.f.BranchCountryName.value, this.f.Country2Id.value.toString(), true, true);

  (<any>$('#BranchCountry')).append(CountrySelection).trigger('change');


     $('#BranchCountry').on('select2:select', function (e) {

    debugger;


    if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;

     

     
      that.f.Country2Id.setValue((<any>e).params.data.id);
      that.f.BranchCountryName.setValue((<any>e).params.data.text);

that.branchStates();
    }
  });


  $('#BranchCountry').on("select2:unselecting", function (e) {
    debugger;


    that.f.Country2Id.setValue(0);
    that.f.BranchCountryName.setValue("");

  });
}
catch(e){

}
}

branchStates(){
  try{
    var that = this;
    debugger;

    (<any>$("#BranchState")).select2({
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
            return JSON.stringify({ "Operation": 'ViewStateByCountry', "Params": sstring, "Xml2": 'All', "Xml3": that.f.Country2Id.value, "Xml4": '1' })

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


    var StateSelection = new Option(this.f.BranchStateName.value, this.f.State2Id.value.toString(), true, true);

    (<any>$('#BranchState')).append(StateSelection).trigger('change');


   
    $('#BranchState').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;

        that.f.State2Id.setValue((<any>e).params.data.id);
        that.f.BranchStateName.setValue((<any>e).params.data.text);
     that.ComapanyCity()
      }


    });


    $("#BranchState").on("select2:unselecting", function (e) {
      debugger;

      that.f.State2Id.setValue(0);
      that.f.BranchStateName.setValue("");

    });

  
  }catch(e){

  }

}
 
branchCity(){
  try{
    var that = this;
    debugger;
    (<any>$("#BranchCity")).select2({
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
            return JSON.stringify({ "Operation": 'ViewCityByState', "Params": sstring, "Xml2": 'All', "Xml3": that.f.State2Id.value, "Xml4": '1' })

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
    var CitySelection = new Option(this.f.BranchCityName.value, this.f.City2Id.value.toString(), true, true);

    (<any>$('#BranchCity')).append(CitySelection).trigger('change');


    $('#BranchCity').on('select2:select', function (e) {

      debugger;


      if (typeof ((<any>e).params.data.id) != 'undefined') {
        debugger;
        that.f.City2Id.setValue((<any>e).params.data.id);
        that.f.BranchCityName.setValue((<any>e).params.data.text);

      }


    });


    $("#BranchCity").on("select2:unselecting", function (e) {
      debugger;


      that.f.City2Id.setValue(0);
      that.f.BranchCityName.setValue("");

    });
  }catch(e){

  }
}
ComapanyCountries() {
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
debugger;
          var sstring = "";
          if (params.term != undefined) {
            sstring = params.term;
          }
          debugger;
          return JSON.stringify({ "Operation": 'ViewCountries', "Params": sstring, "Xml2": 'All', "Xml3": "", "Xml4": '1' })

        }
      ,
      contentType: 'application/json; charset=utf-8',
      processResults: function (response) {


        debugger;

        var ResultData = (JSON.parse(response['Message'])).Table;

        var data = $.map(ResultData, function (obj) {
debugger;
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
      that.ComapanyStates()

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

ReferenceDb() {
  try{
  var that = this;
  debugger;
  
  (<any>$('#drpRefDatabase')).select2({
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

  (<any>$('#drpRefDatabase')).append(DbSelection).trigger('change');

     $('#drpRefDatabase').on('select2:select', function (e) {

    debugger;


    if (typeof ((<any>e).params.data.id) != 'undefined') {
      debugger;

      that.f.ReferenceDbId.setValue((<any>e).params.data.id);
      that.f.DatabaseName.setValue((<any>e).params.data.text);
     

    }
  });


  $('#drpRefDatabase').on("select2:unselecting", function (e) {
    debugger;

    that.f.ReferenceDbId.setValue(0);
    that.f.DatabaseName.setValue("");

  });
}
catch(e){

}
}
  get f() {
    return this.CreateCompany.controls;
  }
}

