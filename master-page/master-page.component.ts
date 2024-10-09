import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APICallingService } from '../apicalling.service';
import { AuthenticationServiceService } from '../authentication-service.service';
import { timer, Observable } from 'rxjs';
import {StoreNotification} from '../store/StoreNotification';
import { Store } from '@ngrx/store'; 
import * as TabStore from "src/app/store/TabStore/Tab.Actions";
// import { AppState } from '../store/app.state';

//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-master-page',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class MasterPageComponent implements OnInit {
  title = 'Mechknow ERP';
  UserName:string;
  StoreNotification:StoreNotification;
  selectedTab: Observable<string>;
  UserID:string;
  ActivatedRoute="";
  constructor(private router:Router,private APICall:APICallingService,private AuthenticationService:AuthenticationServiceService, private store: Store<any>) {
//private store: Store<AppState>,
    //this.selectedTab = this.store.select(state => state.ui.selectedTab);
    this.UserID=sessionStorage.getItem("UserID");
    this.UserName=localStorage.getItem("UserName");
    localStorage.setItem("TabStatusChange","True");
    this.ActivatedRoute=localStorage.getItem("ActivatedRoute");
   }
   getAnimationData(outlet: RouterOutlet) {

    debugger;
    return outlet && outlet.activatedRouteData;
  }


   ngDoCheck() {

    

var url=this.router.url;
     if(localStorage.getItem("TabStatusChange")=="True")
     {
      localStorage.setItem("TabStatusChange","False");
  try{
    this.ApplicationLivePages=  JSON.parse(localStorage.getItem("ApplicationLivePages"));

    this.ActivatedRoute=localStorage.getItem("ActivatedRoute");
    }catch(e)
    {


    }

    this.ApplicationLivePages=this.ApplicationLivePages==null?[]:this.ApplicationLivePages;
     }
//      else{
//       if (url.search('MenuPages') == -1 ) { 

      
//       var ApplicationLivePagesLocal=  JSON.parse(localStorage.getItem("ApplicationLivePages"));
//       var ActivatedRouteLocal=localStorage.getItem("ActivatedRoute");

// if(ApplicationLivePagesLocal!=null &&  ApplicationLivePagesLocal.length>0  )
// {
//       for(let i=0;i<ApplicationLivePagesLocal.length;i++)
//       {
//       if(ApplicationLivePagesLocal[i]._IsActive==true)
//       {
//         ApplicationLivePagesLocal[i]._Url='.'+url;
// //this.ApplicationLivePages=ApplicationLivePagesLocal;

//         localStorage.setItem("ApplicationLivePages",JSON.stringify(ApplicationLivePagesLocal));
      
//         break;
//       }
//       }
//     }
    
//   }


//      }


    // /Sales/CreateCustomer
  
  }
   
  lastindexpage=-1
  PageClose(indx)
  {
  debugger;
    var IsselectedTrue=false;
        for(let i=0;i<this.ApplicationLivePages.length;i++)
        {
        
  
          if(indx==i)
          {
            IsselectedTrue=this.ApplicationLivePages[i]._IsActive;
          
            this.ApplicationLivePages.splice(indx, 1);
            
            break;
          }
        }
  
  
  
  if(IsselectedTrue)
  {
  
  if(this.ApplicationLivePages.length>0)
  {
    this.lastindexpage= this.ApplicationLivePages.length + (-1)
    this.ApplicationLivePages[this.ApplicationLivePages.length -1 ]._IsActive=true;
    localStorage.setItem("ApplicationLivePages",JSON.stringify(this.ApplicationLivePages));
    this.ActivatedRoute=this.ApplicationLivePages[this.ApplicationLivePages.length-1]._RouteName;
    localStorage.setItem("ActivatedRoute",this.ActivatedRoute);
    this.router.navigate(["./"]);
    if(this.ApplicationLivePages.length>0){
      var previouspagenavigate=this.ApplicationLivePages[this.lastindexpage]._Url;
      this.router.navigate([previouspagenavigate])
    }
   
  //this.router.navigate([this.ApplicationLivePages[this.ApplicationLivePages.length-1]._Url]);
  
  }else{
  
    localStorage.setItem("ApplicationLivePages",JSON.stringify(this.ApplicationLivePages));
    this.ActivatedRoute="";
    localStorage.setItem("ActivatedRoute","");
    this.router.navigate(["./"]);
  }
    
  }else{
  
    for(let i=0;i<this.ApplicationLivePages.length;i++)
    {
    if(this.ApplicationLivePages[i]._IsActive==true)
    {
      localStorage.setItem("ApplicationLivePages",JSON.stringify(this.ApplicationLivePages));
      this.router.navigate([this.ApplicationLivePages[i]._Url]);
      this.ActivatedRoute=this.ApplicationLivePages[i]._RouteName;
      localStorage.setItem("ActivatedRoute",this.ActivatedRoute);
      break;
    }
    }
  
  }
  
  }
       PageCloseClick(indx)
       {
  var that=this;
  
        (window as any).swal({
          icon: "warning",
          title: "Are you sure?",
          text:"Do you want's to close the page?",
       
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
          ],
          dangerMode: true,
        }).then(function(isConfirm) {
          
          if (isConfirm) {
      
             that.PageClose(indx);
            // window.close();
          }else {
           // (window as any). swal("Cancelled", "this record is safe:)", "error");
          }
      
      
        });
      
  
  
  
        
       }



      ResultPath(str):string
     {
debugger;

      return str.slice(1)
     }

     
    TabClick(indx)
    {
    
debugger;
var navUrl="";
this.ApplicationLivePages=  JSON.parse(localStorage.getItem("ApplicationLivePages"));
      for(let i=0;i<this.ApplicationLivePages.length;i++)
      {
      

        if(indx==i)
        {
          this.ApplicationLivePages[i]._IsActive=true;
          
          navUrl=this.ApplicationLivePages[i]._Url;
          this.ActivatedRoute=this.ApplicationLivePages[i]._RouteName;
          localStorage.setItem("ActivatedRoute",this.ActivatedRoute);

          this.router.navigate([navUrl]);
          //this.router.navigate( ['Sales', {outlets: {[this.ApplicationLivePages[i]._RouteName]: ['Customer']}}]  );
        }else
        {
        this.ApplicationLivePages[i]._IsActive=false;
        }
      
      }
      
      localStorage.setItem("ApplicationLivePages",JSON.stringify(this.ApplicationLivePages));
     // this.router.isActive(navUrl,true);
// this.router.navigate([navUrl]);
     //this.location.go(navUrl.slice(1));
     
    }


  LogOut()

  {
    this.AuthenticationService.logout();
    localStorage.clear();
    this.ActivatedRoute="";
  localStorage.setItem("ActivatedRoute","");
    this.router.navigate(['/Login']);
  // this.SessionKill();
  }
  oberserableTimer() {
    
   const source = timer(1000, 2000);
   const abc = source.subscribe(val => {
     const worker = new Worker(`../erpweb-worker.worker`, { type: `module` });
     
     worker.onmessage = ({ data }) => {
      // this.getLog();
     };


     worker.postMessage('hello');

   });
 }



 lstLog:any=[];
 lstDbResult:any  = [];
 getLog()
 {

   this.APICall.DBCalling("GetLogInfo","","","","").subscribe(
     (res:Response) => {

     
       this.lstDbResult= (res);
       this.lstLog=null;
       if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
       {
         this.lstLog=this.lstDbResult.tasks[0];
    
   
 

         
      
       }
     });
   
 }

lstNotification=[];
 getItemNotification()
 {

   this.APICall.DBCalling("ShowNotifications","","","","").subscribe(
     (res:Response) => {
debugger;
      this.lstNotification=[];
       this.lstDbResult= (res);
       
      // var res1 = ((this.lstDbResult).replace(/\n/g, "")).replace(/'/g, "\"");
       var lst = JSON.parse(this.lstDbResult.Message);
      
this.lstNotification=lst.Table;
this.StoreNotification.lstPINotification=this.lstNotification;
      //  if(this.lstDbResult.tasks.length>0 && this.lstDbResult.tasks[0].length>0 )
      //  {
      //    this.lstNotification=this.lstDbResult.tasks[0];
      
      //  }
     });
   
 }

 ShowAllNotifications()
 {
   try{
   debugger;   
   this.APICall.SetViewData(this.StoreNotification);
   var ActivatedRoute=localStorage.getItem("ActivatedRoute");
   this.StoreNotification.TabId=ActivatedRoute;
   this.store.dispatch(new  TabStore.AddTab(this.StoreNotification));  
    this.router.navigate(['./Common/Notifications']);
   }
   catch(error){}
 }

 LoadNotification(row)
 {
   try{
debugger;
 }
catch(error){}

}

 Menuclick(MenuName)
 {
 debugger;
 $('.canceldashboard').attr('id','content')
 localStorage.setItem("ActivatedRoute","");
 this.ActivatedRoute="";
  this.router.navigate(['/MenuPages'], { queryParams: { MenuName:MenuName} });
this.SelectedModule=MenuName;

 }
 SelectedModule='Home';
 ngOnInit() {
debugger;
this.StoreNotification=new StoreNotification();
this.FormList = JSON.parse(localStorage.getItem('Menu'));

this.lstMenu = this.FormList.filter((thing, i, arr) => {
 return arr.indexOf(arr.find(t => t.MenuName === thing.MenuName)) === i;
});

this.getItemNotification();

// this.lstSubMenu = this.FormList.filter((thing, i, arr) => {
//  return arr.indexOf(arr.find(t => (t.SubMenuName === thing.SubMenuName && t.MenuName === thing.MenuName ))) === i;
// });

 }
//  /lstSubMenu:any  = [];
 lstMenu:any  = [];
 FormList:any  = [];


 MenuClick(Path)
 {
   debugger;
   this.router.navigate([Path]);
 }


  ApplicationLivePages:any=[];
 


 ngAfterViewInit(){
debugger;
  $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  $("form :input").attr("autocomplete", "off");
  //this.TabFunctionolity();
   !<any>function(s)
   {var n=s(window),o=s("body");
   (window as any).Waves.init({duration:300}),(window as any).Waves.attach(".btn:not(.btn-badge)",["waves-button","waves-light"]),(window as any).feather.replace(),(<any>s).createOverlay=function(){s(".overlay").length<1?(o.addClass("no-scroll").append('<div class="overlay"></div>'),s(".overlay").addClass("show")):s(".overlay").remove()},s('.dropdown-menu a[data-toggle="dropdown"]').on("click",
   function(e){return s(this).next().hasClass("show")||s(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),
   s(this).next(".dropdown-menu").toggleClass("show"),s(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",function(e){s(".dropdown-submenu .show").removeClass("show")}),!1}),s("[data-backround-image]").each(function(e){s(this).css("background","url("+s(this).data("backround-image")+")")}),
   n.on("load",function(){s(".page-loader").fadeOut(700,function(){setTimeout(
       function(){
         (window as any).toastr.options={timeOut:3e3,progressBar:!0,showMethod:"slideDown",hideMethod:"slideUp",showDuration:200,hideDuration:200},
         (window as any).toastr.success("Welcome! "+localStorage.getItem("UserName")+".")
       },1e3)})}),n.on("load",function(){setTimeout(function(){s(".side-menu .side-menu-body ul li a").each(function(){var e=s(this);e.next("ul").length&&(o.hasClass("horizontal-side-menu")?(e.append('<i class="sub-menu-arrow ti-angle-right"></i>'),s(".side-menu .side-menu-body > ul > li > a > .sub-menu-arrow").removeClass("ti-angle-right").addClass("ti-angle-down")):e.append('<i class="sub-menu-arrow ti-plus"></i>'))}),s(".side-menu .side-menu-body ul li.open>a>.sub-menu-arrow").removeClass("ti-plus").addClass("ti-minus").addClass("rotate-in")},200)}),s(document).on("click",".sidebar-open",function(){return (window as any).s('[data-toggle="dropdown"]').dropdown("hide"),s(".sidebar").toggleClass("show"),

       (<any>s).createOverlay(),!1}),s(document).on("click","*",function(e)
       {(!s(e.target).is(".sidebar, .sidebar *, .sidebar-open, .sidebar-open *")&&s(".sidebar").hasClass("show")
       ||!s(e.target).is(".search-panel-open, .search-panel-open *, nav.navbar .header-body form.search, nav.navbar .header-body form.search *")
       &&s("nav.navbar .header-body form.search").hasClass("show")||!s(e.target).is
       (".side-menu-open, .side-menu-open *, .side-menu, .side-menu *")&&s
       (".side-menu").hasClass("show"))&&(s(".sidebar").removeClass("show"),s
       ("nav.navbar .header-body form.search").removeClass("show"),s(".side-menu")
       .removeClass("show"),o.removeClass("no-scroll"),s(".overlay").remove())}),
       s(document).on("click",".search-panel-open",function(){return s("nav.navbar form.search")
       .addClass("show").find("input:first").focus(),(<any>s).createOverlay(),!1}),s(document).
       on("click",".side-menu-open",function(){return (window as any).s('[data-toggle="dropdown"]')
       .dropdown("hide"),s(".side-menu").addClass("show"),(<any>s).createOverlay(),!1})
       ,window.addEventListener("load",function(){var e=document.getElementsByClassName
        ("needs-validation");Array.prototype.filter.call(e,function(a){a.addEventListener("submit",function(e){!1===a.checkValidity()&&(e.preventDefault(),e.stopPropagation()),a.classList.add("was-validated")},!1)})},!1);var e=s(".table-responsive-stack");function a(){n.width()<768?s(".table-responsive-stack").each(function(e){s(this).find(".table-responsive-stack-thead").show(),s(this).find("thead").hide()}):s(".table-responsive-stack").each(function(e){s(this).find(".table-responsive-stack-thead").hide(),s(this).find("thead").show()})}e.find("th").each(function(e){s(".table-responsive-stack td:nth-child("+(e+1)+")").prepend('<span class="table-responsive-stack-thead">'+s(this).text()+":</span> "),s(".table-responsive-stack-thead").hide()}),e.each(function(){var e=100/s(this).find("th").length+"%";s(this).find("th, td").css("flex-basis",e)}),a(),(<any>d)(),window.onresize=function(e){a(),d("resize")},s(document).on("click",".accordion.custom-accordion .accordion-row a.accordion-header",function(){var e=s(this);return e.closest(".accordion.custom-accordion").find(".accordion-row").not(e.parent()).removeClass("open"),e.parent(".accordion-row").toggleClass("open"),!1});var t,i=s(".table-responsive");function d(e){"resize"==(e=e||"")?(768<=n.width()&&(window as any).s(".card-scroll").getNiceScroll().resize(),(!o.hasClass("horizontal-side-menu")&&992<=n.width()||o.hasClass("horizontal-side-menu")&&n.width()<992)&&768<=n.width()&&(window as any).s(".side-menu>div>ul").getNiceScroll().resize(),s(".card").each(function(){if(768<=n.width()){var e=s(this).find(".card-scroll");e.length&&(window as any).e.getNiceScroll().resize()}}),s(".sidebar .tab-content .tab-pane").each(function(){768<=n.width()&&(window as any).s(this).find(".tab-pane-body").getNiceScroll().resize()}),s(".dropdown-menu").each(function(){void 0!==s(".dropdown-menu-body",this)[0]&&768<=n.width()&&(window as any).s(".dropdown-menu-body",this).getNiceScroll().resize()}),768<=n.width()&&(s(".chat-app .chat-sidebar .chat-sidebar-messages")[0]&&(window as any).s(".chat-app .chat-sidebar .chat-sidebar-messages").getNiceScroll().resize(),s(".chat-app .chat-body .chat-body-messages")[0]&&(window as any).s(".chat-app .chat-body .chat-body-messages").getNiceScroll().resize())):(768<=n.width()&&((window as any).s(".card-scroll").niceScroll(),(window as any).s(".table-responsive").niceScroll()),(!o.hasClass("horizontal-side-menu")&&992<=n.width()||o.hasClass("horizontal-side-menu")&&n.width()<992)&&n.on("load",function(){!o.hasClass("horizontal-side-menu")&&!o.hasClass("icon-side-menu")&&768<=n.width()&&(window as any).s(".side-menu>div>ul").niceScroll()}),s(".card").each(function(){if(768<=n.width()){var e=s(this).find(".card-scroll");e.length&&(window as any).e.niceScroll()}}),s(".sidebar .tab-content .tab-pane").each(function(){768<=n.width()&&(window as any).s(this).find(".tab-pane-body").niceScroll()}),s(".dropdown-menu").each(function(){void 0!==s(".dropdown-menu-body",this)[0]&&768<=n.width()&&(window as any).s(".dropdown-menu-body",this).niceScroll()}),768<=n.width()&&(s(".chat-app .chat-sidebar .chat-sidebar-messages")[0]&&(window as any).s(".chat-app .chat-sidebar .chat-sidebar-messages").scrollTop((window as any).s(".chat-app .chat-sidebar .chat-sidebar-messages").get(0).scrollHeight,-1 ).niceScroll(),s(".chat-app .chat-body .chat-body-messages")[0]&&(window as any).s(".chat-app .chat-body .chat-body-messages").scrollTop(s(".chat-app .chat-body .chat-body-messages").get(0).scrollHeight,-1).niceScroll()))}if(i.on("show.bs.dropdown",function(e){t=s(e.target).find(".dropdown-menu"),o.append(t.detach());var a=s(e.target).offset();t.css({display:"block",top:a.top+s(e.target).outerHeight(),left:a.left,width:"184px","font-size":"14px"}),t.addClass("mobPosDropdown")}),i.on("hide.bs.dropdown",function(e){s(e.target).append(t.detach()),t.hide()}),s(document).on("click",".chat-app-wrapper .btn-chat-sidebar-open",function(){return s(".chat-app-wrapper .chat-sidebar").addClass("chat-sidebar-opened"),!1}),s(document).on("click","*",function(e){s(e.target).is(".chat-app-wrapper .chat-sidebar, .chat-app-wrapper .chat-sidebar *, .chat-app-wrapper .btn-chat-sidebar-open, .chat-app-wrapper .btn-chat-sidebar-open *")||s(".chat-app-wrapper .chat-sidebar").removeClass("chat-sidebar-opened")}),s(document).on("click",".side-menu ul li a",function(){var e=s(this);if(e.next("ul").length){var a=e.find(".sub-menu-arrow");return a.toggleClass("rotate-in"),e.next("ul").toggle(200),e.parent("li").siblings().find("ul").not(e.parent("li").find("ul")).slideUp(200),e.next("ul").find("li ul").slideUp(200),e.next("ul").find("li>a").find(".sub-menu-arrow").removeClass("ti-minus").addClass("ti-plus"),e.next("ul").find("li>a").find(".sub-menu-arrow").removeClass("rotate-in"),e.parent("li").siblings().not(e.parent("li").find("ul")).find(">a").find(".sub-menu-arrow").removeClass("ti-minus").addClass("ti-plus"),e.parent("li").siblings().not(e.parent("li").find("ul")).find(">a").find(".sub-menu-arrow").removeClass("rotate-in"),a.hasClass("rotate-in")?setTimeout(function(){a.removeClass("ti-plus").addClass("ti-minus")},200):a.removeClass("ti-minus").addClass("ti-plus"),!o.hasClass("horizontal-side-menu")&&768<=n.width()&&setTimeout(function(e){(window as any).s(".side-menu>div>ul").getNiceScroll().resize()},300),!1}}),s("body.icon-side-menu .side-menu").hover(function(e){},function(e){e.stopPropagation(),s(".side-menu ul").removeAttr("style"),s(".side-menu ul li").not(".open").find(">a>.sub-menu-arrow").removeClass("rotate-in").removeClass("ti-minus").addClass("ti-plus")}),s(document).on("click",".dropdown-menu",function(e){e.stopPropagation()}),s("#exampleModal").on("show.bs.modal",function(e){var a=s((window as any).e.relatedTarget).data("whatever"),n=s(this);n.find(".modal-title").text("New message to "+a),n.find(".modal-body input").val(a)}),(window as any).s('[data-toggle="tooltip"]').tooltip(),(window as any).s('[data-toggle="popover"]').popover(),(window as any).s(".carousel").carousel(),o.hasClass("icon-side-menu")&&s(".side-menu").hover(function(e){s(".side-menu").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(e){(window as any).s(".side-menu>div>ul").niceScroll()})}),"object"==typeof (window as any).CKEDITOR &&s("body").hasClass("dark")){var r=s(".card").css("background-color"),c=s("body").css("color");
       (window as any).CKEDITOR.on("instanceReady",function(e){s("iframe.cke_wysiwyg_frame").each(function(e){var a=s(this)[0],n=(window as any).a.contentDocument||(<any>a).contentWindow.document;n.body.style.backgroundColor=r,n.body.style.color=c})})}}(jQuery);

   var that =this;
   $("#txtSearchMenu").on("change paste keyup", function() {
    // alert($(this).val()); 
let searchval:string ;


searchval=$(this).val().toString();
    var FList = JSON.parse(localStorage.getItem('Menu'));
if(searchval!="")
{


    that.FormList= FList.filter((thing, i, arr) => {
     debugger;
     return arr.indexOf(arr.find(t => ((t.Title.toLowerCase( )).search((searchval.toLowerCase( )))!=-1) && t.Title===thing.Title  )) === i;
   });


 }else{
   that.FormList =FList;

 }
 debugger;
    that.lstMenu = that.FormList.filter((thing, i, arr) => {
       return arr.indexOf(arr.find(t => t.MenuName === thing.MenuName)) === i;
     });
     
    //  that.lstSubMenu = that.FormList.filter((thing, i, arr) => {
    //    return arr.indexOf(arr.find(t => (t.SubMenuName === thing.SubMenuName && t.MenuName === thing.MenuName ))) === i;
    //  });

  });

//alert($(window).width());
   if($(window).width() < 767)
   {
     localStorage.setItem('DeviceType',"Mobile")
   }
   else{
     localStorage.setItem('DeviceType',"PC")
   }
   $( window ).resize(function() {

     
     if($(window).width() < 767)
   {
     localStorage.setItem('DeviceType',"Mobile")
   }
   else{
     localStorage.setItem('DeviceType',"PC")
   }
   });
  this.oberserableTimer();
 }



}

