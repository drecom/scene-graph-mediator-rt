import Exporter from 'exporter/Exporter';
import Pixi from 'exporter/Pixi';
declare const Exporters: {
    Abstract: typeof Exporter;
    Pixi: typeof Pixi;
};
export default Exporters;
