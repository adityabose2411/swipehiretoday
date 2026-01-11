import { useState, useRef } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChartData {
  type: string;
  data: any[];
}

interface ExportPDFButtonProps {
  messages: Message[];
  charts: ChartData[];
  chartsContainerRef: React.RefObject<HTMLDivElement>;
}

export function ExportPDFButton({ messages, charts, chartsContainerRef }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (messages.length === 0) {
      toast.error('No analysis to export. Start a conversation first.');
      return;
    }

    setIsExporting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Header
      pdf.setFillColor(248, 113, 113); // Primary color
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Hiring Analysis Report', margin, 22);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`, margin, 30);

      yPosition = 50;

      // Reset text color
      pdf.setTextColor(30, 30, 30);

      // Conversation Section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Conversation Analysis', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      for (const message of messages) {
        const prefix = message.role === 'user' ? 'You: ' : 'AI Assistant: ';
        const text = prefix + message.content;
        
        // Split long text into lines
        const lines = pdf.splitTextToSize(text, contentWidth);
        
        // Check if we need a new page
        const lineHeight = 5;
        const textHeight = lines.length * lineHeight;
        
        if (yPosition + textHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        // Add role label styling
        if (message.role === 'user') {
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(100, 100, 100);
        } else {
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(30, 30, 30);
        }

        pdf.text(lines, margin, yPosition);
        yPosition += textHeight + 8;
      }

      // Charts Section
      if (charts.length > 0 && chartsContainerRef.current) {
        // Add new page for charts
        pdf.addPage();
        yPosition = margin;

        pdf.setTextColor(30, 30, 30);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Visual Analysis', margin, yPosition);
        yPosition += 15;

        // Capture charts as image
        try {
          const canvas = await html2canvas(chartsContainerRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
          });

          const imgData = canvas.toDataURL('image/png');
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Check if chart fits on page
          if (yPosition + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        } catch (chartError) {
          console.error('Failed to capture charts:', chartError);
          pdf.setFontSize(10);
          pdf.text('Charts could not be exported. Please view them in the app.', margin, yPosition);
        }
      }

      // Footer on all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `SwipeHire Hiring Assistant - Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      pdf.save(`hiring-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={exportToPDF}
      disabled={isExporting || messages.length === 0}
      className="text-primary-foreground hover:bg-primary-foreground/20"
      title="Export as PDF"
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
    </Button>
  );
}
