import React ,{useState,useEffect}from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas

const MyQr = ({ email }) => {
  const [colors, setColors] = useState({
    bgColor: '#ffffff', 
    fgColor: '#000000', 
  });
  useEffect(() => {
   
    const rootStyles = getComputedStyle(document.documentElement);
    setColors({
      bgColor: rootStyles.getPropertyValue('--violet') || '#ffffff',
      fgColor: rootStyles.getPropertyValue('--orange') || '#000000',
    });
  }, []);
  const qrStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: '20px',
    borderRadius: '10px', 
    width: '200px', 
    // backgroundColor: '#f8f9fa',
  };

  return (
    <div style={qrStyle}>
      <QRCodeCanvas
        value={email}
        size={150} 
        bgColor={colors.bgColor.trim()} 
        fgColor={colors.fgColor.trim()} 
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default MyQr;
