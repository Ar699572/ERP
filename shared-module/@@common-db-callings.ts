
import { Injectable } from '@angular/core';
import { APICallingService } from '../apicalling.service';
import * as AppSettings from '../../assets/Appsettings/AppSettings';

import * as $ from 'jquery';
@Injectable({providedIn:'root'})
export class CommonDbCallings {
    constructor(private APICall:APICallingService)
    {
    
    
    }

    GetAccountGroups()
    {
    
    
     return  this.APICall.DBCalling("ViewAccountGroup","","All","",this.APICall.GetCompanyID());
     
    }

    GetChartOfAccountsByGroup(AccountGroup)
    {
    
    
     return  this.APICall.DBCalling("ViewChartOfAccounts","","All",AccountGroup,this.APICall.GetCompanyID());
     
    }

    GetTermsAndCondition()
    {
    
    
     return  this.APICall.DBCalling("GetTermsAndCondition",this.APICall.GetCompanyID(),"","","");
     
    }
    GetPaymentTerms()
    {
    
    
     return  this.APICall.DBCalling("GetPaymentTerms",this.APICall.GetCompanyID(),"","","");
     
    }

      
    GstTaxFromHSNAndGSTTypeForGridView(HSNXml,GSTTypeName,TransactionDate)
    {
    
    
     return  this.APICall.DBCalling("GstTaxFromHSNAndGSTTypeForGridView",HSNXml,GSTTypeName,TransactionDate,this.APICall.GetCompanyID());
     
    }
    

}
