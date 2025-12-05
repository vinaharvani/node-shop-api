const express = require('express');
const router = express.Router();
const multer = require('multer'); // alternative of body-parser package , form data body parser
const checkAuth = require('../middleware/check-auth')

const ProductControllers = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, timestamp + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/', ProductControllers.get_all_products );


router.post('/', checkAuth, upload.single('productImage'), ProductControllers.products_create_product);


router.get('/:productId', ProductControllers.products_get_product);


router.patch('/:productId', checkAuth, ProductControllers.products_update_product);

router.delete('/:productId', checkAuth, ProductControllers.products_delete_product );

module.exports = router;