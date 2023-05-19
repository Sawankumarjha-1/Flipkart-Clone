const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { request } = require("express");
// const env = require("dotenv");
// env.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const port = 5000;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/ecommerce");
// ************************* All the Schema related to the Ecommerce project are here **************
const Signup = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  datetime: { type: String, default: new Date().toLocaleDateString() },
  cartitems: [],
  savelaters: [],
});
const Orders = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  pincode: String,
  quantity: String,
  flat: String,
  apartment: String,
  nearest: String,
  paymentmode: String,
  orderitemids: [],
});
const Product = new mongoose.Schema({
  category_name: String,
  slug_name: String,
  sub_categroy: [],
});
const Category = new mongoose.Schema({
  Category: String,
  image: String,
  Sub_category: [],
});
const Offers = new mongoose.Schema({
  title: String,
  link: String,
});
const Carousel = new mongoose.Schema({
  item_name: String,
  image: String,
  about: String,
  link: String,
});
const SeparateProducts = new mongoose.Schema({
  name: String,
  Rating: String,
  Price: String,
  Warranty: String,
  Color: String,
  Highlights: {
    feature_1: String,
    feature_2: String,
    feature_3: String,
    feature_4: String,
  },
  Category: String,
  Sub_categroy: String,
  Images: [],
  sub_name: String,
  main_img: String,
  actualprice: Number,
  cutprice: String,
  actualcutprice: Number,
  feedback: [],
});

// ***************************All the model regarding the porfolio project are defined here*********

const SignupModel = new mongoose.model("Users", Signup);
const ProductModel = new mongoose.model("Product", Product);
const OrdersModel = new mongoose.model("Orders", Orders);
const CategoryModel = new mongoose.model("Category", Category);
const CarouselModel = new mongoose.model("CarouselItem", Carousel);
const OfferModel = new mongoose.model("Offers", Offers);
const SeparateProductsModel = new mongoose.model(
  "Products_Without_Categoryies",
  SeparateProducts
);

// ***************************Dealing with individual path

// ********************************************Adding New User
app.post("/newuser", (req, res) => {
  let newUser = new SignupModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  newUser.save();
  res.send("Submitted Successfully...");
});
// ********************************************Getting New User
app.get("/userInfo/:email", (req, res) => {
  SignupModel.find({ email: req.params.email }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting All Category

app.get("/allcategory", (req, res) => {
  CategoryModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting Particuar Category
app.get("/skcart_particular_category", (req, res) => {
  CategoryModel.find(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting All carousel item
app.get("/allcarouselitem", (req, res) => {
  CarouselModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting All Offers
app.get("/alloffers", (req, res) => {
  OfferModel.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting Particular Product Category
app.get("/skcart_products/:productname/:limit", (req, res) => {
  SeparateProductsModel.find(
    {
      Category: req.params.productname,
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  ).limit(req.params.limit);
});

// *****************************************For Getting All Product
app.get("/skcart_products/allproducts", (req, res) => {
  const { sub_name } = req.query;
  const queryobject = {};
  queryobject.sub_name = { $regex: sub_name, $options: "i" };
  SeparateProductsModel.find(queryobject, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Getting Individual Product
app.get("/skcart_products/individualproduct", (req, res) => {
  // console.log(req.query);
  SeparateProductsModel.find(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// ********************************************Update Cartitem to particular user
app.post("/skcart_postcartitem", (req, res) => {
  SignupModel.updateOne(
    req.query,
    { $push: { cartitems: req.body.cartitems } },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
});
// ********************************************Update Savelater to particular user
app.post("/skcart_postsavelateritem", (req, res) => {
  SignupModel.updateOne(
    req.query,
    { $push: { savelaters: req.body.savelaters } },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
});
// ********************************************Replace Cartitem to particular user
app.post("/skcart_post_replace_cartitem", (req, res) => {
  SignupModel.updateOne(
    req.query,
    { cartitems: req.body.cartitems },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
}); // ********************************************Replace Savelater to particular user
app.post("/skcart_post_replace_savelater", (req, res) => {
  SignupModel.updateOne(
    req.query,
    { savelaters: req.body.savelaters },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
}); // ********************************************Post Data into orders
app.post("/skcart_post_orders", (req, res) => {
  console.log(req.body);
  const order1 = new OrdersModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    pincode: req.body.pincode,
    quantity: req.body.quantity,
    flat: req.body.flat,
    apartment: req.body.apartment,
    nearest: req.body.nearest,
    paymentmode: request.paymentmode,
    orderitemids: req.body.orderitemids,
    price: req.body.price,
  });
  order1.save();
  res.send("Submitted Successfully....");
});

// *************************************************Check User Order already exist or not
app.get("/orderuserinfo", (req, res) => {
  OrdersModel.find(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//*****************************************************Update user order data */
app.post("/skcart_updateorderitem", (req, res) => {
  OrdersModel.updateOne(
    req.query,
    { $push: { orderitemids: req.body.orderitemids } },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
});

// ********************************************Checking that cart item aready exist in user or not
app.get("/check_array_item", (req, res) => {
  SignupModel.find(
    {
      email: req.query.email,
      cartitems: {
        $elemMatch: {
          _id: req.query.id,
        },
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// ********************************************Getting All Cartitem of particular user
app.get("/skcart_getcartitem", (req, res) => {
  SignupModel.findOne(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// // ********************************************Getting All Data according to filter
app.get("/skcart__allproduct_by_category", (req, res) => {
  console.log(req.query);
  let obj = {};
  let brand = [];
  if (req.query.Category) {
    obj.Category = req.query.Category;
  }
  if (req.query.Sub_categroy) {
    obj.Sub_categroy = req.query.Sub_categroy;
  }

  if (req.query.minprice && req.query.maxprice) {
    obj.actualprice = {
      $gte: parseInt(req.query.minprice),
      $lt: parseInt(req.query.maxprice),
    };
  }

  SeparateProductsModel.find(
    obj,

    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

// ******************************************Submit feedback to separate product
app.post("/skcart_post_feedback", (req, res) => {
  console.log(req.feedback);
  SeparateProductsModel.updateOne(
    req.query,
    { $push: { feedback: req.body.feedback } },
    function (error, success) {
      if (error) {
        res.send(error);
      } else {
        res.send(success);
      }
    }
  );
});

app.listen(port, () => {
  console.log("Listening at port no 5000");
});
