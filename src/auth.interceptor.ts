import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = 
(req:HttpRequest<any>,next:HttpHandlerFn) => {
    const cloned: HttpRequest<unknown> = req.clone(
        {
            setHeaders:{
                'Content-Type': 'application/json'
            },
            withCredentials: true, 
        }
    )

    return next(cloned)
}