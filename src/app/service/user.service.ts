import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public api = environment.api;
  constructor(
    private HttpClient:HttpClient
  ) { }

  getTestimonials = () =>{
    return this.HttpClient.get(`${this.api}/get-testimonial`);
  }

  getBlogs = () =>{
    return this.HttpClient.get(`${this.api}/get-blogs`);
  }

  getCourse = (user_id:any) =>{
    return this.HttpClient.get(`${this.api}/course/${user_id}`);
  }

  getSingleCourse = (course_id:any, user_id:any) =>{
    return this.HttpClient.get(`${this.api}/get-single-course/${course_id}/${user_id}`);
  }

  getFreeLecturesCategories = () =>{
    return this.HttpClient.get(`${this.api}/free-lectures-categories`);
  }
  
  getFreeLecturesCategoryWise = (category_id:any) =>{
    return this.HttpClient.get(`${this.api}/free-lectures-categorywise/${category_id}`);
  }

  getLectureCategories = () =>{
    return this.HttpClient.get(`${this.api}/free-lectures-categories`);
  }

  getCourseByTopic = (topic_id:any, user_id:any) =>{
    return this.HttpClient.get(`${this.api}/get-course-by-topics/${topic_id}/${user_id}`);
  }

  userRegister = (userData:any) =>{
    return this.HttpClient.post(`${this.api}/user-register`, userData);
  }

  userLogin = (userData:any) =>{
    return this.HttpClient.post(`${this.api}/user-login`, userData);
  }

  emailVerifation = (email:any) =>{
    return this.HttpClient.get(`${this.api}/email-verification/${email}`);
  }

  verifyOtp = (formValue:any) =>{
    return this.HttpClient.post(`${this.api}/otp-verification`, formValue);
  }

  resetPassword = (formValue:any)=>{
    return this.HttpClient.post(`${this.api}/reset-password`, formValue);
  }

  userDetails = (user_id:any) =>{
    return this.HttpClient.get(`${this.api}/user-details/${user_id}`);
  }

  updateUser = (formValue:any) =>{
    return this.HttpClient.post(`${this.api}/update-user/${formValue.id}`, formValue);
  }

  buyCourse = (data:any) =>{
    return this.HttpClient.post(`${this.api}/buy-course`, data);
  }

  loginWithGmail = (data:any) =>{
    return this.HttpClient.post(`${this.api}/login-with-gmail`, data);
  }

  getAllCourse = () =>{
    return this.HttpClient.get(`${this.api}/get-all-course`);
  }

  getSingleBlog = (id:any) =>{
    return this.HttpClient.get(`${this.api}/get-single-blog/${id}`);
  }

  checkCoupon = (val:any) =>{
    return this.HttpClient.post(`${this.api}/check-coupon`, val);
  }

  getThreeBlogs = () =>{
    return this.HttpClient.get(`${this.api}/get-three-blogs`);
  }

  getPrice = () =>{
    return this.HttpClient.get(`${this.api}/get-price`);
  }

  getWorkshop = () =>{
    return this.HttpClient.get(`${this.api}/get-workshop`);
  }

  newsLetterUpdate = (formData:any) =>{
    return this.HttpClient.post(`${this.api}/update-newsletter`, formData);
  }

  submitReview = (formData:any) =>{
    return this.HttpClient.post(`${this.api}/submit-review`, formData);
  }

  getFellowship = () =>{
    return this.HttpClient.get(`${this.api}/get-fellowship`);
  }

  contactSubmit = (argument:any) =>{
    return this.HttpClient.post(`${this.api}/get-contact`, argument);
  }
}
