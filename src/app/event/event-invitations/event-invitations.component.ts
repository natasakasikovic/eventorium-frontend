import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent {

  emailForm: FormGroup;
  submittedEmails: string[] = [];

  constructor(private fb: FormBuilder, private service: EventService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      this.submittedEmails.push(email); 
      this.emailForm.reset();
    } 
  }

  removeEmail(index: number) {
    this.submittedEmails.splice(index, 1);  }

  submitEmails() {
    // this.service.updateEvent(this.submittedEmails)
  }

}