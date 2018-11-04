const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderComponents = require('../components/order');

router.get('/',checkAuth,orderComponents.getAllOrders);

router.post('/',checkAuth,orderComponents.postNewOrder);

router.get('/:orderId',checkAuth,orderComponents.getOrder);

router.delete('/:orderId',checkAuth,orderComponents.deleteOrder);

module.exports = router;
