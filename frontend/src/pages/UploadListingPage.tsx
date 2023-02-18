import { useState } from 'react';
import ListingForm from '../components/forms/ListingForm';
import FormCanvasBuilding from './FormBuildingCanvas';
import './UploadListingPage.css';
const UploadListingPage: React.FC = () => {
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');

  const updateBuildingCanvasPreview = (fileUrl: string) => {
    setRawBuildingDataUrl(fileUrl);
  };


  return (
    <div className='test-page'>
      <ListingForm updateBuildingCanvasPreview={updateBuildingCanvasPreview} />
      <FormCanvasBuilding rawBuildingDataUrl={rawBuildingDataUrl}/>
    </div>
  );
};

export default UploadListingPage;
