// file-size.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    if (size === 0) {
      return '0 Bytes';
    }

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));

    return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  }
}
