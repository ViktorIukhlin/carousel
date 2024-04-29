import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarkupService {
  formatText(text: string) {
    // Here we are trying to find all '\n' symbols and content inside these '** .... **' symbols
    return text.replaceAll(/\\n|\*\*(.*?)\*\*/g, (_, coincidence) => {
      // if this is a '** .... **' symbols then replace them with the span tag
      if (coincidence) {
        return `<span class="yellow">${coincidence}</span>`;
      }
      // if this is a '\n' symbols then return the <br /> tag instead
      return '<br />';
    });
  }
}
