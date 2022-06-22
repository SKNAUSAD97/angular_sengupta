import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer'

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfviewerComponent implements OnInit {

@ViewChild('viewer') viewerRef:ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    WebViewer({
      path: '../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf', // path to your document
      fullAPI: true
    }, this.viewerRef.nativeElement).then((success:any)=>{
      
    });
  }

  ngOnInit(): void {
  }

}
