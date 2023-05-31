import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';
import { StudAddEditComponent } from '../stud-add-edit/stud-add-edit.component';
// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'year', 'address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private studService: StudentService) { }

  ngOnInit(): void {
    this.getStudent();
  }

  addEditStudent() {
    const dialogRef = this.dialog.open(StudAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getStudent();
        }
      }
    });
  }

  getStudent() {
    this.studService.getStudent().subscribe({
      next: (val: any) => {
        // console.log(val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      // error:(err : any)=>{
      //   console.error(err);
      // }
      error: console.log
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number) {
    this.studService.deleteStudent(id).subscribe({
      next: (val: any) => {
        alert("Student record deleted successfully.");
        this.getStudent();
       },
      error: console.log
    });
  }

  editStudent(data:any){
    const dialogRef = this.dialog.open(StudAddEditComponent,{data,
    });

    // const dialogRef = this.dialog.open(StudAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getStudent();
        }
      }
    });

  }

}
