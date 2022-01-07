<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">В этом месяце мы рекомендуем к покупке</h2>
       <div class="text-gray-500 leading-6 text-sm w-2/3 mt-2">
        <p class="mb-2">Цены на товары каждый день меняются и зачастую очень сильно. Мы заметили, что люди совершают покупки чаще всего не в самый выгодный момент. Поэтому мы разработали простой сервис, который подскажет вам в какой месяц товары каких категорий максимально выгодно приобретать. Мы за концепцию «готовь сани летом, а телегу зимой»</p>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="category in categories" :key="category.id" class="group relative">
          <div class="related w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-none">

            <span class="absolute bg-red-600 text-white px-2 py-1 rounded-2xl text-sm right-5 top-4 flex flex-row items-center" v-if="category.now.best">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              {{ category.now.discount }}<small class="ml-0.5">%</small>
            </span>
            <span class="absolute bg-violet-700 text-white px-2 py-1 rounded-2xl text-sm right-5 top-4 flex flex-row items-center" v-if="category.now.profitable">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span class="text-1xl font-medium">{{ category.now.discount }}</span><small class="ml-0.5">%</small>
            </span>

            <img :src="category.image" :alt_="category.title" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm_ text font-medium text-gray-800">
                
                <n-link :to="`/${category.id}`" no-prefetch >
                  <span aria-hidden="true" class="absolute inset-0" /> 
                  {{ category.title }}
                </n-link>
              </h3>
              <p class="text-sm text-gray-400">{{ category.description }}</p>
            </div>
            <!-- <p class="text-sm font-medium text-gray-900">{{ category.now.discount }}%</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head: {
        title: 'Выгодно покупай',
    },

    data() {
      return {
        categories: []
      }
    },

    async asyncData({ $content, params, app }) {
      let categories_ = await $content('csv', 'categories').fetch()
      let products_ = await $content('csv', 'products').fetch()

      let categories = []
      categories_.body.forEach(category => {
        // считаем скидки
        category = app.$ccategory.calc(category, products_.body)

        if (category.now.best || category.now.profitable)
          categories.push(category)
      });

      return { categories: categories }
    },

  }
</script>