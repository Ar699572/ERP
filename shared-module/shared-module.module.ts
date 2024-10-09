import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { DropdownCountryComponent } from './dropdown-country/dropdown-country.component';
import { DropdownStateComponent } from './dropdown-state/dropdown-state.component';
import { DropdownCityComponent } from './dropdown-city/dropdown-city.component';

import { RouterModule } from '@angular/router';
import { DropdownChartofAccountsComponent } from './dropdown-chartof-accounts/dropdown-chartof-accounts.component';
import { DropdownCustomerComponent } from './dropdown-customer/dropdown-customer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddProductFullDetailsComponent } from './add-product-full-details/add-product-full-details.component';
import { DropdownNumberSequenceComponent } from './dropdown-number-sequence/dropdown-number-sequence.component';
import { SalesQuotationPrintComponent } from './Reports/sales-quotation-print/sales-quotation-print.component';
import { SalesOrderPrintComponent } from './Reports/sales-order-print/sales-order-print.component';
import { DCPrintComponent } from './Reports/dcprint/dcprint.component';
import { ProfarmaInvoicePrintComponent } from './Reports/profarma-invoice-print/profarma-invoice-print.component';
import { SalesReturnsPrintComponent } from './Reports/sales-returns-print/sales-returns-print.component';
import { ReceiptPrintComponent } from './Reports/receipt-print/receipt-print.component';
import { PaymentPrintComponent } from './Reports/payment-print/payment-print.component';
import { PettyCashBookPrintComponent } from './Reports/petty-cash-book-print/petty-cash-book-print.component';
import { SavePartyComponent } from './save-party/save-party.component';
import { PurchaseQuotationPrintComponent } from './Reports/purchase-quotation-print/purchase-quotation-print.component';
import { DropdownVendorComponent } from './dropdown-vendor/dropdown-vendor.component';
import { PurchaseOrderPrintComponent } from './Reports/purchase-order-print/purchase-order-print.component';
import { PurchaseInvoicePrintComponent } from './Reports/purchase-invoice-print/purchase-invoice-print.component';
import { AddPurchaseProductDetailsComponent } from './add-purchase-product-details/add-purchase-product-details.component';
import { AddPurchaseTaxDetailsComponent } from './add-purchase-tax-details/add-purchase-tax-details.component';
import { AddChargesAccountComponent } from './add-charges-account/add-charges-account.component';
import { FormsModule } from '@angular/forms';
import { AddchargeitemsComponent } from './addchargeitems/addchargeitems.component';
import { SalesInvoicePrintComponent } from './Reports/sales-invoice-print/sales-invoice-print.component';
import { DropDownSalesQuotationNoComponent } from './drop-down-sales-quotation-no/drop-down-sales-quotation-no.component';
import { RFQPrintComponent } from './Reports/rfqprint/rfqprint.component';
import { PettyCashExpesesPrintComponent } from './Reports/petty-cash-expeses-print/petty-cash-expeses-print.component';


@NgModule({
  declarations: [
    DropdownCountryComponent,
      DropdownStateComponent,
      DropdownCityComponent,
      DropDownSalesQuotationNoComponent,
      DropdownChartofAccountsComponent,
     
      DropdownCustomerComponent,
     
      AddProductComponent,
     
      AddProductFullDetailsComponent,
     
      DropdownNumberSequenceComponent,
     
      SalesQuotationPrintComponent,
     
      SalesOrderPrintComponent,
     
      DCPrintComponent,
     
      ProfarmaInvoicePrintComponent,
     
      SalesInvoicePrintComponent,
     
      SalesReturnsPrintComponent,
     
      ReceiptPrintComponent,
     
      PaymentPrintComponent,
     
      PettyCashBookPrintComponent,
     
      SavePartyComponent,
     
      PurchaseQuotationPrintComponent,
     
      DropdownVendorComponent,
     
      PurchaseOrderPrintComponent,
     
      PurchaseInvoicePrintComponent,
     
      AddPurchaseProductDetailsComponent,
     
      AddPurchaseTaxDetailsComponent,
     
      AddChargesAccountComponent,
     
      AddchargeitemsComponent,
     
      RFQPrintComponent,
     
      PettyCashExpesesPrintComponent,
     
     

    ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    FormsModule,
    
    RouterModule.forChild([])
  ],
  
  exports: [
    PurchaseOrderPrintComponent,
    DropdownVendorComponent,

    PurchaseQuotationPrintComponent,
    DropdownCountryComponent,
    DropdownStateComponent,
    DropdownCityComponent,
    DropdownCustomerComponent,
    DropdownChartofAccountsComponent,
    AddProductComponent,
    AddProductFullDetailsComponent,
    DropdownNumberSequenceComponent,
    SalesQuotationPrintComponent,
    SalesOrderPrintComponent,
    DCPrintComponent,
    ProfarmaInvoicePrintComponent
    ,SalesInvoicePrintComponent
    ,SalesReturnsPrintComponent
    ,ReceiptPrintComponent,
    PurchaseInvoicePrintComponent,
    PaymentPrintComponent,
   
    PettyCashBookPrintComponent,
    SavePartyComponent,
    AddPurchaseProductDetailsComponent,
    AddPurchaseTaxDetailsComponent,
    AddChargesAccountComponent,
    AddchargeitemsComponent,
    PettyCashExpesesPrintComponent,
    DropDownSalesQuotationNoComponent
  ],
})
export class SharedModuleModule { }
