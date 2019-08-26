var width = screen.width;
var height = screen.height;

var para = document.createElement("P");                       // Create a <p> node
var t = document.createTextNode("W: "+ screen.width + " H: " + screen.height);      // Create a text node
para.appendChild(t);                                          // Append the text to <p>
document.getElementById("resolution").appendChild(para);           // Append <p> to <div> with id="myDIV"



//world surface area
{
    var options = {
        chart: {
            width: 400,
            type: 'pie',
        },
        title: {
            text: "Land surface (million km2)"
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '18px',
                fontFamily: undefined
            }
        },
        labels: ['"free" land', 'water', 'cropland', 'pastureland'],
        series: [98.740, 361.132, 16.700, 33.500],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    var chart = new ApexCharts(
        document.querySelector("#world_surface_area"),
        options
    );
    chart.render();
}

//energy_by_ghg_co2_eq_chart
{
    var options = {
        chart: {
            type: 'bar',
            toolbar:{
                tools:{
                    source: 'https://en.wikipedia.org/wiki/Life-cycle_greenhouse-gas_emissions_of_energy_sources'
                }
            }
        },
        title:{
            text: 'life cycle co2 equivalent of electricity sources',
            align: 'center',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        tooltip: {
            fixed: {
                enabled: true,
                offsetX: -10,
                offsetY: 300
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return '<div class="tooltip">'
                    +
                    '<span style="color:  '
                    +
                    w.globals.colors[seriesIndex]
                    +
                    '">'
                    +
                    w.config.xaxis.categories[dataPointIndex]
                    +
                    ': '
                    +
                    series[seriesIndex][dataPointIndex]
                    +
                    '</span>'
            },
        },
        dataLabels: {
            enabled: false
        },

        series: [{
            name: 'Min',
            data: [740, 620, 410, 130, 18, 26, 6.0, 8.8, 1.0, 8.0, 3.7, 7.0]
        }, {
            name: 'Median',
            data: [820, 740, 490, 230, 48, 41, 38, 27, 24, 12, 12, 11]
        }, {
            name: 'Max',
                data: [910, 890, 650, 420, 180, 60, 79, 63, 2200, 35, 110, 56]
        }],
        xaxis: {
            categories: ['Coal – PC', 'Biomass – Cofiring with coal',
                'Gas – combined cycle', 'Biomass – Dedicated',
                'Solar PV – Utility scale', 'Solar PV – rooftop',
                'Geothermal', 'Concentrated solar power', 'Hydropower',
                'Wind Offshore', 'Nuclear', 'Wind Onshore'],
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#energy_by_ghg_co2_eq_chart"),
        options
    );

    chart.render();
}

//Energy_by_land_chart
{
    var options = {
        chart: {
            type: 'bar',
            toolbar:{
                tools:{
                    source:'https://www.strata.org/pdf/2017/footprints-full.pdf'
                }
            }
        },
        title:{
            text: ' Land use of U.S. electricity production in Acres/MW Produced',
            align: 'center',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        legend: {
            show: true
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return '<div class="tooltip">'
                    +
                    '<span style="color:  '
                    +
                    w.globals.colors[seriesIndex]
                    +
                    '">'
                    +
                    w.config.xaxis.categories[dataPointIndex]
                    +
                    ': '
                    +
                    series[seriesIndex][dataPointIndex]
                    +
                    '</span>'
            },
        },
        dataLabels: {
            enabled: false
        },

        series: [{
            name: 'Acres per Megawatt Produced',
            data: [12.21,12.41,12.71,43.50,70.64,315.22]
        }],
        xaxis: {
            categories: ['Coal', 'Natural Gas', 'Nuclear', 'Solar', 'Wind', 'Hydro'],
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#Energy_by_land_chart"),
        options
    );

    chart.render();
}

//lazy load
{
    (function () {
        var lazyLoadInstances = [];
        function logElementEvent(eventName, element) {
            console.log(
                Date.now(),
                eventName,
                element.getAttribute("data-src")
            );
        }
        var callback_enter = function (element) {
            // Instantiate a new LazyLoad on the element that entered
            var oneLL = new LazyLoad({
                container: element
            });
            // Optionally push it in the lazyLoadInstances
            // array to keep track of the instances
            lazyLoadInstances.push(oneLL);
            logElementEvent(" ENTERED", element);
        };
        var callback_exit = function (element) {
            logElementEvent(" EXITED", element);
        };
        var callback_reveal = function (element) {
            logElementEvent(" REVEALED", element);
        };
        var callback_loaded = function (element) {
            logElementEvent(" LOADED", element);
        };
        var callback_error = function (element) {
            logElementEvent(" ERROR", element);
            element.src =
                "https://via.placeholder.com/440x560/?text=Error+Placeholder";
        };
        var callback_finish = function () {
            logElementEvent(" FINISHED", document.documentElement);
        };
        // The "lazyLazy" instance of lazyload is used
        // to check when the .horzContainer divs enter the viewport
        var lazyLazy = new LazyLoad({
            elements_selector: ".horzContainer",
            // Assign the callbacks defined above
            callback_enter: callback_enter,
            callback_exit: callback_exit,
            callback_reveal: callback_reveal,
            callback_loaded: callback_loaded,
            callback_error: callback_error,
            callback_finish: callback_finish
        });
        ll = new LazyLoad({
            elements_selector: ".lazy",
            // Assign the callbacks defined above
            callback_enter: callback_enter,
            callback_exit: callback_exit,
            callback_reveal: callback_reveal,
            callback_loaded: callback_loaded,
            callback_error: callback_error,
            callback_finish: callback_finish
        });
    })();
}

//button
{
    function b_func(q) {
        var x = document.getElementById(q);
        if (x.style.display === "none") {
            x.style.display = "flex";
        } else {
            x.style.display = "none";
        }
        if (x.id === 'land_energy') {
            energy_land_chart_draw();
        }
    }
}

//unfold_all
{
    function unfold_all(){
        b_func('Energy_Life_cycle_assessment');
        b_func('Water');
        b_func('Basic information');
        b_func('World_energy_by_source');
        b_func('Energy');
        b_func('Atmosphere');
        b_func('Land');
        b_func('Biodiversity');
        b_func('land_energy');
    }
}

unfold_all();



