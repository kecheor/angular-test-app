import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { of } from "rxjs";


export default function authMockInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    if (request.url.includes('notes')) {
        console.log("Notes interceptor", request.url);
        if (/\d/.test(request.body.title)) {
            console.log("Notes intercept error");
            return of(new HttpResponse({
                status: 403,
                statusText: 'Forbidden',
                body: { error: 'Title cannot contain numbers' }
            }));
        }
        console.log("Notes intercept ok");
        return of(new HttpResponse({
            status: 200,
            statusText: 'OK',
            body: request.body
        }));
    }
    return next(request);
}
