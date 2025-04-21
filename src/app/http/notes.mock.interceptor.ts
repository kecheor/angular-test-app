import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { of } from "rxjs";


export default function authMockInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    if (request.url.includes('notes')) {
        if (/\d/.test(request.body.title)) {
            return of(new HttpResponse({
                status: 403,
                statusText: 'Forbidden',
                body: { error: 'Title cannot contain numbers' }
            }));
        }
        return of(new HttpResponse({
            status: 200,
            statusText: 'OK',
            body: request.body
        }));
    }
    return next(request);
}
