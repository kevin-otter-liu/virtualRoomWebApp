import { ListingData } from '../data/ListingData';

export default interface ListingProp {
  listing: ListingData;
  key: string;
  isCompany: boolean;
}
