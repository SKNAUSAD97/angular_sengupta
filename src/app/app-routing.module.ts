import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { BlogSingleComponent } from './component/blog-single/blog-single.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CourseComponent } from './component/course/course.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { FellowshipComponent } from './component/fellowship/fellowship.component';
import { FreeLectureCategoryWiseComponent } from './component/free-lecture-category-wise/free-lecture-category-wise.component';
import { FreeLecturesComponent } from './component/free-lectures/free-lectures.component';
import { HomeComponent } from './component/home/home.component';
import { LearningComponent } from './component/learning/learning.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { OtpVerificationComponent } from './component/otp-verification/otp-verification.component';
import { PdfviewerComponent } from './component/pdfviewer/pdfviewer.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { PublicationComponent } from './component/publication/publication.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ServicesComponent } from './component/services/services.component';
import { TermComponent } from './component/term/term.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { VideoComponent } from './component/video/video.component';
import { WorkshopComponent } from './component/workshop/workshop.component';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'home',
    component:MainComponent,
  },
  {
    path:'about',
    component:AboutComponent,
  },
  {
    path:'testimonial',
    component:TestimonialComponent,
  },
  {
    path:'publication',
    component:PublicationComponent,
  },
  {
    path:'dummyroute',
    component: CourseComponent,
  },
  {
    path:'course/:id/:user_id',
    component:CourseComponent,
  },
  {
    path:'course',
    component:LearningComponent,
  },
  {
    path:'free-lectures',
    component:FreeLecturesComponent,
  },
  {
    path:'dummyroutelecture',
    component:FreeLectureCategoryWiseComponent,
  },
  {
    path:'free-lectures-categorywise/:id',
    component:FreeLectureCategoryWiseComponent,
  },
  {
    path:'play-video/:id',
    component:VideoComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'email-verification',
    component:EmailVerificationComponent,
  },
  {
    path:'otp-verification/:user_id',
    component:OtpVerificationComponent,
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent,
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'service',
    component:ServicesComponent,
  },
  {
    path:'fellowship',
    component:FellowshipComponent,
  },
  {
    path:'blog/:id/:name',
    component:BlogSingleComponent,
  },
  {
    path:'contact-us',
    component:ContactUsComponent,
  },
  {
    path:'blogs',
    component:BlogsComponent,
  },
  {
    path:'term-condition',
    component:TermComponent,
  },
  {
    path:'workshop',
    component:WorkshopComponent,
  },
  {
    path:'privacy-policy',
    component:PrivacyPolicyComponent,
  },
  {
    path:'ppt-viewer',
    component:PdfviewerComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
