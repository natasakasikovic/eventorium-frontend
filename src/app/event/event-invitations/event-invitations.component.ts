import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request.model';
import { Invitation } from '../model/invitation-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent {

  emailForm: FormGroup;
  invitations: Invitation[] = [];

  constructor(private fb: FormBuilder, private service: EventService, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addInvitation() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      
      if (this.emailAlreadyExists(email)) {
        this.emailForm.get('email')?.setErrors({ emailExists: true });
      } else {
        this.invitations.push({ email });
        this.emailForm.reset();
      }
    }
  }

  private emailAlreadyExists(email: string): boolean {
    return this.invitations.some(invitation => invitation.email === email);
  }

  removeInvitation(index: number) {
    this.invitations.splice(index, 1);
  }

  sendInvitations() {
    // TODO: implement
  }
}