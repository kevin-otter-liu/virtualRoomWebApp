import { useState } from 'react';
import FormBuildingCanvas from '../components/canvas-objects/FormBuildingCanvas';
import ListingForm from '../components/forms/ListingForm';
import './UploadListingPage.css';
const UploadListingPage: React.FC = () => {
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');

  const updateBuildingCanvasPreview = (fileUrl: string) => {
    setRawBuildingDataUrl(fileUrl);
  };



  return (
    <div className='test-page'>
      <ListingForm updateBuildingCanvasPreview={updateBuildingCanvasPreview} />
      <FormBuildingCanvas rawBuildingDataUrl={rawBuildingDataUrl}/>
    </div>
  );
};

export default UploadListingPage;
