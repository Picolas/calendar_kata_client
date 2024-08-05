export interface FormatMap {
	[index: string]: string | undefined;

	dd: string;
	d: string;
	mm: string;
	m: string;
	yyyy: string;
	MMMM: string;
	ddd: string;
	dddd: string;
}

export type PartialFormatMap = Partial<FormatMap>
