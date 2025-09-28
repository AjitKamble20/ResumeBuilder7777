
import { Component } from '@angular/core';
import { ResumeService } from '../../core/resume.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss'
})
export class ResumeFormComponent {
 employees: any[] = [];
  experiences: any[] = [];
  education: any[] = [];
  showPreview = false;  // controls modal visibility
    constructor(private employeeService: ResumeService) {}
  ngOnInit(): void {
    debugger
    //this.getEmployeeList();
  }
 step = 1;
  toasts: { message: string; type: 'success' | 'error' }[] = [];
  // personal info
  personalInfo = {
    fullName: '',
    email: '',
    phone: '',
    summary: ''
  };

  // Toast helper
  showToast(message: string, type: 'success' | 'error' = 'error') {
    this.toasts.push({ message, type });
    const index = this.toasts.length - 1;
    setTimeout(() => this.closeToast(index), 3000);
  }

  closeToast(index: number) {
    this.toasts.splice(index, 1);
  }
  // Step navigation
  nextStep() {
    debugger;
        if (this.step === 1) {
      if (!this.personalInfo.fullName || !this.personalInfo.email || !this.personalInfo.phone || !this.personalInfo.summary) {
        this.showToast('All Personal Info fields are required');
        return;
      }
    }
      if(this.step === 2) {
         if (this.experiences.length === 0) {
        this.showToast('Please add at least one experience');
        return;
      }
       const invalid = this.experiences.some(exp =>
        !exp.company || !exp.role || !exp.start || !exp.end || !exp.description
      );
      if (invalid) {
        this.showToast('All Experience fields are required');
        return;
      }
  }
   if (this.step < 3) {
      this.step++;
    }
}
Finish(){

         if (this.education.length === 0) {
        this.showToast('Please add at least one education');
        return;
      }
       const invalid = this.education.some(edu =>
        !edu.school || !edu.degree || !edu.start || !edu.end || !edu.description
      );
      if (invalid) {
        this.showToast('All Education fields are required');
        return;
      }
    
   
}
  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  // Experience methods
  addExperience() {
    this.experiences.push({
      company: '',
      role: '',
      start: '',
      end: '',
      description: ''
    });
  }

  removeExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  // Education methods
  addEducation() {
    this.education.push({
      school: '',
      degree: '',
      start: '',
      end: '',
      description: ''
    });
  }

  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  togglePreview() {
  this.showPreview = !this.showPreview;
}

 //PDF export with multipage support
  downloadPDF() {
    const element = document.querySelector('.resume-preview') as HTMLElement;
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('resume.pdf');
    });
  }


}
