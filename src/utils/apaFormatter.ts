export interface ApaInput {
  type: 'book' | 'journal' | 'website' | 'news';
  authorLastName: string;
  authorFirstInitials: string; // e.g. "A. B."
  year: string;
  title: string;
  sourceName: string; // Book publisher, Journal title, or Website name
  volumeIssue?: string; // for journal: e.g. "12(3), 45-67"
  doiOrUrl?: string;
}

export function generateApaCitation(input: ApaInput): string {
  const author = input.authorLastName 
    ? `${input.authorLastName}, ${input.authorFirstInitials || ''}`.trim()
    : 'Anonim';
  const year = input.year ? `(${input.year})` : '(t.t.)';
  
  switch (input.type) {
    case 'book':
      return `${author}. ${year}. *${input.title}*. ${input.sourceName}.${input.doiOrUrl ? ` ${input.doiOrUrl}` : ''}`;
    
    case 'journal':
      return `${author}. ${year}. ${input.title}. *${input.sourceName}*${input.volumeIssue ? `, ${input.volumeIssue}` : ''}.${input.doiOrUrl ? ` ${input.doiOrUrl}` : ''}`;
    
    case 'website':
      return `${author}. ${year}. *${input.title}*. ${input.sourceName}.${input.doiOrUrl ? ` ${input.doiOrUrl}` : ''}`;
    
    case 'news':
      return `${author}. ${year}. ${input.title}. *${input.sourceName}*.${input.doiOrUrl ? ` ${input.doiOrUrl}` : ''}`;
      
    default:
      return `${author}. ${year}. ${input.title}. ${input.sourceName}.`;
  }
}
