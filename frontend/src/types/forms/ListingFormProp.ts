export default interface ListingFormProp {
  updateBuildingCanvasPreview: (
    fileUrl: string,
    texturePathMap: Map<string, string>
  ) => void;
}
