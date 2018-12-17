import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private injector: Injector) {
	}

	// Intercept HTTP requests and add auth token, on error 401, 403 redirect to login page
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({
			setHeaders: {
				Authorization: `${localStorage.getItem('token')}`,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});

		return next.handle(request).pipe(
			tap(event => {},
				error => {
					this.handleAuthError(error);
				}
			)
		);
	}

	private handleAuthError(response: HttpErrorResponse): Observable<any> {

		if (response.status === 401 || response.status === 403) {
			this.injector.get(AuthenticationService).logout(true);
			// this.injector.get(ToastSupport).showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			this.injector.get(Router).navigateByUrl(`/login`);
		}

		return throwError(response);
	}
}
