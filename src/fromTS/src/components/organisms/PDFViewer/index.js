import dynamic from 'next/dynamic';
import { useState } from 'react';
// import { Document, Page } from 'react-pdf';

const ReactPdf = dynamic(() => import('react-pdf'), { ssr: false });

function PDFViewer({ FILE_NEW_PRODUCT }) {
  // render
  const [file] = useState(FILE_NEW_PRODUCT);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const { Document, Page } = ReactPdf;
  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} style={{ width: '100%' }}>
      {Array.from({ length: numPages }, (_, index) => (
        <Page size="A3" key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} />
      ))}
    </Document>
  );
}

export default PDFViewer;
