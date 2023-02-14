import { useState } from 'react';
import ListingForm from '../components/forms/ListingForm';
import FormCanvasBuilding from './FormBuildingCanvas';
import './TestPage.css';
const TestPage: React.FC = () => {
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

export default TestPage;
