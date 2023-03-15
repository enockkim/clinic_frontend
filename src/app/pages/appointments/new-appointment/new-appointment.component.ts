import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
  template: 'passed in {{ data.action_type }}',
})

export class NewAppointmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {action_type: number}) { 
  }


  title: string;
  description: string;
  button: string;

  ngOnInit(): void {

    switch(this.data.action_type){
      case 1:
        this.title = "Edit Appointment";
        this.description = "Fill the following form to edit an appointment.";
        this.button = "Update";
        break;
      case 2:
        this.title = "Transfer Appointment";
        this.description = "Confirm details befor transfering appointment.";
        this.button = "Transfer"
        break;
      default:        
        this.title = "Create New Appointment";
        this.description = "Fill the following form to create a new appointment.";
        this.button = "Create";
    }

    if(true){

    }
  }

}
