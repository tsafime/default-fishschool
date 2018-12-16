import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/authentication.service';
import {ToastSupport} from '../models/fishschool/toast.support';

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private injector: Injector) {
	}

	// Intercept request and add token
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

	private handleAuthError(err: HttpErrorResponse): Observable<any> {

		// Handle your auth error or rethrow
		if (err.status === 401 || err.status === 403) {
			this.injector.get(AuthenticationService).logout(true);
			this.injector.get(ToastSupport).showError({message: err.error.code + ': ' + err.error.message, type: 'danger'});
			this.injector.get(Router).navigateByUrl(`/login`);
		}

		return throwError(err);
	}
}
