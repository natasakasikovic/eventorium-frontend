import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request.model';
import { Invitation } from '../model/invitation-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MESSAGES } from '../../shared/constants/messages';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent implements OnInit {

  id: number | null
  emailForm: FormGroup;
  invitations: Invitation[] = [];

  constructor(private fb: FormBuilder,
              private service: EventService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
      this.loadParams()
  }

  loadParams(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
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

    showMessage(title: string, message: string) : void {
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: title,
          message: message
        }
      })
    }

  sendInvitations() {
    this.service.sendInvitations(this.invitations, this.id).subscribe({
      next: (_) => {
        this.showMessage(MESSAGES.success, MESSAGES.eventCreated);
        this.router.navigate(['/events'])
      },
      error : (err) => {
        if (err.status == 500) {
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
        }
        // TODO: handle more errors
      }
    })
  }
} 