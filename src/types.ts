export declare type Predicate<T = any> = (...args: T[]) => boolean;

export declare interface Day {
	id: number;
	name:string,
	date: number;
	month: number;
	week: number;
	offmonth: boolean;
	today: boolean;
	disabled: boolean;
	weekend: boolean;
	selected: boolean;
}

export declare type Week = Day[];

export interface Month {
  number:number
  current:boolean
  selected:boolean
  disabled:boolean
  name:string
	weeks?: Week[];
}

export declare type Year = Month[];
