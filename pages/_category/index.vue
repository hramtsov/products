<template>

    
    <div class="max-w-2xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">

        <h2 class="text-3xl font-bold tracking-tight text-gray-900 flex flex-row items-center" >
            <n-link to="/" no-prefetch >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-5 text-gray-600 hover:text-gray-500 transition duration-150 ease-out hover:ease-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
            </n-link>
            {{ category.title }}
        </h2>
        <div class="text-gray-500 text-sm">
            {{ category.description }}
        </div>

        <div class="my-10">
            <h2 class="text-1xl font-bold tracking-tight text-gray-900" >Годовой график скидок на товары категории</h2>
            <div class="text-gray-500 text-sm mb-2">Усредненные значения, среди популярных товаров категории «{{ category.title }}»</div>
            <client-only>
                <highcharts :options="graph" ></highcharts>
            </client-only>
        </div>


        <div class="mt-14" v-if="products.length > 0" >
            <h2 class="text-1xl font-bold tracking-tight text-gray-900" >Популярные товары</h2>
            <div class="text-gray-500 text-sm mb-5">В категории «{{ category.title }}»</div>

            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Товар
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Текущая цена
                            </th>
                            <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                            </th> -->
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Текущая скидка
                            </th>
                            <!-- <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                            </th> -->
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">

                        <tr v-for="product in products" :key="product.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-16 w-16">
                                    <img class="h-16 w-16 rounded-full" :src="product.image" alt="" />
                                </div>
                                <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                    {{ product.title }}
                                </div>
                                <div class="text-sm text-gray-500">
                                    {{ product.brand }}
                                </div>
                                </div>
                            </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 ">{{ product.now.price }} Р</div>
                            <div class="text-sm text-gray-400 line-through">{{ product.max_price }}</div>
                            </td>
                            <!-- <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                            </td> -->
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ product.now.discount }}%
                            </td>
                            <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td> -->
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>

        </div>


    </div>

</template> 



<script>
import { csv } from 'd3-request';
import Highcharts from 'highcharts';

export default {
    head: {
        title: 'Категория',
    },
    data() {
        return {
            categories: [],
            category: {},
            products: [],
            
            graph_data: [],
            graph: {

                chart: {
                    type: 'spline',
                    // scrollablePlotArea: {
                    //     minWidth: 600,
                    //     scrollPositionX: 1
                    // }
                },
                plotOptions: {
                    spline: {
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 3
                            }
                        },
                        // marker: {
                        //     enabled: false
                        // },
                        // pointInterval: 3600000, // one hour
                        // pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
                    }
                },

                    legend: {
            enabled: false
        },

                    // navigator: {
                    //     enabled: true
                    // },   
                    // rangeSelector: {
                    //     enabled: false,
                    // },
                    xAxis: {
                        alternateGridColor: 'rgba(200, 200, 200, 0.07)',
                        categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        // type: 'datetime',
                        // labels: {
                        //     format: '{value: %e %b}'
                        // },
                    },
                    yAxis: [
                        {
                            min: 0,
                            max: 100,
                            gridLineColor: "rgba(200, 200, 200, 0.2)",
                            gridLineWidth: 1,
                            title: {
                                text: null,
                            },
                            // labels: {
                            //     formatter: function () {
                            //         let value = this.value
                            //         return  this.axis.defaultLabelFormatter.call(this) + " ₽";
                            //         // return  value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') + ' ₽';
                            //     },
                            // },
                        }
                    ],
                    tooltip: {
                        shared: true
                    },

                    series: [{
                        name: 'Средний размер скидок',
                        // type: 'line',
                        yAxis: 0,
                        // data: [12000, 7800, 8200, 9200, 9100, 9800, 11000, 11200, 9800, 12500, 10500, 11700],
                        tooltip: {
                            valueSuffix: '%'
                        },
                        color: '#FC515F',
                    }],

            }
        }
    },

    async asyncData({ $content, $route, params, app }) {
        let categories = await $content('csv', 'categories').fetch()
        let category = categories.body.find(obj => obj.id === params.category)

        let products = await $content('csv', 'products').fetch()
        products = products.body.filter(obj => obj.id_category === params.category)
        products = app.$pproduct.calc(products)

        // считаем скидки
        category = app.$ccategory.calc(category, products)

        let months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
        let graph = months.map(function(month) { return category[month].discount })

        return { category: category, products: products, graph_data: graph }
    },

    created() {
        this.graph.series[0].data = this.graph_data
    },

    methods: {
     
    },

}


</script>