import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl: Observable<string>;
  isHovering: boolean;
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  typelist: string[] = ['png', 'jpg', 'bmp', 'jpeg', 'svg'];
  type = 'png';
  h = 300;
  w = 300;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupport file type ');
      return;
    }
    const path = `test/${new Date().getTime()}_${file.name}`;
    const newpath = `${file.name}`;
    const customMetadata = { app: 'Umbreon' };
    this.task = this.storage.upload(newpath, file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.task.then(() => {
      const fileref = this.storage.storage.ref().child(newpath);
      fileref.getDownloadURL().then(url => {
        console.log(url);
        return this.downloadUrl = of(url);
      },
        reject => {
          console.log('something wrong' + reject);
        }).catch(err => {
          console.log(err);
        });
    });
  }
  isActive(snapshot) {
    return snapshot.state = 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  show() {
    console.log(this.downloadUrl);
  }
  downloadImage() {
    const canvas = document.getElementById('mycanvas');
    const canvasel = this.canvas.nativeElement;
    const ctx = canvasel.getContext('2d');
    const img = document.getElementById('myimage');
    this.h = img.clientHeight;
    this.w = img.clientWidth;
    ctx.drawImage(img, 10, 10, this.w, this.h);
    this.downloadLink.nativeElement.href = this.canvas.nativeElement.toDataURL(`image/${this.type}`);
    this.downloadLink.nativeElement.download = `holyf-itswork.${this.type}`;
    this.downloadLink.nativeElement.click();
    /* (this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataUrl();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'holysh-itwork.png';
      this.downloadLink.nativeElement.click();
    }); */
  }
}
