import {MatTableDataSource} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {EventEmitter} from '@angular/core';

export class ResponsiveDataTable<T> extends MatTableDataSource<T> {

	constructor(public data: T[], private dataReady: EventEmitter<boolean>) {
		super(data);
	}

	connect(): BehaviorSubject<T[]> {
		const connectSubject = super.connect();
		this.dataReady.emit(this.data && this.data.length > 0);
		return connectSubject;
	}

	disconnect(): void {
		super.disconnect();
	}
}
