const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoute");
const uploadFileRouter = require("./routes/uploadRoute");
const blogRouter = require("./routes/blogRoute");
const CouponRouter = require("./routes/couponRoute");
const PrdtCategoryRouter = require("./routes/PrdtCategoryRoute");
const BlogCategoryRouter = require("./routes/blogCatRoute");
const BrandRouter = require("./routes/brandRoute");
const ColorRouter = require("./routes/colorRoute");
const EnquiryRouter = require("./routes/enquiryRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dbConnect();

// Enable CORS for all origins
app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/upload-files", uploadFileRouter);
app.use("/api/prdtcategory", PrdtCategoryRouter);
app.use("/api/blogcategory", BlogCategoryRouter);
app.use("/api/brand", BrandRouter);
app.use("/api/coupon", CouponRouter);
app.use("/api/color", ColorRouter);
app.use("/api/enquiry", EnquiryRouter);

app.use(`/api/uploads`, express.static("uploads"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
