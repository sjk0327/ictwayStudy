document.addEventListener('DOMContentLoaded', function(){
	 const vectorSource = new ol.source.Vector({
			  format: new ol.format.GeoJSON(),
			  url: function (extent) {
			    return (
			      'http://192.168.0.2:8080/geoserver/wfs?service=WFS&' +
			      'version=1.1.0&request=GetFeature&typename=cite:xsdb_uv_poi_tm&' +
			      'outputFormat=application/json&srsname=EPSG:3857&' +
			      'bbox=' +
			      extent.join(',') +
			      ',EPSG:3857'
			    );
			  },
			  strategy: new ol.loadingstrategy.bbox()
			})
	const vector = new ol.layer.Vector({
  source: vectorSource,
  style: {
    'stroke-width': 0.75,
    'stroke-color': 'white',
    'fill-color': 'rgba(100,100,100,0.25)',
  },
});
	const map = new ol.Map({
		layers: [
			new ol.layer.Tile({
			  source: new ol.source.OSM(),
			}),
			/*대학교*/
			new ol.layer.Tile({
				source : new ol.source.TileWMS({
					url : 'http://192.168.0.2:8080/geoserver/cite/wms',
					params : {
						'SRS' : 'EPSG:5186',
						'LAYERS' : 'cite:xsdb_uv_poi_tm'
					},
					serverType : 'geoserver'
				}),
				visible : false
			}),
			vector
		],
		target: 'mainMap',
		keyboardEventTarget: document,
		view : new ol.View({
			center : new ol.proj.fromLonLat([126.969652,37.553836]),
			zoom : 8
		})
	});
	/*오픈레이어스 3버전이랑은 다른 방식으로 슬라이더를 지도에 포함시킴*/
	const zoomSlider = new ol.control.ZoomSlider();
	map.addControl(zoomSlider);
});