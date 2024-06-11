const express = require('express')
const router = express.Router();


const {
    getAllItems,
    createItem,
    newItemForm,
    editItem,
    updateItem,
} = require('../controllers/items');
const csrfProtection = require('../middleware/csrfProtection');


router.route('/').get(getAllItems).post(createItem);
router.route('/newItem').get(newItemForm);
router.route('/edit/:id').get(editItem);
router.route('/update/:id').post(updateItem);


module.exports = router