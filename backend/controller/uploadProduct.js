const uploadProductPermission = require("../helpers/permission");
const productModel = require("../modules/productModel");

async function UploadProductController(req, res) {
    try{
        const sessionUserId = req.sessionUserId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
module.exports = UploadProductController