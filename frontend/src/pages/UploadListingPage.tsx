import { Fragment, useState } from 'react';
import FormBuildingCanvas from '../components/canvas-objects/FormBuildingCanvas';
import NavigationBar from '../components/displays/NavigationBar';
import ListingForm from '../components/forms/ListingForm';
import './UploadListingPage.css';
const UploadListingPage: React.FC = () => {
  const [rawBuildingDataUrl, setRawBuildingDataUrl] = useState<string>('');
  const [texturePathMap, setTexturePathMap] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const updateBuildingCanvasPreview = (
    fileUrl: string,
    texturePathMap: Map<string, string>
  ) => {
    setRawBuildingDataUrl(fileUrl);
    setTexturePathMap(texturePathMap);
  };

  return (
    <Fragment>
      <NavigationBar />
      <div className='test-page'>
        <ListingForm
          updateBuildingCanvasPreview={updateBuildingCanvasPreview}
        />
        <FormBuildingCanvas
          texturePathMap={texturePathMap}
          rawBuildingDataUrl={rawBuildingDataUrl}
        />
      </div>
    </Fragment>
  );
};

export default UploadListingPage;
