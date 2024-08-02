import userModel from "../models/userModel.js"

// add items to uaer cart 
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) 
            {
                cartData[req.body.itemId] = 1;
            }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove items from user cart
/*const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.boby.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}*/

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Check if userId and itemId are provided
        if (!userId || !itemId) {
            return res.json({ success: false, message: "Invalid input" });
        }

        // Fetch the user data
        let userData = await userModel.findById(userId);

        // Check if user data exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Access cart data from user data
        let cartData = userData.cartData;

        // Check if itemId exists in the cart and the quantity is greater than 0
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            // Update the user's cart data
            await userModel.findByIdAndUpdate(userId, { cartData });

            return res.json({ success: true, message: "Removed From Cart" });
        } else {
            return res.json({ success: false, message: "Item not in cart or quantity is zero" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
};


// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}