import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor:HttpInterceptorFn = (req, next) =>{
    // Get the token from local storage
    const token = localStorage.getItem('token');
if(token){
}
    // Clone the request and attach the token to the headers if available
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  
};
