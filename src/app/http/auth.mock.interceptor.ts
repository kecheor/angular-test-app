import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { of } from "rxjs";


export default function authMockInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    if (request.url.includes('auth/login')) {
        const { password} = request.body;

        if(password.length < 6) {
            return of(new HttpResponse({
                status: 403,
                
            }));
        } else {
            return of(new HttpResponse({
                status: 200,
                body: {
                    token: '1234567890',
                    expiresIn: 3600
                }
            }));
        }
    }
    return next(request);
}
