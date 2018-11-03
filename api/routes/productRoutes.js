const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/',(req,res,next)=>{
	Product.find()
		   .select('_id name price')
		   .exec()
		   .then(docs=>{
		   		console.log(docs);
		   		const response = {
		   			count:docs.length,
		   			products:docs.map(doc=>{
		   				return {
		   					_id:doc._id,
		   					name:doc.name,
		   					price:doc.price,
		   					request:{
		   						type:'GET',
		   						descripption:'Get details of the product.',
		   						 url: "http://localhost:3000/products/" + doc._id
		   					}
		   				}
		   			})
		   		}
		   		res.status(200).json(response);
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error:err
		   		});
		   });
});

router.post('/',(req,res,next)=>{
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name:req.body.name,
		price : req.body.price
	});

	product.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message : 'Product Created Successfully!!',
			createdProduct:{
				_id:result._id,
				name:result.name,
				price:result.price,
				request:{
					type:"GET",
					description:"Get details of the product",
					url:'http://localhost:3000/products/' + result._id
				}
			}
		});
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});
});

router.get('/:productId',(req,res,next)=>{
	var id = req.params.productId;
	Product.findById(id)
		   .select('_id name price')
		   .exec()
		   .then(doc=>{
		   		console.log(doc);
		   		if(doc){
		   			res.status(200).json({
		   				product:doc,
		   				request:{
		   					type:'GET',
		   					description:'Get list of all products',
		   					url:'http://localhost:3000/products'
		   				}
		   			});
		   		}
		   		else{
		   			res.status(404).json({
		   				message:"No such Product Found!!"
		   			});
		   		}
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error:err
		   		});
		   });
});

router.patch('/:productId',(req,res,next)=>{
	const id = req.params.productId;
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id:id},{$set:updateOps})
		   .exec()
		   .then(result=>{
		   		res.status(200).json({
		   			message:"Product Updated Successfully",
		   			request:{
		   				type:'GET',
		   				description:'Get product details.',
		   				url:'http://localhost:3000/products' + id
		   			}
		   		});
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json(err=>{
		   			console.log(err);
		   			res.status(500).json({
		   				error:err
		   			});
		   		})
		   });
});

router.delete('/:productId',(req,res,next)=>{
	const id = req.params.productId;
	Product.remove({_id:id})
		   .exec()
		   .then(result =>{
		   		res.status(200).json({
		   			message:'Product Deleted',
		   			request:{
		   				type:'POST',
		   				description:'Create new Product',
		   				url:'http://localhost:3000/products',
		   				body:{
		   					name:'String',
		   					price:'Number'
		   				}
		   			}
		   		});
		   })
		   .catch(err=>{
		   		console.log(err);
		   		res.status(500).json({
		   			error : err
		   		});
		   });
});

module.exports = router;