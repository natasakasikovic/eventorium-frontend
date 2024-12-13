import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request.model';
import { Invitation } from '../model/invitation-request.model';

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent {

  emailForm: FormGroup;
  invitations: Invitation[] = [];

  constructor(private fb: FormBuilder, private service: EventService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addInvitation() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      const invitation: Invitation = { email }; 
      this.invitations.push(invitation); 
      this.emailForm.reset();
    } 
  }

  removeInvitation(index: number) {
    this.invitations.splice(index, 1);
  }

  sendInvitations() {
    const eventData: Partial<CreateEventRequestDto> = {
      invitations : this.invitations
    }
    this.service.updateEvent(eventData)
    this.service.createEvent().subscribe({
      next: (response) => {
        console.log("Successfully created:", response);
      },
      error: (err) => {
        console.error("Error while creating event:", err);
      }
    })
  }
}