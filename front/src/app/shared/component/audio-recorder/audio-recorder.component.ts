import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.scss']
})
export class AudioRecorderComponent implements OnInit, OnDestroy {
  isRecording = signal(false);
  isTranscribing = signal(false);
  audioURL = signal<string | null>(null);
  transcription = signal<string | null>(null);

  hasAudioReady = computed(() => !!this.audioURL());
  hasTranscription = computed(() => !!this.transcription());

  startLabel = computed(() =>
    this.isRecording()
      ? 'Enregistrement en cours…'
      : this.hasAudioReady()
      ? 'Nouvel enregistrement'
      : "Démarrer l'enregistrement"
  );

  canClickStart = computed(() => !this.isRecording() && !this.isTranscribing());
  canClickStop = computed(() => this.isRecording());

  canTranscribe = computed(
    () => this.hasAudioReady() && !this.isRecording() && !this.isTranscribing()
  );
  
  canDownloadPDF = computed(
    () => this.hasTranscription() && !this.isRecording() && !this.isTranscribing()
  );

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  private stream!: MediaStream;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => (this.stream = s))
      .catch((err) => console.error('Permission micro refusée', err));
  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

  /** ➤ Démarrer l’enregistrement */
  async startRecording() {
    if (!this.canClickStart()) return;

    this.audioURL.set(null);
    this.transcription.set(null);

    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
    this.isRecording.set(true);
    console.log('🎙️ Enregistrement démarré');
  }

  /** ➤ Arrêter l’enregistrement */
  stopRecording() {
    if (!this.canClickStop() || !this.mediaRecorder) return;

    console.log('⏹️ Arrêt demandé...');

    this.mediaRecorder.onstop = () => {
      console.log('✅ Événement onstop reçu');
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });

      if (audioBlob.size > 0) {
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audioURL.set(audioUrl);
        console.log('🎧 Audio prêt :', audioUrl);
      } else {
        console.warn('⚠️ Audio vide — aucun son enregistré');
      }

      this.isRecording.set(false);
    };

    this.mediaRecorder.stop();
  }

  /** ➤ Envoyer pour transcription */
  sendForTranscription() {
    if (!this.canTranscribe()) return;

    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    if (audioBlob.size === 0) {
      console.error('⚠️ Fichier audio vide');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    this.isTranscribing.set(true);

    this.http
      .post<{ transcription: string }>(
        'http://localhost:5000/api/transcribe',
        formData
      )
      .subscribe({
        next: (response) => {
          this.transcription.set(response.transcription);
          this.isTranscribing.set(false);
        },
        error: (error) => {
          console.error('Erreur transcription :', error);
          this.isTranscribing.set(false);
        },
      });
  }

  /** ➤ Générer un PDF */
  downloadPDF() {
    if (!this.canDownloadPDF()) return;

    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('Transcription Audio', 10, 20);
    doc.setFontSize(11);
    doc.text(this.transcription()!, 10, 30, { maxWidth: 180 });
    doc.save('transcription.pdf');
  }
}
