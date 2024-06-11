 async function userLogout(req, res){
    try{
        console.log('Logout request received'); // Add this log
        res.clearCookie("token");
        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        });
    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userLogout;
