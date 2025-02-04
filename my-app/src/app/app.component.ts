  import { Component, HostListener } from '@angular/core';
  import { RouterOutlet } from '@angular/router';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    isOpen = false;

    toggleButton(){
      this.isOpen = !this.isOpen;
    }
  // Écoute l'événement scroll
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;

    // Liste des IDs des images parallax
    const elements = [
      { id: 'parallax-left-1', delay: 0 },
      { id: 'parallax-left-2', delay: 200 },
      { id: 'parallax-left-3', delay: 400 },
      { id: 'parallax-right-1', delay: 0 },
      { id: 'parallax-right-2', delay: 200 },
      { id: 'parallax-right-3', delay: 400 }
    ];

    elements.forEach((element) => {
      const el = document.getElementById(element.id);
      if (el) {
        const adjustedScroll = scrollPosition - element.delay;
        const opacity = Math.min(adjustedScroll / 300, 1); // Gradual opacity
        const translateY = Math.min(adjustedScroll / 3, 150); // Gradual vertical movement

        el.style.opacity = opacity > 0 ? opacity.toString() : '0';
        el.style.transform = `translateY(${translateY}px)`;
      }
    });
  }
  submitFakeForm(event: Event) {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const cvInput = form.querySelector('#cv') as HTMLInputElement;
  
    if (cvInput && cvInput.files && cvInput.files.length > 0) {
      const file = cvInput.files[0];
      console.log('Uploaded CV:', file.name); // Affiche le nom du fichier dans la console
      alert(`CV uploaded: ${file.name} (Fake submission)`);
    } else {
      alert('Please upload your CV.');
      return;
    }
  
    this.toggleButton(); // Retour à la page principale
  }
  
  }