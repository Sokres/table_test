export interface DataInfo {
	id: string;
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
}

export interface Data {
	error_code: number;
	error_message: string;
	data: DataInfo[];
	profiling?: unknown;
	timingsts?: unknown;
}
