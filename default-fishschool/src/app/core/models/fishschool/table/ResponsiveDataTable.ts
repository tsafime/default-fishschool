import {MatTableDataSource} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {EventEmitter} from '@angular/core';

export class ResponsiveDataTable<T> extends MatTableDataSource<T> {

	constructor(public data: T[], private dataReady: EventEmitter<boolean>) {
		super(data);
	}

	connect(): BehaviorSubject<T[]> {
		return super.connect();
	}

	disconnect(): void {
		this.dataReady.emit(true);
		super.disconnect();
	}
}
