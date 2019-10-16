const Product = require('../models/Product')

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const productSubcategory = await Product.findOne().populate('subcategory')
console.log('productSubcategory', productSubcategory)
  if(productSubcategory.length > 0){
    const subIds = productSubcategory.map(itm => {
      return itm.subcategory
    })

    console.log('subIds', subIds)
    //ctx.subId = productSubcategory.subcategory 
  }else{
    ctx.body = {products: []};
  }
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find({subcategory: ctx.subId})
  if(products.length > 0){
    ctx.body = {products}
    console.log('products', products)
  }else{
    ctx.body = {products: []};
  }
};

module.exports.productById = async function productById(ctx, next) {
  ctx.body = {product: {}};
};

