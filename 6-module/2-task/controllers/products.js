const Product = require('../models/Product')
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query; 
  ctx.subcategory = subcategory
  await next()
}  

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find({subcategory: ctx.subcategory})

  if(products.length > 0){
     const productsArr = products.map(itm => {
       return {
         id: itm.id,
         title: itm.title,
         images: itm.images,
         category: itm.category,
         subcategory: itm.subcategory,
         price: itm.price,
         description: itm.description,
       }
     })
    ctx.status = 200; 
    ctx.body = {products: productsArr};
  }else{
    ctx.status = 404;
    ctx.body = {products: []};
  }
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400, 'невалидный id');
  const product = await Product.findById(ctx.params.id)
  if(!product) ctx.throw(404, 'такого товара не существует')
  const parsedProduct = {
    id: product.id,
    images: product.images,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    subcategory: product.subcategory,
  }

  ctx.status = 200;
  ctx.body = {product: parsedProduct}
};

