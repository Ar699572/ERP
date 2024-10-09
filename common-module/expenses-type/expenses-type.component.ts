import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { APICallingService } from '../../apicalling.service';
import * as AppSettings from '../../../assets/Appsettings/AppSettings';
import { ExpenseType } from 'src/app/store/ExpenseType';
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-expenses-type',
  templateUrl: './expenses-type.component.html',
  styleUrls: ['./expenses-type.component.css']
})
export class ExpensesTypeComponent implements OnInit {
  formExpenseType: FormGroup;
  FilterType = 'All';
  ExpenseType: ExpenseType;
  XmlEdit = "";
  lstSerchableFields: any = [];
  SerchType = 'Like'

  constructor(private router: Router, private formBuilder: FormBuilder, private APICall: APICallingService, private store: Store<any>) {

    this.formExpenseType = formBuilder.group({

      Name: new FormControl(''),
      SearchString: new FormControl('')
    });
    this.ViewandSearchExpenseType();
  }

  EditType(xml) {
    debugger;
    this.ExpenseType = new ExpenseType();
    this.APICall.SetViewData(xml);
    this.APICall.UpdatedSelectedPath('./Common/CreateExpenseType');
    var ActivatedRoute = localStorage.getItem("ActivatedRoute");
    this.ExpenseType.TabId = ActivatedRoute;
    this.store.dispatch(new TabStore.AddTab(this.ExpenseType));
    this.router.navigate(['Common/CreateExpenseType']);
  }


  getControlValue(Control, Type): string {
    var Value = (Type == "string" ? "" : "0");
    if (typeof (Control) != undefined && Control.value != null && Control.value != "") {
      Value = Control.value;
    }

    return Value;
  }

  get f() {
    return this.formExpenseType.controls;
  }

  PrepareSerchStringByField(): string {
    var FldSerchString = "";
    if (this.lstSerchableFields.length > 0) {

      var ExpenseType = this.getControlValue(this.f.Name, "string");
      var ExpenseTypeDBField = "";

      for (var i = 0; i < this.lstSerchableFields.length; i++) {
        if (this.lstSerchableFields[i].ControlName == "Name") {
          ExpenseTypeDBField = this.lstSerchableFields[i].DBField;
        }
      }
      debugger;
      if (this.SerchType == 'Like') {
        if (ExpenseType != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " or  " + ExpenseTypeDBField + " Like'" + ExpenseType + "%'") : (ExpenseTypeDBField + " Like'" + ExpenseType + "%'");
        }
      }
      else {
        if (ExpenseType != "") {
          FldSerchString = FldSerchString != "" ? (FldSerchString + " and  " + ExpenseTypeDBField + " ='" + ExpenseType + "'") : (ExpenseTypeDBField + " ='" + ExpenseType + "'");
        }
      }
    }
    return FldSerchString;
  }


  SearchClick() {
    this.ViewandSearchExpenseType();
  }

  GetSearchString(): string {
    debugger;
    var SearchString = "";
    if (this.FilterType != 'All') {
      SearchString = this.PrepareSerchStringByField();
    }
    else {
      SearchString = this.getControlValue(this.f.SearchString, "string")
    }
    return SearchString;
  }


  FilterTypeChange(event) {
    if (AppSettings.ExicuteDebugger) {
      debugger;
    }

    if (this.SerchType == 'Like' && event.target.checked == true) {
      this.FilterType = (event.target.checked == true ? 'All' : 'Field');
    } else {

      event.target.checked = false;
      this.FilterType = 'Field';
    }
  }

  
  SerchTypeChange(ChangedValue) {
    if (AppSettings.ExicuteDebugger) {
      debugger;
    }


    if (ChangedValue == false) {
      this.SerchType = 'Equal'
      if (this.FilterType == 'All')
        $('#customSwitch').trigger('click');

    } else {
      this.SerchType = 'Like'
    }
  }

  lstexpenseType: any = [];
  lstDbResult: any = [];
  ViewandSearchExpenseType() {


    if (AppSettings.ShowLoaderOnView) {
      $("#loaderParent").prepend("<div id='loaderParent' class='page-loader' style='display: none;'> <div class='spinner-border'></div> <span>Loading</span> </div>");

      $("#loaderParent").show();
    }
    var sstring = (this.GetSearchString());
    debugger;
    this.APICall.DBCalling("ExpenseTypeViewWeb", sstring, this.FilterType, "", this.APICall.GetCompanyID()).subscribe(
      (res: Response) => {
        debugger;
        this.lstDbResult = JSON.parse(res['Message']);


        this.lstexpenseType = [];
        if (this.lstDbResult.Table.length > 0) {
          this.lstexpenseType = this.lstDbResult.Table;



          if (this.lstSerchableFields.length == 0) {


            var stringDbFld = this.lstDbResult.Table[0].SerchableFields
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(stringDbFld, "text/xml");

            var sizex = xmlDoc.getElementsByTagName("ControlName");

            for (var i = 0; i < sizex.length; i++) {



              this.lstSerchableFields.push(


                ({
                  ControlName: xmlDoc.getElementsByTagName("ControlName")[i].childNodes[0].nodeValue

                  , DBField: xmlDoc.getElementsByTagName("DBField")[i].childNodes[0].nodeValue

                })

              );
            }
          }
        }

        $("#loaderParent").hide();
      });
  }

  OnAdd()
{

  this.ExpenseType=new ExpenseType;
  this.APICall.UpdatedSelectedPath('./Common/CreateExpenseType');
  var ActivatedRoute=localStorage.getItem("ActivatedRoute");
  //this.store.dispatch(new  TabStore.AddTab(this.StoreAccountingQuotation));
  this.ExpenseType.TabId=ActivatedRoute;
  this.store.dispatch(new  TabStore.AddTab(this.ExpenseType));

  this.router.navigate(['Common/CreateExpenseType']);
  

  

}

  ngOnInit() {
  }

}
