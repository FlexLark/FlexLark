export function formatSecond(second: number): string {  
  if (second < 0) {
    console.warn('Invalid input: negative seconds');
    return '00:00';
  }

  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const remainingSeconds = second % 60;

  if (hours === 0) {  
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;  
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;  
}  
  