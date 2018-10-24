import {Injectable} from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {

	// Intercept request and add token
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({
			setHeaders: {
				Authorization: `${localStorage.getItem('token')}`,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});

		return next.handle(request).pipe();

		// Just for debug do NOT open it will prevent user see errors
		// return next.handle(request).pipe(
		// 	tap(event => {
		// 			if (event instanceof HttpResponse) {
		// 				console.log('Event status: ' + event.status);
		// 			}
		// 		},
		// 		error => {
		// 			// http response status code
		// 			console.error('Error status: ' + error.status);
		// 			console.error('Error message: ' + error.message);
		// 		}
		// 	)
		// );
	}
}
