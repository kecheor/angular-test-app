import { HttpRequest, HttpResponse, HttpHandlerFn } from "@angular/common/http";
import { delay, of, tap } from "rxjs";


export default function delayInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    return next(request).pipe(tap(() => console.log("waiting", request.url)),delay(1000));
}
