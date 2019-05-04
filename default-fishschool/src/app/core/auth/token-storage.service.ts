import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {
	/**
	 * Get access token
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		const token: string = <string>localStorage.getItem('token');
		return of(token);
	}

	/**
	 * Get refresh token
	 * @returns {Observable<string>}
	 */
	public getRefreshToken(): Observable<string> {
		const token: string = <string>localStorage.getItem('refreshToken');
		return of(token);
	}

	/**
	 * Get user roles in JSON string
	 * @returns {Observable<any>}
	 */
	public getUserRole(): Observable<string> {
		const role = localStorage.getItem('userRole');
		return of(role);
	}

	public getUserName(): Observable<string> {
		const username = localStorage.getItem('username');
		return of(username);
	}

	/**
	 * Set access token
	 * @returns {TokenStorage}
	 */
	public setAccessToken(token: string): TokenStorage {
		localStorage.setItem('token', token);

		return this;
	}

	/**
	 * Set refresh token
	 * @returns {TokenStorage}
	 */
	public setRefreshToken(token: string): TokenStorage {
		localStorage.setItem('refreshToken', token);

		return this;
	}

	/**
	 * Set user role
	 * @param role
	 * @returns {TokenStorage}
	 */
	public setUserRole(role: string): any {
		if (role != null) {
			localStorage.setItem('userRole', role);
		}

		return this;
	}

	public setUserName(name: string): any {
		if (name != null) {
			localStorage.setItem('username', name);
		}

		return this;
	}

	/**
	 * Remove tokens
	 */
	public clear() {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userRole');
		localStorage.removeItem('username');
	}
}
