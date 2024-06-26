import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [csvFile, setCsvFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const navigate = useNavigate();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleFileChange = (e) => {
//     setCsvFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("csvFile", csvFile);

//       const response = await fetch("/api/uploadMultipleProducts", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload products");
//       }

//       const data = await response.json();
//       toast.success("Products uploaded successfully");
//       // Handle response data as needed
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to upload products. Please try again.");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12">Upload Products</div>

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {csvFile ? csvFile.name : "Upload CSV File"}
//               <input
//                 type="file"
//                 name="csvFile"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//           >
//             Upload Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [csvFile, setCsvFile] = useState(null);
//   const navigate = useNavigate();

//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleFileChange = (e) => {
//     setCsvFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!csvFile) {
//         throw new Error("Please select a CSV file");
//       }

//       const formData = new FormData();
//       formData.append("csvFile", csvFile);

//       const response = await fetch("/api/uploadMultipleProducts", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload products");
//       }

//       const data = await response.json();
//       toast.success("Products uploaded successfully");
//       // Handle response data as needed
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to upload products. Please try again.");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12">Upload Products</div>

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {csvFile ? csvFile.name : "Upload CSV File"}
//               <input
//                 type="file"
//                 name="csvFile"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//           >
//             Upload Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [csvFile, setCsvFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const navigate = useNavigate();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleFileChange = (e) => {
//     if (e.target.name === "csvFile") {
//       setCsvFile(e.target.files[0]);
//     } else if (e.target.name === "imageFile") {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!csvFile || !imageFile) {
//         throw new Error("Please select both CSV and image files");
//       }

//       const formData = new FormData();
//       formData.append("csvFile", csvFile);
//       formData.append("imageFile", imageFile);

//       // Upload image
//       const imageResponse = await uploadProductImage(formData);

//       if (imageResponse.error) {
//         throw new Error(imageResponse.error.message || "Failed to upload image");
//       }

//       const imageData = imageResponse.data;

//       // After successful image upload, proceed to upload CSV and create product
//       const csvResponse = await fetch("/api/uploadMultipleProducts", {
//         method: "POST",
//         body: formData,
//       });

//       if (!csvResponse.ok) {
//         throw new Error("Failed to upload products: CSV upload failed");
//       }

//       const csvData = await csvResponse.json();

//       // Create product using uploaded image and CSV data
//       const productData = { imageUrl: imageData.imageUrl, csvData: csvData };

//       const createProductResponse = await createProduct(productData);

//       if (createProductResponse.error) {
//         throw new Error(
//           createProductResponse.error.message || "Failed to create product"
//         );
//       }

//       toast.success("Products uploaded successfully");
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to upload products. Please try again.");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12">Upload Products</div>

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {csvFile ? csvFile.name : "Upload CSV File"}
//               <input
//                 type="file"
//                 name="csvFile"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {imageFile ? imageFile.name : "Upload Product Image"}
//               <input
//                 type="file"
//                 name="imageFile"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//           >
//             Upload Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;




















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [imageUrl, setImageUrl] = useState(null);
//   const navigate = useNavigate();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const jsonData = JSON.parse(event.target.result);
//       setProducts(jsonData.products);
//     };
//     reader.readAsText(file);
//   };

//   const handleSubmit = async () => {
//     try {
//       for (const product of products) {
//         const { image, ...rest } = product;

//         const productData = new FormData();
//         productData.append("image", image);
//         for (const key in rest) {
//           productData.append(key, rest[key]);
//         }

//         const { data } = await createProduct(productData);

//         if (data.error) {
//           toast.error("Product create failed. Try Again.");
//         } else {
//           toast.success(`${data.name} is created`);
//         }
//       }
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       toast.error("Product create failed. Try Again.");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12">Create Product</div>

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               Upload JSON File
//               <input
//                 type="file"
//                 name="file"
//                 accept=".json"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {products.length > 0 && (
//             <div>
//               <button
//                 onClick={handleSubmit}
//                 className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//               >
//                 Submit Products
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
