import { ProductImage } from "./productImage";
import Image from "next/image";
import { Rating } from "@mui/material";

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails = ({ product }) => {
  return (
    <div className="grid grid-cols-2  gap-12">
      <div
        className="
        grid
        grid-cols-6
        gap-2
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
    "
      >
        <div className="col-span-5 relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            // sizes="(min-height: 400) 500px, (max-height: 500) 500px"
            className="w-full h-full object-contain  max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.title}</h2>
        <div className="flex items-center gap-2">
          <Rating value={product.rating} readOnly />
          <div> reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div className="">
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div className="">
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.stock ? "text-teal-400" : "text-rose-400"}>
          {product.stock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
      </div>
    </div>
  );
};

export default ProductDetails;
