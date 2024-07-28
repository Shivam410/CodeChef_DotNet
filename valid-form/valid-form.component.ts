import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-valid-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './valid-form.component.html',
  styleUrls: ['./valid-form.component.css']
})
export class ValidFormComponent {
  dob: string = '';
  age: number = 0;

  calculateAge(userForm: NgForm) {
    const dobControl = userForm.controls['dob'];
    if (dobControl) {
      const birthDate = new Date(dobControl.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    }
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      const { firstName, userName, email, password, confirmPassword, dob, mobileNo, gender } = userForm.value;
  
      // Your validation and processing logic
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!/^\d{10}$/.test(mobileNo)) {
        alert('Mobile number should be 10 digits');
        return;
      }
      if (this.age > 100) {
        alert('Age should not be more than 100');
        return;
      }
      if (userForm.controls['email']?.errors?.['email']) {
        alert('Please enter a valid email address.');
        return;
      }
  
      alert('Form submitted successfully');
      console.log('Form Data:', {
        firstName,
        userName,
        email,
        password,
        mobileNo,
        dob,
        age: this.age,
        gender
        
      });
    }
  }
  
}
