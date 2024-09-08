
document.addEventListener('DOMContentLoaded', function(){
	var vector = new ol.layer.Vector({});
	var geoJson = new ol.format.GeoJSON({
    	projection: 'EPSG:3857'
	});
	var vectorSource = new ol.source.Vector({});
	
	$.get('http://localhost:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:ctprvn&maxFeatures=50&outputFormat=application/json&srsname=EPSG:3857'
	    // success callback 
	    ,function (data) {
	        // first add features  
	        vectorSource.addFeatures(geoJson.readFeatures(data));
	
	        // then display map...
	        vector.setSource(vectorSource);   
	        vector.setStyle(getFeature());  
	        vector.setVisible(true);                     
	   }
	);

	const map = new ol.Map({
		layers: [
			new ol.layer.Tile({
			  source: new ol.source.OSM(),
			}),
			/*시군구wms*/
			new ol.layer.Tile({
				source : new ol.source.TileWMS({
					url : 'http://localhost:8080/geoserver/cite/wms',
					params : {
						'SRS' : 'EPSG:5186',
						'LAYERS' : 'cite:ctprvn'
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

function getFeature () {
	return new ol.style.Style({
		fill: new ol.style.Fill({
			      color: 'rgba(100, 149, 237, 0.6)'
			    })
	});
}