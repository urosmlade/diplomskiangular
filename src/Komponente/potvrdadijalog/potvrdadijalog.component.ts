import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Flashcard } from 'src/Model/flashcard.model';
import { FlashcardService } from 'src/Service/flashcard.service';

@Component({
  selector: 'app-potvrdadijalog',
  templateUrl: './potvrdadijalog.component.html',
  styleUrls: ['./potvrdadijalog.component.css']
})
export class PotvrdadijalogComponent implements OnInit {

  constructor(
    @Inject (MAT_DIALOG_DATA) public data:Flashcard,
    public dialog:MatDialog,
    public flashcardService:FlashcardService) { }

  ngOnInit() {
  }


  ponisti(){
    this.dialog.closeAll();
  }



  brisi(id:number){
    this.flashcardService.deleteFlashcard(id);
    this.dialog.closeAll();
  }
}
