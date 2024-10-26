import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService) {  
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthHeader(req)).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    // Handle successful responses
                    console.log("Response received:", event.body);
                }
            }, error => {
                // Handle errors
                console.error("Error occurred:", error);
            })
        );
    }

    private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.login.getToken();
        if (token) {
            return request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        return request;
    }
}

// Export providers as before
export const AuthInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];
