import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { Lecon, LeconService } from '../../service/lecon.service';
import {SafeUrlPipe} from '../../pipe/safe-url.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-lecon-detail',
  templateUrl: './lecon-detail.html',
  imports: [
      PdfViewerModule, MatProgressSpinnerModule, RouterLink, RouterLinkActive
  ],
  styleUrls: ['./lecon-detail.scss']
})
export class LeconDetailComponent implements OnInit {
  lecon: Lecon | null = null;
  pdfUrl: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private leconService: LeconService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.leconService.getLeconById(id).subscribe(lecon => {
      this.lecon = lecon;

      if (lecon.idLecon) {
        this.leconService.getPdfByUrl(lecon.idLecon).subscribe(blob => {
          this.pdfUrl = URL.createObjectURL(blob);
          this.isLoading = false; // Fin du chargement
        });
      }
    });
  }
}
