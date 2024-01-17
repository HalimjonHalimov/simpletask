import { Container, Layout, ProductDetails } from "@/component";
import AuthProductService from "@/service/productService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductId() {
  const [product, setProduct] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const fetchingData = async (id) => {
    const product = await AuthProductService.getProductById(id);
    setProduct(product);
  };
  useEffect(() => {
    fetchingData(id);
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <Container>
          {product ? (
            <ProductDetails product={product} />
          ) : (
            <Box className="w-full h-[50vh] flex justify-center items-center">
              <CircularProgress />
            </Box>
          )}

          <div className="flex flex-col mt-20 gap-4">
            <div>Add Raiting</div>
            <div>List Raiting</div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}
