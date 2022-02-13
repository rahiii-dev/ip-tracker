// https://geo.ipify.org/api/v2/country,city?apiKey=at_gPISVtEv9R39piXNxKwCHQUL96D9l&ipAddress=8.8.8.8
let El = (id) => document.querySelector(id);

const inputel = El("#input");
const submitBtn = El("#submitBTn");
submitBtn.addEventListener("click", function () {
    if (inputel.value != '') {
      loadIP();
    }
  });

const IPel = El("#ip_addres");
const locel = El("#location");
const timezoneEl = El("#timezone");
const ISPel = El("#ISP");

// load map
function loadMap(lat, long) {
  var map = L.map("map").setView([lat, long], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var iconL = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [48, 56],
    iconAnchor: [24, 28],
  });
  L.marker([lat, long], { icon: iconL }).addTo(map);
}

// loadip
function loadIP() {
  let ipAddress = inputel.value;

  fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_gPISVtEv9R39piXNxKwCHQUL96D9l&ipAddress=" +
      ipAddress
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      IPel.textContent = `${data.ip}`;
      locel.textContent = `${data.location.city},${data.location.country}`;
      timezoneEl.textContent = `UTC ${data.location.timezone}`;
      ISPel.textContent = `${data.isp}`;

      let latitude = data.location.lat;
      let longitude = data.location.lng;

      loadMap(latitude, longitude)
    })
    .catch(() => {
      inputel.value = "";
      IPel.textContent = `incorrect IP address or domain`;
      locel.textContent = `-- -- -- `;
      timezoneEl.textContent = `-- -- --`;
      ISPel.textContent = `-- -- --`;
    });
}
loadIP();


