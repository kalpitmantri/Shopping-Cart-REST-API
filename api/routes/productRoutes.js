const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productComponents = require('../components/product');

router.get('/',productComponents.getAllProducts);

router.post('/',checkAuth,productComponents.postNewProduct);

router.get('/:productId',productComponents.getProduct);

router.patch('/:productId',checkAuth,productComponents.updateProduct);

router.delete('/:productId',checkAuth,productComponents.deleteProduct);

module.exports = router;