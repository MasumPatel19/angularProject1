
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-stud-add-edit',
  templateUrl: './stud-add-edit.component.html',
  styleUrls: ['./stud-add-edit.component.css']
})
export class StudAddEditComponent implements OnInit {

  studForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private studService: StudentService, private dialogRef: MatDialogRef<StudAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.studForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      address: '',
      year: ''

    })
  }
  ngOnInit(): void {
    this.studForm.patchValue(this.data);
  }

  year: string[] = [
    '1st Year',
    '2nd Year',
    '3rd Year'
  ];


  onSubmit() {
    if (this.studForm.valid) {
      if (this.data) {
        // console.log(this.studForm.value);
        this.studService.updateStudent(this.data.id, this.studForm.value).subscribe({
          next: (val: any) => {
            alert('Student record updated successfully.');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
      else {
        // console.log(this.studForm.value);
        this.studService.addStudent(this.studForm.value).subscribe({
          next: (val: any) => {
            alert('Student record added successfully.');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }

    }
  }


}
