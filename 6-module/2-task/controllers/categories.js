const Category = require('../models/Category')
module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();
  if(categories.length > 0) {
    const categoriesArr = categories.map(itm => {
      return {
        id: itm.id,
        title: itm.title,
        subcategories: itm.subcategories.map(itm => {
          return {
            id: itm.id,
            title: itm.title,
          }
        })
      }
    })
    ctx.body = {categories: categoriesArr}
  }else{
    ctx.body = {categories: []};
  }
};
