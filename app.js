const streetsEl = document.querySelector('.streets');
const searchInput = document.forms[0];


const apiKey = '3o5Kjx0YtWh4ShFrPLbp';
const startURL = 'https://api.winnipegtransit.com/v3/';

const getStreets = (query) => {
  return fetch(`${startURL}streets.json?api-key=${apiKey}&name=${query}`)
  .then(response => response.json())
  .then(data => data.streets);
};

getStreets('portage').then((streets) => {
  streetsEl.innerHTML = '';
  streets.forEach(street => {
    streetsEl.insertAdjacentHTML (
      'beforeend',
      `<a href="#" data-street-key=${street.key}>${street.name}</a>`
      );
  });
});

const getStops = (streetKey) => {
  return fetch(`${startURL}stops.json?api-key=${apiKey}&street=${streetKey}`)
  .then(response => response.json())
  .then(data => data.streets);
}

const getScheduledStops = (e) => {

}

const handleSearchInput = (e) => {
  e.preventDefault();
  const query = e.target.value;
  getStreets(query).then((streets) => {
    streetsEl.innerHTML ='';
    streets.forEach((street) => {
      streetsEl.insertAdjacentHTML(
        'beforeend',
        `<a href="#" data-street-key=${street.key}>${street.name}</a>`
      );
    });
  });
};
const handleStreetClick = (e) => {
  const streetKey = e.target.dataset.streetKey;
  getStops(streetKey)
  .then(stops => console.log(stops));
}
searchInput.addEventListener('submit', handleSearchInput);
streetsEl.addEventListener('click', handleStreetClick);