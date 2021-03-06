function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia3Rocm52IiwiYSI6ImNrN3RiYWF0cTBwYzYzaHB1dml0cmF6bHQifQ.r9U_UZKY2IQisQMqIci4xg'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');
  
  let flag = false;

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (flag) {
      // Once the program has been ran at least once, this will remove the previous 
      // five children before adding the next five
      targetList.removeChild(targetList.lastChild);
      targetList.removeChild(targetList.lastChild);
      targetList.removeChild(targetList.lastChild);
      targetList.removeChild(targetList.lastChild);
      targetList.removeChild(targetList.lastChild);
    }
    
    const longfiltered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    filtered = longfiltered.slice(0, 5);

    // Pans the map to the location of the first restaurant
    const longLat = filtered[0].geocoded_column_1.coordinates;
    const latlng = L.latLng(longLat[1], longLat[0]);
    mapObjectFromFunction.panTo(latlng);

    // Displays the selected restaurants in a list & plots those restaurant locations using markers
    filtered.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `
        <div class="box">
          <div class="list-header is-size-5">${item.name}</div>
          <address class="is-size-six">${item.address_line_1}</address>
        </div>`;
      targetList.append(appendItem);
    });

    flag = true;
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;