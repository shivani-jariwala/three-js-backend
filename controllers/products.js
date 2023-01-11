
  const products = [{
    id:1,
    name:'Fleece Jacket',
    price: {
      formatted_with_symbol: 600,
    },
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
   
   const newProduct = products.filter((e) => {
    if(e.id == id){
      return e
    }
   })

   newProduct.name = newName ? newName : newProduct.name;
   newProduct.price.formatted_with_symbol = newPrice ? newPrice :  newProduct.price.formatted_with_symbol;
   newProduct.description = newDescription ? newDescription : newProduct.description;

   res.json({message:'success',products: newProduct})
}

const removeProduct = (req,res) => {
  const id = req.params.id;
  const modifiedProducts = products.filter((e) => {
    if(e.id != id){
      return e
    }
  })
  res.json({message:'success',products: modifiedProducts})
}

module.exports = {
    getAll,
    editProduct,
    removeProduct
  };