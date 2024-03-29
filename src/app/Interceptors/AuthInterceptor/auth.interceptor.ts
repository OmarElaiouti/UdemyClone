import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptor = {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Clone the request and attach the token to the headers if available
    if (token) {
      request = request.clone({
        setHeaders: {
          token: `${token}`
        }
      });
    }

    return next.handle(request);
  }
};
