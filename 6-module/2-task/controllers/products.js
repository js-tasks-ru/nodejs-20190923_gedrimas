const Product = require('../models/Product')

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const productSubcategory = await Product.find().populate('subcategory')
  console.log('SUB', productSubcategory)
  if(productSubcategory.length > 0){
    ctx.subId = productSubcategory.subcategory 
  }else{
    ctx.body = {products: []};
  }
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find({subcategory: ctx.subId})
  if(products.length > 0){
    ctx.body = {products}
  }else{
    ctx.body = {products: []};
  }
};

module.exports.productById = async function productById(ctx, next) {
  ctx.body = {product: {}};
};

