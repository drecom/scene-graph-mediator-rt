import Importer from 'importer/Importer';
import Pixi from 'importer/Pixi';
declare const Importers: {
    Abstract: typeof Importer;
    Pixi: typeof Pixi;
};
export default Importers;
