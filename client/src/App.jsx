import { useState } from 'react';

export default function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://youtube.com");
  const [qrSize, setQrSize] = useState("150");

  async function handleGenerate () {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=4${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error('Error generating QR code', error);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload () {
    fetch(img).then((response) => response.blob()).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait ...</p>}
      {img && <img src={img} alt="" className='qr-code-image' />}
      <div>
        <label htmlFor="dataInput" className='input-label'>Data for QR code:</label>
        <input type="text" id='dataInput' placeholder='Enter data for QR code' vlaue={qrData} onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor="sizeInput" className='input-label'>Image size(e.g., 150):</label>
        <input type="text" id='sizeInput' placeholder='Enter image size' value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>
        <button className='generate-button' disabled={loading} onClick={handleGenerate}>Generate QR Code</button>
        <button className='download-button' onClick={handleDownload}>Download QR Code</button>
      </div>
      <p className='footer'>Designed By <a href="#">Gobi Ananth</a></p>
    </div>
  )
}
