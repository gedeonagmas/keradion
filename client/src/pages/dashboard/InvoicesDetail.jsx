import React, { useEffect, useRef, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import {
  useUpdateMutation,
  useLazyReadQuery,
  useDeleteMutation,
} from "../../features/api/apiSlice";
import Response from "../../components/Response";
import List from "../../components/List";
import jsPDF from "jspdf";
import { utils, writeFile } from "xlsx";
import DeleteIcon from "@mui/icons-material/Delete";
import Pop from "../../components/Pop";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

const InvoicesDetail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("keradion_user"));
  const id = location?.search?.split("?id=")[1];

  const [updateData, updateResponse] = useUpdateMutation();
  const [createPending, setCreatePending] = useState(false);
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [deletePending, setDeletePending] = useState(false);
  const [popup, setPopup] = useState(false);

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

  const deleteHandler = () => {
    id &&
      deleteData({
        url: `/user/invoices?id=${id}`,
        tag: ["invoices"],
      });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      navigate(`/dashboard/${user?.role}/invoices`);
      window.scrollTo({ top: 0 });
    }
  }, [deleteResponse]);
  const [trigger, { data: invoices, isFetching, isError }] = useLazyReadQuery();

  console.log(id, "iiiiiiii");
  useEffect(() => {
    trigger({
      url: `/user/invoices?_id=${id}`,
      tag: ["invoices"],
    });
  }, [id]);

  useEffect(() => {
    if (invoices) {
      const data = invoices?.data[0];
      setEmail(data?.email ? data.email : email);
      setFirstName(data?.firstName ? data.firstName : firstName);
      setLastName(data?.lastName ? data.lastName : lastName);
      setAddress(data?.address ? data.address : address);
      setPhone(data?.phone ? data.phone : phone);
      setCompanyName(data?.companyName ? data.companyName : companyName);
      setDate(data?.date ? data.date : date);
      setAmount(data?.amount ? data.amount : amount);
      setProducts(data?.products ? data.products : products);
    }
  }, [invoices]);

  const updateHandler = () => {
    updateData({
      email,
      firstName,
      lastName,
      address,
      phone,
      companyName,
      date,
      amount,
      products: products,
      url: `/user/invoices?id=${id}`,
      tag: ["invoices"],
    });
  };

  useEffect(() => {
    if (updateResponse?.status === "fulfilled") {
      window.location.reload();
    }
  }, [updateResponse]);

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

  // pdf generator
  const licenseCertificatedRef = useRef(null);
  const handleGeneratePdf = async () => {
    const inputData = licenseCertificatedRef.current;
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      pdf.html(inputData, {
        callback: function (pdf) {
          pdf.save("invoices.pdf");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //xlsx style sheet
  const handleXlsxGenerate = (invoice) => {
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(invoice);
    utils.book_append_sheet(wb, ws, "Inovice Sheet");
    writeFile(wb, "invoice.xlsx");
  };
  return (
    <div>
      <Response response={updateResponse} setPending={setCreatePending} />
      <Response response={deleteResponse} setPending={setDeletePending} />
      <div class="from-white to-blue-200 bg-gradient-to-tl dark:bg-gray-700 dark:text-white text-gray-700 rounded-sm shadow-lg px-5 py-10 w-full md:w-[90%] md:px-main mx-auto">
        <div className="w-full flex items-center justify-between gap-2 my-2">
          <p
            className="text-lg font-bold mb-3 under
          "
          >
            Invoice
          </p>
          <p> No. {invoices?.data[0]?.invoiceId}</p>
        </div>
        <div class="flex flex-col md:flex-row items-start gap-2 justify-between mb-8">
          <div class="flex flex-col">
            <div class="text-sm mb-2">Your Company Name</div>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
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
              value={date}
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
                value={firstName}
                type="text"
                placeholder="First Name"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Last Name</div>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Last Name"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Phone</div>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder="Phone"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Address</div>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                placeholder="bole, addiss ababa, ethiopia"
                className="w-52 bg-dark h-8 p-1 px-2 rounded-sm border"
              />
            </div>
            <div class="flex mb-2 flex-col">
              <div class="text-sm mb-2">Email</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
          <div>
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
          <div class="">{(amount * 0.4).toFixed(2)} birr</div>
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
        <div className="flex w-full items-center gap-3 justify-between">
          <LoadingButton
            pending={createPending}
            onClick={updateHandler}
            title="Update"
            color="bg-main"
            width="w-full"
          />{" "}
          <button
            onClick={handleGeneratePdf}
            className="px-3 py-2 flex gap-1 items-center bg-red-500 text-white rounded-lg"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z"
              />
            </svg>
            Pdf
          </button>
          <button
            onClick={() => handleXlsxGenerate([invoices?.data])}
            className="px-3 flex items-center gap-1 py-2 bg-emerald-500 text-white rounded-lg"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                clip-rule="evenodd"
              />
            </svg>
            Spreed Sheet
          </button>
          <button
            onClick={() => {
              setPopup(true);
            }}
            className="px-3 py-2 flex gap-1 items-center bg-pink-400 text-white rounded-lg"
          >
            <DeleteIcon fontSize="small" /> delete
          </button>
        </div>
      </div>
      {popup && (
        <Pop
          content="Are you sure you want to remove this invoice?"
          cancel={setPopup}
          trigger={
            <LoadingButton
              pending={deletePending}
              onClick={deleteHandler}
              title="Yes, I'm Sure"
              color="bg-main"
              width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          }
        />
      )}

      <div
        ref={licenseCertificatedRef}
        class="max-w-2xl mx-auto p-4 bg-white border rounded shadow-sm my-2"
        id="invoice"
      >
        {" "}
        <p className="text-lg font-bold">PDF Format</p>
        <div class="grid grid-cols-2 items-center">
          <p className="text-2xl font-bold uppercase">
            {invoices?.data[0]?.companyName}
          </p>

          <div class="text-right">
            <p>Tailwind Inc.</p>
            <p class="text-gray-500 text-sm">info@keradiondesign.com</p>
            <p class="text-gray-500 text-sm mt-1">+251 954104637</p>
          </div>
        </div>
        <div class="grid grid-cols-2 items-center mt-4">
          <div>
            <p class="font-bold text-gray-800">Bill to :</p>
            <p class="text-gray-500">
              {invoices?.data[0]?.firstName}
              {invoices?.data[0]?.lastName}
            </p>
            <p className="text-gray-500">{invoices?.data[0]?.address}</p>
            <p class="text-gray-500"> {invoices?.data[0]?.email}</p>
            <p class="text-gray-500"> {invoices?.data[0]?.phone}</p>
          </div>

          <div class="text-right">
            <p class="">
              {" "}
              Invoice number:
              <span class="text-gray-500 ml-2">
                {invoices?.data[0]?.invoiceId}
              </span>
            </p>
            <p>
              Invoice date:{" "}
              <span class="text-gray-500">
                {format(invoices?.data[0]?.createdAt)}
              </span>
              <br />
              Due date:
              <span class="text-gray-500">{invoices?.data[0]?.date}</span>
            </p>
          </div>
        </div>
        <div class="-mx-4 flow-root sm:mx-0">
          <table class="min-w-full">
            <thead class="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices?.data[0]?.products?.map((e) => {
                return (
                  <tr class="border-b border-gray-200">
                    <td class="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div class="font-medium text-gray-900">{e?.item}</div>
                    </td>
                    <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                      {e?.quantity}
                    </td>
                    <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                      {e?.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Total quantity: <span className="text-black"> </span>
                </th>
                <th
                  scope="row"
                  class="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Subtotal
                </th>
                <td class="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                  {quantity}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Tax
                </th>
                <th
                  scope="row"
                  class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Tax
                </th>
                <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  {invoices?.data[0]?.amount * 0.05} birr
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  {invoices?.data[0]?.amount} birr
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="border-t-2 pt-2 text-xs text-gray-500 text-center mt-2">
          Please pay the invoice before the due date. You can pay the invoice by
          logging in to your account from our client portal.
        </div>
      </div>
    </div>
  );
};

export default InvoicesDetail;
