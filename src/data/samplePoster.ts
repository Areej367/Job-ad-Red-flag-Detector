import type { UploadedImage } from '../types';

export function createSampleScamPoster(): UploadedImage {
  // If window is defined, render crisp raster PNG using Canvas
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 780;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1. Background
      ctx.fillStyle = '#fffdf7';
      ctx.fillRect(0, 0, 600, 780);

      // Border
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(12, 12, 576, 756);
      ctx.setLineDash([]);

      // 2. Header Banner
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.roundRect(24, 24, 552, 90, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('URGENT STAFF WANTED / فوری ضرورت', 300, 64);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('GOVERNMENT APPROVED AD (SCAM CLAIMS)', 300, 96);

      // 3. Urgency Badge
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(170, 130, 260, 36, 18);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('⚡ ONLY 3 VACANCIES REMAINING ⚡', 300, 153);

      // 4. Job Title
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('ONLINE SMS TYPING & DATA ENTRY', 300, 205);

      ctx.fillStyle = '#475569';
      ctx.font = '15px sans-serif';
      ctx.fillText('Home Based Work (Matric / FA / Housewives / Students)', 300, 230);

      // 5. Salary Box
      ctx.fillStyle = '#f0fdf4';
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 255, 520, 95, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#15803d';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('GUARANTEED MONTHLY INCOME (DAILY PAYOUT)', 300, 285);

      ctx.fillStyle = '#166534';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('PKR 110,000 – 175,000', 300, 328);

      // 6. Perks & Requirements
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(40, 365, 520, 140, 10);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('• Working hours: 1-2 hours daily copy-pasting SMS', 60, 400);
      ctx.fillText('• No qualification, no experience & no English needed', 60, 435);
      ctx.fillText('• Instant payment daily via JazzCash & EasyPaisa', 60, 470);

      // 7. Scam Red Alert Box
      ctx.fillStyle = '#fef2f2';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 520, 520, 80, 10);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('⚠️ MANDATORY COURIER & REGISTRATION FEE ⚠️', 300, 550);

      ctx.fillStyle = '#991b1b';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Send Rs. 2,800 via EasyPaisa to Account: 0341-9876543 (Refundable)', 300, 578);

      // 8. Identity harvesting warning
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Must send original CNIC front/back photo on WhatsApp for joining', 300, 625);

      // 9. WhatsApp Button
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.roundRect(40, 645, 520, 85, 12);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('CONTACT MANAGER ON WHATSAPP ONLY', 300, 680);

      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('+92 312 8492011', 300, 715);

      const dataUrl = canvas.toDataURL('image/png');
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');

      return {
        name: 'pakistani_sms_scam_ad.png',
        size: Math.round(base64.length * 0.75),
        mimeType: 'image/png',
        base64,
        dataUrl,
      };
    }
  }

  // Fallback if canvas is unavailable
  const fallbackBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  return {
    name: 'sample_ad.png',
    size: 100,
    mimeType: 'image/png',
    base64: fallbackBase64,
    dataUrl: `data:image/png;base64,${fallbackBase64}`,
  };
}
