import './OptionsPage.css';
import CardOptionProp from '../types/displays/CardOptionProp';
import CardOption from '../components/displays/CardOption';

const cardDatas: CardOptionProp[] = [
  {
    title: 'VIEW YOUR PROJECT LISTINGS',
    imgAlt: 'view houses',
    imgSrc: '/assets/ui/card-1.jpg',
    body: 'View my posted listings',
    urlRedirectTo: '/my-listings',
    buttonPrompt:'VIEW YOUR LISTINGS HERE'
  },
  {
    title: 'UPLOAD A LISTING',
    imgAlt: 'view houses',
    imgSrc: '/assets/ui/card-2.jpg',
    body: 'upload and post a listings',
    urlRedirectTo: '/upload-listing',
    buttonPrompt:'UPLOAD A PROJECT HERE'
  },
  {
    title: 'SEARCH FOR A PROJECT',
    imgAlt: 'view houses',
    imgSrc: '/assets/ui/card-3.jpg',
    body: 'Search for a Listing and view the listing in 3D',
    urlRedirectTo: '/search-listing',
    buttonPrompt:'SEARCH AND VIEW A PROJECT HERE'
  },
];

const OptionsPage: React.FC = () => {
  return (
    <div className='options-container'>
      {cardDatas.map((cardData, i) => {
        return <CardOption key={i} {...cardData}></CardOption>;
      })}
    </div>
  );
};

export default OptionsPage;
