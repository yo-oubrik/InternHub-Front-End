// components/PdfViewer.tsx
import React from 'react';

interface PdfViewerProps {
    file: string;
    width?: string;
    height?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file , width='100%' , height='100vh' }) => (
  <div style={{ width: width , height: height }}>
    <iframe
      src={file}
      title="PDF Viewer"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  </div>
);

export default PdfViewer;