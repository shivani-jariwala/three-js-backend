
  const products = [{
    id:1,
    name:'Fleece Jacket',
    price: 600,
    description: 'Be better prepared for anything Mother Nature can throw at you with this fleece jacket. When you step outside and find adventure, know that this jacket will keep you feeling nice and toasty',
    permalink:'jacket',
    quantity:1,
    variant: 'color'
  }]

const getAll = (req, res) => {
  res.json({message:'success',products})
};

const editProduct = (req,res) => {
  const { 
    newName,
    newPrice,
    newDescription,
    id
   } = req.body;
   console.log("params",newName,newPrice,newDescription)
   const newProduct = products.filter((e) => {
    if(e.id == id){
      return e
    }
   })

   newProduct[0].name = newName ? newName : newProduct[0].name;
   newProduct[0].price = newPrice ? newPrice: newProduct[0].price;
   newProduct[0].description = newDescription ? newDescription : newProduct[0].description;
   console.log("new product",newProduct)
   res.json({message:'success',products: newProduct})
}

const removeProduct = (req,res) => {
  const id = req.query.id;
  console.log("id",id)
  // const modifiedProducts = products.filter((e) => {
  //   if(e.id != id){
  //     return e
  //   } 
  // })
  products.pop()
  // console.log("mod",modifiedProducts)
  res.json({message:'success'})
}

module.exports = {
    getAll,
    editProduct,
    removeProduct
  };