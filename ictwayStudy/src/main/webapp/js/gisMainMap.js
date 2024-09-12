//http://192.168.0.2:8080/geoserver/cite/wms
document.addEventListener('DOMContentLoaded', function(){
	var vectorUV = new ol.layer.Vector({});
	var vectorSeoul = new ol.layer.Vector({});
	var geoJson = new ol.format.GeoJSON({
    	projection: 'EPSG:3857'
	});
	var vectorSourceUV = new ol.source.Vector({});
	var vectorSourceSeoul = new ol.source.Vector({});
	
	$.get('http://192.168.0.2:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:xsdb_uv_poi_tm&maxFeatures=50&outputFormat=application/json&srsname=EPSG:3857'
	    // success callback 
	    ,function (data) {
	        // first add features  
	        vectorSourceUV.addFeatures(geoJson.readFeatures(data));
	
	        // then display map...
	        vectorUV.setSource(vectorSourceUV);   
	        vectorUV.setStyle(getUVFeature());  
	        vectorUV.setVisible(true);                     
	   }
	);
	
	$.get('http://192.168.0.2:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:ctprvn&maxFeatures=50&outputFormat=application/json&srsname=EPSG:3857'
	    // success callback 
	    ,function (data) {
			
	        // first add features  
	        vectorSourceSeoul.addFeatures(geoJson.readFeatures(data));
			for(var i in vectorSourceSeoul.getFeatures()) {
				vectorSourceSeoul.getFeatures()[i].setStyle(getSeoulFeature(vectorSourceSeoul.getFeatures()[i].values_.ctprvn_cd));		
			}
	        // then display map...
	        vectorSeoul.setSource(vectorSourceSeoul);   
	        vectorSeoul.setVisible(true);                     
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
					url : 'http://192.168.0.2:8080/geoserver/cite/wms',
					params : {
						'SRS' : 'EPSG:3857',
						'LAYERS' : 'cite:ctprvn'
					},
					serverType : 'geoserver'
				}),
				visible : false
			}),
			/*대학wms*/
			new ol.layer.Tile({
				source : new ol.source.TileWMS({
					url : 'http://192.168.0.2:8080/geoserver/cite/wms',
					params : {
						'SRS' : 'EPSG:3857',
						'LAYERS' : 'cite:xsdb_uv_poi_tm'
					},
					serverType : 'geoserver'
				}),
				visible : false
			}),
			vectorSeoul,
			vectorUV
			
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

function getUVFeature () {
	return new ol.style.Style({
		 image : new ol.style.Icon({
		    src : 'images/gis/university.png'
		 })
	});
}

function getSeoulFeature (ctprvn_cd) {
	if(ctprvn_cd == '11' || (ctprvn_cd >= '26' && ctprvn_cd <= '31')) {
		return new ol.style.Style({
	        stroke: new ol.style.Stroke({
				color: 'rgba(255, 0, 0, 1)',
				width: 2
			}),
			fill: new ol.style.Fill({
				color: 'rgba(255, 0, 0, 0.6)'
			})
		});
			
	} else {
		return new ol.style.Style({
	        stroke: new ol.style.Stroke({
				color: 'rgba(100, 149, 237, 1)',
				width: 2
			}),
			fill: new ol.style.Fill({
				color: 'rgba(100, 149, 237, 0.6)'
			})
		});
	}
}