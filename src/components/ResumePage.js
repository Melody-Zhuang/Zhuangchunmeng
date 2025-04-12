// ... existing code ...

function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = '我的简历.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-container">
      {/* ... existing resume content ... */}
      <button 
        onClick={handleDownload}
        className="download-btn"
      >
        下载简历
      </button>
    </div>
  );
}

// ... existing code ...