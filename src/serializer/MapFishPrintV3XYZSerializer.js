import OlSourceXYZ from 'ol/source/XYZ';

import defaultsDeep from 'lodash/defaultsDeep';

import BaseSerializer from './BaseSerializer';

/**
 * The MapFishPrintV3OSMSerializer.
 *
 * @class
 */
export class MapFishPrintV3XYZSerializer extends BaseSerializer {

  /**
   * The WMS layer type identificator.
   *
   * @type {string}
   */
  static TYPE_OSM = 'xyz';

  /**
   * The ol sources this serializer is capable of serializing.
   *
   * @type {Array}
   */
  static sourceCls = [
    OlSourceXYZ
  ];

  /**
   * The constructor
   */
  constructor() {
    super(arguments);
  }

  /**
   * Serializes/Encodes the given layer.
   *
   * @param {ol.layer.Layer} layer The layer to serialize/encode.
   * @param {Object} opts Additional properties to pass to the serialized
   *   layer object that can't be obtained by the layer itself. It can also be
   *   used to override all generated layer values, e.g. the image format.
   * @return {Object} The serialized/encoded layer.
   */
  serialize(layer, opts = {}) {
    defaultsDeep(opts, {
      customParams: {},
      imageExtension: 'png',
      tileSize: [256, 256]
    });

    const source = layer.getSource();

    if (!this.validateSource(source)) {
      return;
    }

    const serialized = {
      ...super.serialize(layer, opts),
      ...{
        name: layer.get('name'),
        baseURL: source.getUrls()[0],
        opacity: layer.getOpacity(),
        type: 'osm'
      },
      ...opts
    };

    return serialized;
  }
}

export default MapFishPrintV3XYZSerializer;
