import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import { useCreateMutation } from "../../features/api/apiSlice";
import Response from "../../components/Response";
import List from "../../components/List";

const InvoicesCreate = () => {
  const user = JSON.parse(localStorage.getItem("keradion_user"));

  const [createData, createResponse] = useCreateMutation();
  const [createPending, setCreatePending] = useState(false);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  const [date, setDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const addProducts = () => {
    console.log(product, "product");
    console.log(products, "product container");
    if (
      product?.item?.length > 0 &&
      product?.quantity?.length > 0 &&
      product?.price?.length > 0
    ) {
      setProducts([...products, product]);
    }
  };

  const createHandler = () => {
    createData({
      user: user?._id,
      email,
      firstName,
      lastName,
      address,
      phone,
      companyName,
      date,
      amount,
      products: products,
      url: "/user/invoices",
      tag: ["invoices"],
    });
  };

  useEffect(() => {
    if (createResponse?.status === "fulfilled") {
      window.location.reload();
    }
  }, [createResponse]);

  useEffect(() => {
    let totalAmount = 0;
    let totalQuantity = 0;
    products?.map((e) => {
      totalAmount += e?.price * 1;
      totalQuantity += e?.quantity * 1;
    });
    setAmount(totalAmount);
    setQuantity(totalQuantity);
  }, [products]);

  return (
    <div>
      <Response
        response={createResponse}
        setPending={setCreatePending}
        redirectTo={`/dashboard/${user?.role}/invoices`}
      />

      <div class="from-white to-blue-200 bg-gradient-to-tl dark:bg-gray-700 dark:text-white text-gray-700 rounded-sm shadow-lg px-5 py-10 w-full md:w-[90%] md:px-main mx-auto">
        <p className="text-lg font-bold mb-3">Invoice</p>{" "}
        <div class="flex flex-col md:flex-row items-start gap-2 justify-between mb-8">
          <div class="flex flex-col">
            <div class="text-sm mb-2">Your Company Name</div>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              placeholder="Your Company Name"
              className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
            />
          </div>
          <div class="">
            {/* <div class="font-bold text-xl mb-2">INVOICE</div> */}
            <div class="text-sm mb-2">Select Due Date</div>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              min={new Date()?.toISOString()?.split("T")[0]}
              placeholder="Date"
              className="w-40 bg-dark h-8 p-1 px-2 rounded-sm border"
            />
          </div>
        </div>
        <div class="border-b-2 border-gray-300 pb-8 mb-8">
          <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">First Name</div>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Last Name</div>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Phone</div>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Address</div>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="bole, addiss ababa, ethiopia"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
          </div>
        </div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Products
        </label>
        <div class="w-full text-left mb-8">
          <div className="w-full flex items-center justify-between">
            <p class=" font-bold uppercase py-2">Item</p>
            <p class=" font-bold uppercase py-2">Quantity</p>
            <p class=" font-bold uppercase py-2">Price</p>
            <p class=" font-bold uppercase py-2">Action</p>
          </div>
          <div className="w-full">
            <List
              list={product}
              setList={setProduct}
              lists={products}
              setLists={setProducts}
              addLists={addProducts}
            />
          </div>
        </div>
        <div class="flex justify-end mb-8">
          <div class=" mr-2">Total Item:</div>
          <div class="">{products?.length}</div>
        </div>
        <div class="flex justify-end mb-8">
          <div class=" mr-2">Total Quantity:</div>
          <div class="">{quantity}</div>
        </div>
        <div class="flex justify-end mb-8">
          <div class=" mr-2">Tax:</div>
          <div class="">{(amount * 0.05).toFixed(2)} birr</div>
        </div>
        <div class="flex justify-end mb-8">
          <div class=" mr-2">Total Amount:</div>
          <div class=" font-bold text-xl">{amount} birr</div>
        </div>
        <div class="border-t-2 border-gray-300 pt-8 mb-8">
          <div class=" mb-2">
            Payment is due in {date}. Late payments are subject to fees.
          </div>
          <div class=" mb-2">
            Please make checks payable to Your Company Name and mail to:
          </div>
          <div class="">22 mazoria Bole St., Addiss Ababa, +251 954104637</div>
        </div>
        <LoadingButton
          pending={createPending}
          onClick={createHandler}
          title="Create"
          color="bg-main"
          width="w-full"
        />
      </div>
    </div>
  );
};

export default InvoicesCreate;
