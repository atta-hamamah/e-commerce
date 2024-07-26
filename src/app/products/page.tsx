import Image from "next/image";
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
  const url = `https://dummyjson.com/products/?limit=30&skip=0&delay=1000`
  let data: Data | null = null
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return (
    <main className=' p-8 bg-white h-full flex flex-wrap items-center justify-between gap-6'>
      {data ?
        data.products.map((product) => {
          return (
            <div
              className=" w-56 shadow-md "
              key={product.id}
            >
              <Image
                src={product.images[0]}
                width={9999}
                height={9999}
                alt='product'
                className='w-full h-56'
              />
              {product.title}
            </div>
          )
        })
        :
        <p>Cant get Data Try again later</p>
      }
    </main >
  )

}
