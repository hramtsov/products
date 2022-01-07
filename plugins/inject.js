const pproduct = {
	name: 'pproduct',
	calc(products) {
    // 12 месяцев с количеством товаров
    let months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]

    // ключ текущего месяца
    let now = new Date();
    let current_month = months[now.getMonth()]

    // считаем товары в категориях
    products.forEach((product, index) => {
      // products[index].now = product[current_month]
      products[index].max_price = 0

      // Максимальная цена за год
      months.forEach(function(month) {
        let price = parseInt(products[index][month])
        if (products[index].max_price < price) products[index].max_price = price
      })
      
      // размер скидки
      months.forEach(function(month) {
        products[index].now = {
          price: product[current_month],
          discount: (products[index].max_price > 0 && product[current_month] > 0) ? 100 - Math.round(100 / (products[index].max_price / product[current_month])) : 0
        }
      })

      // console.log(product)
    })


		return products
	},
}

const ccategory = {
	name: 'ccategory',
	calc(category, products_) {
		    // 12 месяцев с количеством товаров
        let months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
        // Создаем нулевые значения всех 12 месяцев
        months.forEach(month => {
          category[month] = {
            count: 0,
            price: 0,
            discount: 0,
          }
        })
        
        // считаем товары в категориях
        let products = products_.filter(obj => obj.id_category === category.id)
        products.forEach(product => {
          months.forEach(function(month) {
            category[month].count += 1
            category[month].price += parseInt(product[month])
          }) 
        })

        // считаем категорию
        let min_price = 1000000000000
        let max_price = 0
        months.forEach(month => {
          category[month].price = category[month].count > 0 ? Math.round(category[month].price / category[month].count) : 0
          if (category[month].price < min_price) min_price = category[month].price
          if (category[month].price > max_price) max_price = category[month].price
        })

        // считаем по месяцам размер скидки
        let tops = {
          best: {month: '', discount: 0},
          first: {month: '', discount: 0},
          second: {month: '', discount: 0},
        }
        months.forEach(month => {
          let discount = (max_price > 0 && category[month].price > 0) ? 100 - Math.round(100 / (max_price / category[month].price)) : 0
          category[month].discount = discount
        })

        // находим лучший месяц
        months.forEach(month => {
          if (category[month].discount > tops.best.discount) {
            tops.best = {month: month, discount: category[month].discount}
          }
        })

        // находим второй лучший месяц
        months.forEach(month => {
          if (category[month].discount > tops.first.discount && month != tops.best.month) { //  
            tops.first = {month: month, discount: category[month].discount}
          }
        })

        // находим третий лучший месяц
        months.forEach(month => {
          if (category[month].discount > tops.second.discount && month != tops.best.month && month != tops.first.month) { //  
            tops.second = {month: month, discount: category[month].discount}
          }
        })



        // устанавливаем ярлыки по месяцам
        months.forEach(month => {
          category[month].best = (month === tops.best.month && tops.best.discount > 0) ? true : false
          category[month].profitable = ((month === tops.first.month && tops.first.discount > 0) || (month === tops.second.month  && tops.second.discount > 0)) ? true : false
        })

        // ключ текущего месяца
        let now = new Date();
        let current_month = months[now.getMonth()]

        category.max_price = max_price
        category.now = category[current_month]

		return category
	},
}

export default ({ app }, inject) => {
	inject('ccategory', ccategory)
  inject('pproduct', pproduct)
}