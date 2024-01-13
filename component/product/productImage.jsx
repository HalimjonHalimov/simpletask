const ProductImage = ({ product }) => {
  return (
    <div className="gridgrid-cols-6gap-2h-fullmax-h-[500px]min-h-[300px]sm:min-h-[400px]">
      <div className="flex  flex-col gap-2 items-center justify-center cursor-pointer border h-full max-h-[500px]min-h-[300px]sm:min-h-[400px]">
        {product.images.map((image, i) => (
          <div key={i} className={"relative w-[80%] aspect-square rounded border-teal-300"} >
            <img src={image} alt={image} className="object-contain" />
          </div>
        ))}
      </div>
      <div className="col-span-5 relative aspect-square">
        <img src={product.images[0]} alt={product.title}  className="w-full h-full object-contain  max-h-[500px] min-h-[300px] sm:min-h-[400px]" />
      </div>
    </div>
  );
};

export default ProductImage;
