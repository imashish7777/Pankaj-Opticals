// const express= require("express");
const productModel = require("../Models/Product.model");
const AsynceHandler = require("express-async-handler");
const userModel = require("../Models/User.model");
const cartModel = require("../Models/Cart.model");
const { validateMongoDbId } = require("../utils/validateMongodbid");
const couponModel = require("../Models/Coupon.model");

//ADMIN ROUTE=============================================================================================================>

/////PRODUCT FETCH//===============================================================================================>
//150-200ms//
function scramble(string1, string2) {
  return string2?.split("").every(function (character) {
    return string1?.includes(character);
  });
  // return string1.includes(string2);
}

module.exports.FETCH_PRODUCT = AsynceHandler(async (req, res) => {
  //only do when searching string is not empty//
  const lengthofSearch = req.body?.searchstring?.length;

  if (lengthofSearch > 0) {
    let seachtext1 = req.body.searchstring;

    const searchtext = seachtext1
      ?.replace(
        /and|And|or|Or|with|color|show|me|some|cool|[^a-zA-Z ]|[^\w\s]|(.)\1/g,
        ``
      )
      .split(" ");

    const words = searchtext?.filter((str) => str !== "");

    const properties = await PropertiesModel.find();

    if (properties?.length > 0 && words) {
      var brands = properties[0].brands;
      var categories = properties[0].categories;
      var colors = properties[0].colors;
      var frameTypes = properties[0].frameTypes;
      var sizes = properties[0].sizes;
      var shapes = properties[0].shapes;
      var genders = properties[0].genders;
      var category1 = [];
      var Brand1 = [];
      var color1 = [];
      var shape1 = [];
      var size1 = [];
      var gender1 = [];
      var frameType1 = [];
      for (let i = 0; i < words?.length; i++) {
        for (let j = 0; j < categories?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(categories[j]?.toLocaleLowerCase(), regex)) {
            category1.push({ category: categories[j] });
            break;
          }
        }
        for (let j = 0; j < brands?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(brands[j]?.toLocaleLowerCase(), regex)) {
            Brand1.push({ Brand: brands[j] });
            break;
          }
        }
        for (let j = 0; j < colors?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(colors[j]?.toLocaleLowerCase(), regex)) {
            color1.push({ color: colors[j] });
            break;
          }
        }
        for (let j = 0; j < frameTypes?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(frameTypes[j]?.toLocaleLowerCase(), regex)) {
            frameType1.push({ frameType: frameTypes[j] });
            break;
          }
        }
        for (let j = 0; j < sizes?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(sizes[j]?.toLocaleLowerCase(), regex)) {
            size1.push({ size: sizes[j] });
            break;
          }
        }
        for (let j = 0; j < shapes?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(shapes[j]?.toLocaleLowerCase(), regex)) {
            shape1.push({ shape: shapes[j] });
            break;
          }
        }
        for (let j = 0; j < genders?.length; j++) {
          const regex = words[i].toLocaleLowerCase();

          if (scramble(genders[j]?.toLocaleLowerCase(), regex)) {
            gender1.push({ gender: genders[j] });
            break;
          }
        }
      }
    }

    ///filtering///

    var queryArray = [];
    //frameType union//
    if (req.body?.frameType) {
      let frameTypeObj = {};

      const union = [...new Set([...req.body.frameType, ...frameType1])];
      if (union.length > 0) {
        frameTypeObj.$or = union;

        queryArray.push(frameTypeObj);
      }
    }

    //color union//
    if (req.body?.color) {
      let colorObj = {};
      const union = [...new Set([...req.body.color, ...color1])];

      if (union.length > 0) {
        colorObj.$or = union;
        queryArray.push(colorObj);
      }
    }

    // //shape union//
    if (req.body?.shape) {
      let shapeObj = {};
      const union = [...new Set([...req.body.shape, ...shape1])];

      if (union.length > 0) {
        shapeObj.$or = union;
        queryArray.push(shapeObj);
      }
    }

    // // //Brand union
    if (req.body?.Brand) {
      let BrandObj = {};
      const union = [...new Set([...req.body.Brand, ...Brand1])];

      if (union.length > 0) {
        BrandObj.$or = union;
        queryArray.push(BrandObj);
      }
    }

    // // //size union
    if (req.body?.size) {
      let sizeObj = {};
      const union = [...new Set([...req.body.size, ...size1])];

      if (union.length > 0) {
        sizeObj.$or = union;
        queryArray.push(sizeObj);
      }
    }

    // //sizeunion
    if (req.body?.category) {
      let categoryObj = {};

      const union = [...new Set([...req.body.category, ...category1])];

      if (union.length > 0) {
        categoryObj.$or = union;
        queryArray.push(categoryObj);
      }
    }

    // //gender union
    if (req.body?.gender) {
      let genderObj = {};
      const union = [...new Set([...req.body.gender, ...gender1])];

      if (union.length > 0) {
        genderObj.$or = union;
        queryArray.push(genderObj);
      }
    }
  } else {
    var queryArray = [];
    //frameType union//
    if (req.body?.frameType.length > 0) {
      let frameTypeObj = {};

      frameTypeObj.$or = req.body?.frameType;

      queryArray.push(frameTypeObj);
    }

    //color union//
    if (req.body?.color.length > 0) {
      let colorObj = {};

      colorObj.$or = req.body?.color;
      queryArray.push(colorObj);
    }

    // //shape union//
    if (req.body?.shape.length > 0) {
      let shapeObj = {};

      shapeObj.$or = req.body?.shape;
      queryArray.push(shapeObj);
    }

    // // //Brand union
    if (req.body?.Brand.length > 0) {
      let BrandObj = {};

      BrandObj.$or = req.body?.Brand;
      queryArray.push(BrandObj);
    }

    // // //size union
    if (req.body?.size.length > 0) {
      let sizeObj = {};

      sizeObj.$or = req.body?.size;
      queryArray.push(sizeObj);
    }

    // //sizeunion
    if (req.body?.category.length > 0) {
      let categoryObj = {};

      categoryObj.$or = req.body?.category;
      queryArray.push(categoryObj);
    }

    // //gender union
    if (req.body?.gender.length > 0) {
      let genderObj = {};

      genderObj.$or = req.body?.gender;
      queryArray.push(genderObj);
    }
  }

  //sorting
  if (req.body.sortby) {
    var sortbyObj = {};
    if (req.body.sortby === "R") {
      sortbyObj = { sold: 1, productId: 1 };
    }
    if (req.body.sortby === "HtL") {
      sortbyObj = { mPrice: -1, productId: 1 };
    }
    if (req.body.sortby === "LtH") {
      sortbyObj = { mPrice: 1, productId: 1 };
    }
    if (req.body.sortby === "CR") {
      sortbyObj = { totolratings: -1, productId: 1 };
    }
    if (req.body.sortby === "WN") {
      sortbyObj = { date_added: -1, productId: 1 };
    }
  } else {
    sortbyObj = { sold: -1, productId: 1 };
  }
  const { current } = req.body;
  const limit = 20;
  const skip = limit * (current - 1);

  if (queryArray?.length > 0) {
    try {
      const totalproduct = await productModel.find({
        $and: queryArray,
      });

      let finalproducts = {};

      finalproducts.count = totalproduct?.length;
      finalproducts.limit = limit;

      finalproducts.products = await productModel
        .find({
          $and: queryArray,
        })
        .skip(skip)
        .limit(limit)
        .sort(sortbyObj);
      res.json(finalproducts);
    } catch (error) {
      throw new Error(error);
    }
  } else {
    try {
      let finalproducts = {};
      finalproducts.limit = limit;
      finalproducts.count = await productModel.countDocuments();

      finalproducts.products = await productModel
        .find()
        .sort(sortbyObj)
        .limit(limit)
        .skip(skip);
      res.json(finalproducts);
    } catch (error) {
      throw new Error(error);
    }
  }
});

//FETCH_HOME_PRODUCT
module.exports.FETCH_HOME_PRODUCT = AsynceHandler(async (req, res) => {
  const category = req.params.category;
  const gender = req.params.gender;

  var limit = 12;
  if (req.params.category === "Eyeglasses") {
    limit = 10;
  }

  try {
    const product = await productModel
      .find({
        $and: [
          { category: category },
          {
            gender: gender,
          },
        ],
      })
      .limit(limit);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

///FETCH_ONE_PRODUCT///
module.exports.FETCH_ONE_PRODUCT = AsynceHandler(async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1,
        },
      },

      {
        sold: 0,
        quantity: 0,
        date_added: 0,
        __v: 0,
      },
      {
        new: true,
      }
    );

    res.send(product);
  } catch {
    res.json("BAD REQUEST  ");
  }
});

module.exports.FETCH_SIMILAR_PRODUCTS = AsynceHandler(async (req, res) => {
  try {
    const similarProudct = await productModel.find(req.body);
    res.json(similarProudct);
  } catch (error) {
    throw new Error(error);
  }
});

///////GIVE RATINGS////

module.exports.FETCH_RATINGS = AsynceHandler(async (req, res) => {
  try {
    const ratings = await productModel
      .findById(req.params.id, {
        ratings: 1,
      })
      .lean()
      .populate("ratings.postedby", {
        firstname: 1,
        lastname: 1,
      });
    res.send(ratings);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports.GIVE_RATINGS = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { rating, productId, comment } = req.body;
  try {
    const product = await productModel.findById(productId);

    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await productModel.updateOne(
        { ratings: { $elemMatch: { postedby: _id } } },

        {
          $set: { "ratings.$.star": rating, "ratings.$.comment": comment },
        },

        {
          new: true,
        }
      );
      const finalratings = await productModel
        .findById(productId, { ratings: 1 })
        .lean()
        .populate("ratings.postedby", {
          firstname: 1,
          lastname: 2,
        });
      res.send(finalratings);
    } else {
      const totalratings =(
        ((product.totolratings * product.ratings.length) + Number(rating)) /
        (product.ratings.length + 1)).toFixed(1);

      const rateProduct = await productModel.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: { star: rating, comment: comment, postedby: _id },
          },
          $set: { totolratings: totalratings },
        },

        {
          new: true,
        }
      );
      const finalratings = await productModel
        .findById(productId, { ratings: 1, totolratings: 1 })
        .lean()
        .populate("ratings.postedby", {
          firstname: 1,
          lastname: 2,
        });
      res.send(finalratings);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//========================================================================================WISHLIST/===========================================================================>

///////FETCH_WISHLIST///
module.exports.FETCH_WISHLIST = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await userModel
      .findById(_id)
      .select("wishlist")
      .populate("wishlist", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        rating: 0,
        category: 0,
      });
    res.send(user.wishlist);
  } catch (error) {
    res.sendStatus(500);
  }
});

/////ADD_TO_WISLIST///
module.exports.ADD_TO_WISHLIST = AsynceHandler(async (req, res) => {
  const _id = req.user._id;

  validateMongoDbId(_id);
  const { productId } = req.body;
  try {
    let user = await userModel
      .findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        { new: true }
      )
      .populate("wishlist", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        rating: 0,
        category: 0,
      });

    await user.save();
    res.json(user.wishlist);
    await productModel.findByIdAndUpdate(
      { _id: productId },
      {
        $push: { wishlists: _id },
        $inc: { wishlistcount: 1 },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

/////REMOVE_FROM_WISHLIST///
module.exports.REMOVE_FROM_WISHLIST = AsynceHandler(async (req, res) => {
  const _id = req.user._id;
  validateMongoDbId(_id);
  const { productId } = req.body;
  try {
    let user = await userModel
      .findByIdAndUpdate(_id, { $pull: { wishlist: productId } }, { new: true })
      .populate("wishlist", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        rating: 0,
        category: 0,
      });
    await user.save();
    res.json(user.wishlist);
    await productModel.findByIdAndUpdate(
      { _id: productId },
      {
        $pull: { wishlists: _id },
        $inc: { wishlistcount: -1 },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

///===================================================================================CART_ROUTE========================================================================================>
//////FETCH_CART////
//150-250ms//
module.exports.FETCH_CART = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await cartModel
      .findOne({ orderby: _id })
      .populate("products.product");

    if (cart) {
      res.json(cart);
    } else {
      res.json({});
    }
  } catch {
    res.sendStatus(500);
  }
});

///ADD_TO_CART///
//150-250ms//
module.exports.ADD_TO_CART = AsynceHandler(async (req, res) => {
  const { productId, mPrice } = req.body;
  const _id = req.user._id;
  validateMongoDbId(_id);

  try {
    const Cart = await cartModel
      .findOne({ orderby: _id }, { orderby: 0, __v: 0 })
      .populate("products.product", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        rating: 0,
        category: 0,
      });

    if (Cart) {
      let itemIndex = Cart.products.findIndex(
        (p) => p.product._id == productId
      );

      // Check if product exists or not
      if (itemIndex > -1) {
        var productItem = Cart.products[itemIndex];
        productItem.quantity = productItem.quantity + 1;
        Cart.products[itemIndex] = productItem;
        Cart.cartTotal += mPrice;

        if (Cart.CouponApplied) {
          Cart.totalAfterDiscount =
            Cart.cartTotal -
            (Cart.cartTotal * Cart.CouponApplied.discount) / 100;

          if (Cart.totalAfterDiscount > Cart.CouponApplied.upTo) {
            Cart.totalAfterDiscount = Cart.cartTotal - Cart.CouponApplied.upTo;
          }
        }
        await productModel.findByIdAndUpdate(
          productId,
          {
            $inc: { "carts.$[i].count": 1 },
            $inc: { cartcount: 1 },
          },
          {
            arrayFilters: [
              {
                "i.user": _id,
              },
            ],
          }
        );
      } else {
        res.send({});
        Cart.products.push({ product: productId, quantity: 1 });

        Cart.cartTotal += mPrice;
        if (Cart.CouponApplied) {
          Cart.totalAfterDiscount =
            Cart.cartTotal -
            (Cart.cartTotal * Cart.CouponApplied.discount) / 100;

          if (Cart.totalAfterDiscount > Cart.CouponApplied.upTo) {
            Cart.totalAfterDiscount = Cart.cartTotal - Cart.CouponApplied.upTo;
          }
          Cart.Total = Cart.totalAfterDiscount;
        }
        await productModel.findByIdAndUpdate(
          { _id: productId },
          {
            $push: { carts: { user: _id, count: 1 } },
          }
        );
      }
      await Cart.save();
    } else {
      res.send({});

      const cart = await cartModel.create({
        products: [{ product: productId, quantity: 1 }],
        cartTotal: mPrice,
        orderby: _id,
      });

      const user = await userModel.findById(_id);
      user.cart = cart._id;
      await user.save();
      await productModel.findByIdAndUpdate(
        { _id: productId },
        {
          $inc: { cartcount: 1 },
          $push: { carts: { user: _id, count: 1 } },
        }
      );
    }
  } catch {
    res.json("BAD REQUEST");
  }
});

//EMPTY_CART////
module.exports.EMPTY_CART = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    res.json({});

    const user = await userModel.findByIdAndUpdate(_id, {
      $unset: { cart: 1 },
    });
    const cart1 = await cartModel.findOne({ orderby: _id });
    if (cart1) {
      cart1.products.map(async (i) => {
        await productModel.findByIdAndUpdate(i.product, {
          $pull: {
            carts: { user: _id },
          },
          $inc: {
            cartcount: -i.quantity,
          },
        });
      });
    }

    await cartModel.findOneAndDelete({ orderby: _id });
  } catch (error) {
    throw new Error(error);
  }
});

///REMOVE_FROM_CART///
//150-250ms//
module.exports.REMOVE_FROM_CART = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { mPrice, productId } = req.body;

  try {
    let cart = await cartModel
      .findOne({ orderby: _id })
      .populate("products.product", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        ratings: 0,
        category: 0,
      });
    let itemIndex = cart.products.findIndex((p) => p.product._id == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.cartTotal -= productItem.quantity * mPrice;
      var sum = productItem.quantity;
      cart.products[itemIndex] = productItem;

      cart.products.splice(itemIndex, 1);
      if (cart.CouponApplied) {
        cart.totalAfterDiscount =
          cart.cartTotal - (cart.cartTotal * cart.CouponApplied.discount) / 100;

        if (
          cart.cartTotal - cart.totalAfterDiscount >
          cart.CouponApplied.upTo
        ) {
          cart.totalAfterDiscount = cart.cartTotal - cart.CouponApplied.upTo;
        }
      }
      if (cart.cartTotal === 0) {
        res.json({});
        await userModel.findByIdAndUpdate(_id, {
          $unset: { cart: 1 },
        });
        await cartModel.findOneAndDelete({ orderby: _id });
      } else {
        cart = await cart.save();
        res.json(cart);
      }
      await productModel.findByIdAndUpdate(
        { _id: productId },
        {
          $pull: { carts: { user: _id } },

          $inc: { cartcount: -sum },
        }
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

////DECREMENT_CART_PRODUCT_QUANTITY
//150-250ms//
module.exports.DECREMENT = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const quantity = 1;

  const { mPrice, productId } = req.body;

  try {
    let cart = await cartModel
      .findOne({ orderby: _id })
      .populate("products.product", {
        date_added: 0,
        __v: 0,
        sold: 0,
        quantity: 0,
        ratings: 0,
        category: 0,
      });
    let itemIndex = cart.products.findIndex((p) => p.product._id == productId);

    let productItem = cart.products[itemIndex];
    productItem.quantity -= quantity;
    cart.cartTotal -= mPrice;
    cart.products[itemIndex] = productItem;
    if (cart.CouponApplied) {
      cart.totalAfterDiscount =
        cart.cartTotal - (cart.cartTotal * cart.CouponApplied.discount) / 100;

      if (cart.cartTotal - cart.totalAfterDiscount > cart.CouponApplied.upTo) {
        cart.totalAfterDiscount = cart.cartTotal - cart.CouponApplied.upTo;
      }
    }

    cart = await cart.save();
    res.send(cart);

    await productModel.findByIdAndUpdate(
      productId,
      {
        $inc: { "carts.$[i].count": -1, cartcount: -1 },
      },
      {
        arrayFilters: [
          {
            "i.user": _id,
          },
        ],
      }
    );
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

///increment///
module.exports.INCREMENT = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const quantity = 1;

  const { mPrice, productId } = req.body;

  try {
    let cart = await cartModel
      .findOne({ orderby: _id })
      .populate("products.product");
    let itemIndex = cart.products.findIndex((p) => p.product._id == productId);
    let productItem = cart.products[itemIndex];
    productItem.quantity += quantity;
    cart.cartTotal += mPrice;
    cart.products[itemIndex] = productItem;
    if (cart.CouponApplied) {
      cart.totalAfterDiscount =
        cart.cartTotal + (cart.cartTotal * cart.CouponApplied.discount) / 100;

      if (cart.cartTotal + cart.totalAfterDiscount > cart.CouponApplied.upTo) {
        cart.totalAfterDiscount = cart.cartTotal + cart.CouponApplied.upTo;
      }
    }

    cart = await cart.save();
    res.send(cart);

    await productModel.findByIdAndUpdate(
      productId,
      {
        $inc: { "carts.$[i].count": 1, cartcount: 1 },
      },
      {
        arrayFilters: [
          {
            "i.user": _id,
          },
        ],
      }
    );
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

///APPLY_COUPON///
//400-600ms//
module.exports.APPLY_COUPON = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { coupon } = req.body;

  const validCoupon = await couponModel.findOne({ name: coupon });
  if (validCoupon === null) {
    // throw new Error("invalid Coupon");
    res.json("COUPON EXPIRED");
  } else {
    const user = await userModel.findOne({ _id });
    let { cartTotal } = await cartModel
      .findOne({
        orderby: _id,
      })
      .populate("products.product");
    let discount = (cartTotal * validCoupon.discount) / 100;
    if (discount > validCoupon.upTo) {
      discount = validCoupon.upTo;
    }
    let totalAfterDiscount = (cartTotal - discount).toFixed(2);

    const cart = await cartModel
      .findOneAndUpdate(
        { orderby: user._id },
        {
          totalAfterDiscount: totalAfterDiscount,
          CouponApplied: validCoupon,
        },
        { new: true }
      )
      .populate("products.product");

    res.json(cart);
  }
});

///REMOVE_COUPON///
//200-300ms//
module.exports.REMOVE_COUPON = AsynceHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    var cart = await cartModel
      .findOneAndUpdate(
        { orderby: _id },
        {
          $unset: { totalAfterDiscount: 1, CouponApplied: 1 },
        },
        { new: true }
      )
      .populate("products.product");
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
