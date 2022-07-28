import { NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { AboutComponent } from './component/about/about.component';
import { HttpClientModule } from "@angular/common/http";
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { PublicationComponent } from './component/publication/publication.component';
import { CourseComponent } from './component/course/course.component';
import { LearningComponent } from './component/learning/learning.component';
import { FreeLecturesComponent } from './component/free-lectures/free-lectures.component';
import { FreeLectureCategoryWiseComponent } from './component/free-lecture-category-wise/free-lecture-category-wise.component';
import { VideoComponent } from './component/video/video.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { OtpVerificationComponent } from './component/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { FacebookModule } from 'ngx-facebook';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { FellowshipComponent } from './component/fellowship/fellowship.component';
import { ServicesComponent } from './component/services/services.component';
import { SingleblogComponent } from './component/singleblog/singleblog.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { BlogSingleComponent } from './component/blog-single/blog-single.component';
import { TermComponent } from './component/term/term.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { WorkshopComponent } from './component/workshop/workshop.component';
import { WorkshopDetailsComponent } from './component/workshop-details/workshop-details.component';
import { PdfviewerComponent } from './component/pdfviewer/pdfviewer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MainComponent } from './component/main/main.component';

// import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig} from "ngx-ui-loader";

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   fgsType: "rectangle-bounce-party", 
//   fgsColor: "#ee501f",
//   bgsColor: "#ee501f",
//   pbColor: "#ee501f"
// };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    AboutComponent,
    TestimonialComponent,
    PublicationComponent,
    CourseComponent,
    LearningComponent,
    FreeLecturesComponent,
    FreeLectureCategoryWiseComponent,
    VideoComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EmailVerificationComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    CheckoutComponent,
    FellowshipComponent,
    ServicesComponent,
    SingleblogComponent,
    ContactUsComponent,
    BlogsComponent,
    BlogSingleComponent,
    TermComponent,
    PrivacyPolicyComponent,
    WorkshopComponent,
    WorkshopDetailsComponent,
    PdfviewerComponent,
    SafeHtmlPipe,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    // NgxUiLoaderRouterModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    // {provide : LocationStrategy , useClass: HashLocationStrategy},
    Title,Meta,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1069305499845-of2h6tscupv06bq3ug0s5emc5o2sonp5.apps.googleusercontent.com'
             // '1069305499845-of2h6tscupv06bq3ug0s5emc5o2sonp5.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
              // provider: new FacebookLoginProvider('2ea59f7406c0edd99c7f041e6b54bd1f')
              provider: new FacebookLoginProvider('515923213474539')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
