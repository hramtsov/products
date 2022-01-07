import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import Stock from "highcharts/modules/stock";
import more from 'highcharts/highcharts-more'

Stock(Highcharts);
more(Highcharts);

Highcharts.setOptions({
	// time: {
	// 	// timezone: "Europe/Moscow"
	// 	timezoneOffset: - 3 * 60
	// },
	credits: {
		enabled: false,
	},
    title: {
        text: null, 
    },

    // colorAxis:[{
    //     gridLineColor: 'red',
    // }],

	chart: {

		style: {
			// fontFamily: 'Montserrat, Helvetica'
		},
        spacingBottom: 20,
        spacingLeft: 20,
        spacingRight: 20,
        spacingTop: 20,
	}, 

    // navigator: {
    //     adaptToUpdatedData: false,
    //     series: {
    //         data: data
    //     }
    // },

    scrollbar: {
        liveRedraw: false
    },

    // rangeSelector: {
    //     buttons: [{
    //         type: 'hour',
    //         count: 1,
    //         text: '1h'
    //     }, {
    //         type: 'day',
    //         count: 1,
    //         text: '1d'
    //     }, {
    //         type: 'month',
    //         count: 1,
    //         text: '1m'
    //     }, {
    //         type: 'year',
    //         count: 1,
    //         text: '1y'
    //     }, {
    //         type: 'all',
    //         text: 'All'
    //     }],
    //     inputEnabled: false, // it supports only days
    //     selected: 4 // all
    // },

    plotOptions: {
        column: {
            borderRadius: 4
        },
        // series: {
        //     showInNavigator: true // Global value
        // }
    },

	tooltip: {
		// dateTimeLabelFormats: {},
		// useHTML: true
		// borderColor: 'black',
		backgroundColor: '#43435F',
		borderWidth: 0,
		borderRadius: 10,
		shadow: false,
		padding: 10,
		style: {
			color: '#fff',
            fontSize: 12,
		},
        // shared: true,
	},
	lang: {
		loading: 'Загрузка...',
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
		exportButtonTitle: "Экспорт",
		printButtonTitle: "Печать",
		rangeSelectorFrom: "С",
		rangeSelectorTo: "По",
		rangeSelectorZoom: "Период",
		downloadPNG: 'Скачать PNG',
		downloadJPEG: 'Скачать JPEG',
		downloadPDF: 'Скачать PDF',
		downloadSVG: 'Скачать SVG',
		printChart: 'Напечатать график'
	}
});

Vue.use(HighchartsVue, {
	highcharts: Highcharts
})