import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'source'
})

export class SourcePipe implements PipeTransform {
	transform(value: any[], status: string): any {
		return (value || []).filter(val => val.status === status)
	}
}
