import mapboxgl from 'mapbox-gl';
import { feature } from 'topojson-client';
import properties from '../../data/acquisitions.json';

const mapLabel = document.getElementById('property-map-label');

mapboxgl.accessToken =
  'pk.eyJ1IjoianNvbmthbyIsImEiOiJjanNvM2U4bXQwN2I3NDRydXQ3Z2kwbWQwIn0.JWAoBlcpDJwkzG-O5_r0ZA';

const map = new mapboxgl.Map({
  container: 'property-map',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-73.9618, 40.8115],
  zoom: 14.5,
  scrollZoom: false,
  dragRotate: false,
  touchZoomRotate: false,
  touchPitch: false,
});

const PROPERTIES_ID = 'properties';

let year = 1965;

map.on('load', () => {
  map.addSource(PROPERTIES_ID, {
    type: 'geojson',
    data: feature(properties, properties.objects.acquisitions),
  });

  map.addLayer({
    id: PROPERTIES_ID,
    type: 'fill',
    source: PROPERTIES_ID,
    paint: {
      'fill-color': 'rgba(66, 225, 135, 0.77)',
    },
  });

  function setYear(year) {
    map.setFilter(PROPERTIES_ID, ['<=', 'year', year]);
    mapLabel.innerText = '' + year;
  }

  setInterval(() => {
    if (year === 2020) year = 1965;
    setYear(++year);
  }, 150);

  map.resize();
});
