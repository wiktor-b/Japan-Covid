var country = document.getElementById("svg");
var information_box = document.getElementById("info");
var country_name = document.getElementById("nazwa_kraju");
var deaths = document.getElementById("liczba_smierci");
var cases = document.getElementById("liczba_przypadkow");
var deaths_checkbox = document.getElementById("smierci_checkbox");
var cases_checkbox = document.getElementById("przypadki_checkbox");
var total_deaths = document.getElementById("total_deaths");
var total_cases = document.getElementById("total_cases");
var api_data;
var api2_data;

function API_CALL2(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            api2_data = data;
            total_deaths.textContent = data.death;
            total_cases.textContent = data.positive;
            return data[0];
        })
}

function API_CALL(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            api_data = data;
            return api_data;
        })
}


country.addEventListener("mouseover", function (event) {
    let country_object;

    if (event.target.id !== 'svg') {
        // console.log(event.target.getAttribute("name"));

        for (element of api_data) {
            if (event.target.getAttribute("name") === element.name_en) {
                let top = event.target.getBoundingClientRect().top;
                let left = event.target.getBoundingClientRect().left;
                information_box.style.top = +top + 70 + 'px';
                information_box.style.left = +left + 90+'px';
                information_box.style.display = 'block';
                country_name.textContent = element.name_en;
                deaths.textContent = element.deaths;
                cases.textContent = element.cases;
                element = '';
            }
        }
    }
    return null;
}, false);

country.addEventListener('mouseout', function (event) {
    information_box.style.bottom = '0';
    information_box.style.right = '0';
    information_box.style.display = 'none';

    console.log(event.target.id);
});
//setTimeout(color_map, 200);

window.onLoad = color_map();

function color_map() {
    if (deaths_checkbox.checked !== true) {
        for (element of api_data) {
            let code = element.name_en;
            document.getElementById("legend2").style.display="block";
            document.getElementById("legend").style.display="none";

            if (document.getElementById(code) === null) {
                continue;
            }
            if (element.deaths < 25) {
                document.getElementById(code).style.fill = '#ffb2b2';
                continue;
            }
            if (element.deaths < 50) {
                document.getElementById(code).style.fill = '#ff9999';
                continue;
            }
            if (element.deaths < 100) {
                document.getElementById(code).style.fill = '#ff7f7f';
                continue;
            }
            if (element.deaths < 200) {
                document.getElementById(code).style.fill = '#ff6666';
                continue;
            }
            if (element.deaths < 400) {
                document.getElementById(code).style.fill = '#ff4c4c';
                continue;
            }
            if (element.deaths < 800) {
                document.getElementById(code).style.fill = '#ff3232';
                continue;
            }
            if (element.deaths < 1600) {
                document.getElementById(code).style.fill = '#ff1919';
                continue;
            }
            if (element.deaths < 3200) {
                document.getElementById(code).style.fill = '#8F1D21';
                continue;
            }
            if (element.deaths < 6400) {
                document.getElementById(code).style.fill = '#672422';
                continue;
            }

        }
    } else {
        for (element of api_data) {
            let code = element.name_en;
            let color = element.cases;
            document.getElementById("legend2").style.display="none";
            document.getElementById("legend").style.display="block";

            if (document.getElementById(code) === null) {
                continue;
            }
            if (element.cases < 20000) {
                document.getElementById(code).style.fill = '#e5e5ff';
                continue;
            }
            if (element.cases < 25000) {
                document.getElementById(code).style.fill = '#b2b2ff';
                continue;
            }
            if (element.cases < 50000) {
                document.getElementById(code).style.fill = '#7f7fff';
                continue;
            }
            if (element.cases < 70000) {
                document.getElementById(code).style.fill = '#4c4cff';
                continue;
            }
            if (element.cases < 150000) {
                document.getElementById(code).style.fill = '#3232ff';
                continue;
            }
            if (element.cases < 300000) {
                document.getElementById(code).style.fill = '#0000ff';
                continue;
            }
            if (element.cases < 500000) {
                document.getElementById(code).style.fill = '#000099';
                continue;
            }
            if (element.cases < 700000) {
                document.getElementById(code).style.fill = '#00007f';
                continue;
            }
            if (element.cases < 2000000) {
                document.getElementById(code).style.fill = '#191F45';
                continue;
            }
        }


        console.log('color');
    }
}

smierci_checkbox.addEventListener('change', () => color_map())


API_CALL(`https://covid19-japan-web-api.vercel.app/api/v1/prefectures`);
API_CALL2('https://covid19-japan-web-api.vercel.app/api/v1/total');

