import {Component,OnInit} from '@angular/core';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.scss']
}) 

export class EmployeeComponent implements OnInit {

  filteredData: any = [];
  departments: any = new Set();
  selectedDepartment: string = "none";
  booleanValue: any = false;
  count: number = 0;

  gridCols: any = [{
		field: 'id',
		header: 'Id',
		width: '25%',
		sortableColumn: false,
		order: ""
	}, {
		field: 'name',
		header: 'Name',
		width: '25%',
		sortableColumn: true,
		order: "asc"
	}, {
		field: 'department',
		header: 'Department',
		width: '25%',
		sortableColumn: false,
		order: ""
	}, {
		field: 'joining_date',
		header: 'Joining Date',
		width: '25%',
		sortableColumn: true,
		order: "asc"
	}];
 
  candidate_data: any = [{
		"id": 11,
		name: "Ash",
		"department": "Finance",
		"joining_date": this.formatDate('8/10/2016')
	}, {
		"id": 12,
		name: "John",
		"department": "HR",
		"joining_date": this.formatDate('18/1/2011')
	}, {
		"id": 13,
		name: "Zuri",
		"department": "Operations",
		"joining_date": this.formatDate('28/11/2019')
	}, {
		"id": 14,
		name: "Vish",
		"department": "Development",
		"joining_date": this.formatDate('7/7/2017')
	}, {
		"id": 15,
		name: "Barry",
		"department": "Operations",
		"joining_date": this.formatDate('19/8/2014')
	}, {
		"id": 16,
		name: "Ady",
		"department": "Finance",
		"joining_date": this.formatDate('5/10/2014')
	}, {
		"id": 17,
		name: "Gare",
		"department": "Development",
		"joining_date": this.formatDate('6/4/2014')
	}, {
		"id": 18,
		name: "Hola",
		"department": "Development",
		"joining_date": this.formatDate('8/12/2010')
	}, {
		"id": 19,
		name: "Ola",
		"department": "HR",
		"joining_date": this.formatDate('7/5/2011')
	}, {
		"id": 20,
		name: "Kim",
		"department": "Finance",
		"joining_date": this.formatDate('20/10/2010')
	}];

	constructor() {}

	ngOnInit(): void {
		this.filteredData = this.candidate_data;
		for (let i = 0; i < this.candidate_data.length; i++) {
			this.departments.add(this.candidate_data[i].department);
		}
	}

	searchByName(e:any) {
		this.filteredData = [];
		if (e.target.value != null && e.target.value != "" && e.target.value != undefined) 
    this.filteredData = this.candidate_data.filter(((obj: { name: string; }) => obj.name.toLowerCase().includes(e.target.value.toLowerCase())));
		else this.filteredData = this.candidate_data;
	}

	formatDate(dateString:string) {
		var dateParts = dateString.split("/");
		var dateObject = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
    return dateObject;
	}

	sort(colName:string, boolean:boolean) {
		if (colName == "name" || colName == "joining_date") {
			if (boolean == true) {
				this.filteredData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0) 
        this.booleanValue = !this.booleanValue;
			} else {
				this.filteredData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0) 
        this.booleanValue = !this.booleanValue;
			}
		}
	}

	deleteDevelopemntCandidates() {
		this.filteredData = this.candidate_data.filter((obj: { department: string; }) => obj.department != 'Development');
	}

	getCandidatesOfExp2yrs() {
		this.filteredData = this.candidate_data.filter((obj: { joining_date: number; }) => Math.abs(new Date(Date.now() - obj.joining_date).getUTCFullYear() - 1970) >= 2);
	}

	getSelectedData(e: any) {
		console.log(this.selectedDepartment);
		if (this.selectedDepartment != "none") {
			this.filteredData = this.candidate_data.filter((obj: { department: string; }) => obj.department == this.selectedDepartment);
			this.count = this.filteredData.length;
		} else this.filteredData = this.candidate_data;
	}
}