const Product = require('../models/Product')

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query; 
  ctx.subcategory = subcategory
  next()
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
    console.log('1111111111111111');
    ctx.status = 200;
    ctx.body = {products: []};
  }
};

module.exports.productById = async function productById(ctx, next) {
  console.log('3333333333333333')
  
  ctx.status = 200;
  ctx.body = {product: {}};
  
};

