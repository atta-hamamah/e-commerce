interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: any[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

type Data = {
  products: Product[]
}


export default async function page() {
  const url = `https://dummyjson.com/products/d`
  let data: Data | null = null
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return (
    <main className=' bg-white w-full h-full'>
      {data ?
        (
          <div>
            {data.products.map((product) => {
              return (
                <p key={product.id}>
                  {product.title}
                </p>
              )
            })}
          </div>
        )
        :
        <p>Cant get Data Try again later</p>
      }
    </main >
  )

}
