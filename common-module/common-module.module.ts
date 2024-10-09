import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';  
 import { CommonModuleRoutingModule } from './common-module-routing.module';
import {  RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { LoginUsersComponent } from './login-users/login-users.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CreateLoginUserComponent } from './create-login-user/create-login-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppAuthguard } from '../app-authguard';
import { BranchesComponent } from './branches/branches.component';
import { CreateBranchesComponent } from './create-branches/create-branches.component';
import { CountryComponent } from './country/country.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { CurrencyComponent } from './currency/currency.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { StateComponent } from './state/state.component';
import { CreateStateComponent } from './create-state/create-state.component';
import { CityComponent } from './city/city.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { TransportComponent } from './transport/transport.component';
import { CreateTransportComponent } from './create-transport/create-transport.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NumberSequencyFormComponent } from './number-sequency-form/number-sequency-form.component';
import { CreateNumberSequencyFormComponent } from './create-number-sequency-form/create-number-sequency-form.component';
import { PageNumberSequenceMappingComponent } from './page-number-sequence-mapping/page-number-sequence-mapping.component';
import { CreatePageNumberSequenceMappingComponent } from './create-page-number-sequence-mapping/create-page-number-sequence-mapping.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginUserPageComponent } from './login-user-page/login-user-page.component';
import { OverviewloginpageComponent } from './overviewloginpage/overviewloginpage.component';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { CreateExpenseTypeComponent } from './create-expense-type/create-expense-type.component';
import { CreateShippingServicesComponent } from './create-shipping-services/create-shipping-services.component';
import { ShippingServicesComponent } from './shipping-services/shipping-services.component';
import { NotificationsComponent } from   './notifications/notifications.component';
import { PaymentsTermsComponent } from './payments-terms/payments-terms.component';
import { CreatepaymentTermsComponent } from './createpayment-terms/createpayment-terms.component';
 

    
@NgModule({
  declarations: [CompaniesComponent,
    CreateCompanyComponent,
    LoginUsersComponent,
    CreateLoginUserComponent,
    DashboardComponent,
    BranchesComponent,
    CreateBranchesComponent,
    CountryComponent,
    CreateCountryComponent,
    CurrencyComponent,
    CreateCurrencyComponent,
    StateComponent,
    CreateStateComponent,
    CityComponent,
    CreateCityComponent,
    TransportComponent,
    CreateTransportComponent,
    NumberSequencyFormComponent,
    CreateNumberSequencyFormComponent,
    PageNumberSequenceMappingComponent,
    CreatePageNumberSequenceMappingComponent,
    SettingsComponent,
    LoginUserPageComponent,
    OverviewloginpageComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    ExpensesTypeComponent,
    CreateExpenseTypeComponent,
    CreateShippingServicesComponent,
    ShippingServicesComponent,
    NotificationsComponent,
    PaymentsTermsComponent,
    CreatepaymentTermsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModuleModule,
    HighchartsChartModule,
   // CommonModuleRoutingModule,
    RouterModule.forChild(



      [
        
        { path: 'Companies', component: CompaniesComponent, pathMatch: 'full' },
        { path: 'LoginUsers', component: LoginUsersComponent, pathMatch: 'full' },
        { path: 'CreateLoginUser', component: CreateLoginUserComponent, pathMatch: 'full' },
        { path: 'CreateCompany', component: CreateCompanyComponent, pathMatch: 'full' },
        { path: 'Dashboard', component:DashboardComponent, pathMatch: 'full' }
        , { path: 'Branches', component:BranchesComponent, pathMatch: 'full' }  

        , { path: 'CreateBranches', component:CreateBranchesComponent, pathMatch: 'full' }  
        , { path: 'Country', component:CountryComponent, pathMatch: 'full' }  
        , { path: 'CreateCountry', component:CreateCountryComponent, pathMatch: 'full' }  
        , { path: 'State', component:StateComponent, pathMatch: 'full' }  
        , { path: 'CreateState', component:CreateStateComponent, pathMatch: 'full' }
        , { path: 'City', component:CityComponent, pathMatch: 'full' }  
        , { path: 'CreateCity', component:CreateCityComponent, pathMatch: 'full' }
        , { path: 'Transport', component:TransportComponent, pathMatch: 'full' }  
        , { path: 'CreateTransport', component:CreateTransportComponent, pathMatch: 'full' }
        , { path: 'Currency', component:CurrencyComponent, pathMatch: 'full' }  
        , { path: 'CreateCurrency', component:CreateCurrencyComponent, pathMatch: 'full' }  
        , { path: 'NumberSequencyForm', component:NumberSequencyFormComponent, pathMatch: 'full' }  
        , { path: 'CreateNumberSequencyForm', component:CreateNumberSequencyFormComponent, pathMatch: 'full' }  
        , { path: 'PageNumberSequenceMapping', component:PageNumberSequenceMappingComponent, pathMatch: 'full' }  
        , { path: 'CreatePageNumberSequenceMapping', component:CreatePageNumberSequenceMappingComponent, pathMatch: 'full' }
        , { path: 'Settings', component:SettingsComponent, pathMatch: 'full' }  
        , { path: 'Loginuserspage', component:LoginUserPageComponent, pathMatch: 'full' }  
        , { path: 'overviewloginpage', component:OverviewloginpageComponent, pathMatch: 'full' }  
         , { path: 'Employee', component:EmployeeComponent, pathMatch: 'full' }  

         , { path: 'CreateEmployee', component:CreateEmployeeComponent, pathMatch: 'full' }
         , { path: 'ExpensesType', component:ExpensesTypeComponent, pathMatch: 'full' }
         , { path: 'ExpensesType', component:ExpensesTypeComponent, pathMatch: 'full' }
         , { path: 'CreateExpenseType', component:CreateExpenseTypeComponent, pathMatch: 'full' }
         , { path: 'ShippingServices', component:ShippingServicesComponent, pathMatch: 'full' }
         , { path: 'CreateShippingServices', component:CreateShippingServicesComponent, pathMatch: 'full' }
         , { path: 'Notifications', component:NotificationsComponent, pathMatch: 'full' }
         , { path: 'PaymentTerms', component:PaymentsTermsComponent, pathMatch: 'full' }
         , { path: 'CreatepaymentTerms', component:CreatepaymentTermsComponent, pathMatch: 'full' }
      ]
    )
  ],
  exports: [RouterModule]
})
export class CommonModuleModule { }
