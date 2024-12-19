import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

function CertificateModal({ donation = {}, campaign = {} }) {
  const navigate = useNavigate();
  const [certificateId, setCertificateId] = useState('');

  useEffect(() => {
    const generateCertificateId = () => {
      const categoryPrefix = (campaign.category || 'GEN').substring(0, 3).toUpperCase();
      const randomNumber = Math.floor(100 + Math.random() * 900); // 3-digit random number
      return `${categoryPrefix}-${randomNumber}`;
    };
    setCertificateId(generateCertificateId());
  }, [campaign.category]);

  const handleDownload = () => {
    const certificate = document.getElementById('certificate');
    html2canvas(certificate, {
      scale: 2,
      useCORS: true,
      width: certificate.offsetWidth,
      height: certificate.offsetHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('certificate.pdf');
    });

    setTimeout(() => navigate('/campaign'), 500);
  };

  const handleClose = () => {
    navigate('/campaign');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-red-800"
        >
          ✕
        </button>
        
        <div 
          id="certificate" 
          className="p-10 rounded-lg shadow-lg relative text-center bg-gradient-to-b from-white to-sky-200" 
          style={{ fontFamily: 'Arial, sans-serif', border: '2px solid #ccc', backgroundSize: '100% 100%' }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.TZDOyQjDIl5-qMWjk5n8pAHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7"
            className="w-20 h-20 rounded-full mx-2 sm:mx-6"
            alt="Logo"
          />
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold">CERTIFICATE OF APPRECIATION</h1>
            <p className="text-lg mt-2">This certificate is proudly awarded to</p>
            <h2 className="text-3xl font-semibold mt-4">{donation.name || 'Recipient Name'}</h2>
          </div>

          <p className="text-lg">For generously donating <strong>${donation.amount || 0}</strong> to the</p>
          <h2 className="text-2xl font-semibold mt-2">{campaign.title || 'Campaign Title'}</h2>
          <p className="text-lg mt-1">Campaign in the category of <strong>{campaign.category || 'General'}</strong></p>

          <div className="mt-4 mb-4">
            <p className="text-lg">
              Certificate ID: 
              <strong>{certificateId}</strong>
            </p>
          </div>

          <div className="flex justify-between mt-8 mx-20">
            <div className="text-left">
              <p className="text-lg font-semibold">Date:</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right mx-20">
              <p className="text-lg font-semibold">Organization:</p>
              <p>Charity Organization</p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div 
            className="absolute -top-5 -right-5 w-28 h-28 rounded-full overflow-hidden"
            style={{ background: 'linear-gradient(255deg, magenta, yellow)' }}>
          </div>

          <div 
            className="absolute -bottom-5 -left-5 w-28 h-28 rounded-full overflow-hidden bg-yellow-400"
            style={{ background: 'linear-gradient(225deg, orange, orange)' }}>
          </div>

          <div 
            className="absolute bottom-64 right-5 w-16 h-16 rounded-full overflow-hidden bg-sky-200 opacity-35">
          </div>
          <div 
            className="absolute bottom-40 right-5 w-16 h-16 rounded-md overflow-hidden bg-sky-200 opacity-40">
          </div>
          <div 
            className="absolute bottom-40 right-32 w-16 h-16 rounded-full overflow-hidden bg-sky-200 opacity-35">
          </div>
          <div 
            className="absolute bottom-16 right-5 w-16 h-16 rounded-full overflow-hidden bg-sky-200 opacity-35">
          </div>
          <div 
            className="absolute bottom-16 right-32 w-16 h-16 rounded-md overflow-hidden bg-sky-200 opacity-35">
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
}

export default CertificateModal;
