import {Component, inject} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent{

  snackBarRef = inject(MatSnackBarRef);
  
  constructor() { }

  ngOnInit(): void {
  }

}
