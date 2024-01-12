import { Container, Layout, ProductDetails } from "@/component";
import AuthProductService from "@/service/productService";

export default function ProductId({ product }) {
  return (
    <Layout>
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
          <div className="flex flex-col mt-20 gap-4">
            <div>Add Raiting</div>
            <div>List Raiting</div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const product = await AuthProductService.getProductById(id);
  return {
    props: {
      product,
    },
  };
};
