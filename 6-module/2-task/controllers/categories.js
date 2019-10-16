const Category = require('../models/Category')
module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();
  if(categories.length > 0) {
    ctx.body = {categories}
    //console.log('BODY', ctx.body)
  }else{
    ctx.body = {categories: []};
  }
};
