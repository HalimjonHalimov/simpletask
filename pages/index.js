import { Layout } from "@/component";
import { Rating } from "@mui/material";
import AuthProductService from "@/service/productService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [products, setProducts] = useState(null);

  const router = useRouter();

  const formatPrice = (amaunt) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amaunt);
  };
  const truncateText = (str) => {
    if (str.length < 25) return str;
    return str.substring(0, 25) + "...";
  };

  const fetchingData = async () => {
    try {
      const response = await AuthProductService.getAllProduct();
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);


  const handleUpdate = (id) => {
    console.log(`updated product ${id}`);
  }
  const handleDelete = async (id) => {
    console.log(id);
    const data = await AuthProductService.deleteProductById(id)
    const newData = products.filter((item => item.id !== data.id))
    setProducts(newData)
  }


  return (
    <Layout>
      {products ? (
        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-4 ">
            {products.map((item, i) => (
              <div
                key={i}
                // onClick={() => router.push(`/product/${item.id}`)}
                className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm border"
              >
                <div className="flex flex-col items-center w-full gap-1">
                  <div className="aspect-square overflow-hidden relative w-full">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      sizes="(max-width: 100%)"
                    />
                  </div>
                  <div className="my-2">{truncateText(item.title)}</div>
                  <div>
                    <Rating value={item.rating} readOnly />
                  </div>
                  <div> {item.brand}</div>
                  <div className="font-semibold">{formatPrice(item.price)}</div>
                  <div className="w-full h-auto my-2 p-1 flex flex-row justify-center items-center gap-1">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      View
                    </button>
                    <button class="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                     onClick={() => handleUpdate(id)}
                    >
                      Edit
                    </button>
                    <button class={`${item.isDeleted ? 'cursor-not-allowed' : ''}  bg-transparent hover:bg-rose-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}  
                    onClick={() => {handleDelete(item.id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>Products not created yet</>
      )}
    </Layout>
  );
}
