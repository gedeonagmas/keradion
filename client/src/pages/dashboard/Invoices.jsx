import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import {
  useLazyReadQuery,
  useUpdateMutation,
} from "../../features/api/apiSlice";
import Response from "../../components/Response";
import { format } from "timeago.js";
import Loading from "../../components/loading/Loading";
import Pop from "../../components/Pop";
import Tables from "../../components/Tables";
import ResponsivePagination from "react-responsive-pagination";
import "./../../assets/pagination.css";

const Invoices = () => {
  const user = JSON.parse(localStorage.getItem("keradion_user"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const [trigger, { data: invoices, isFetching, isError }] = useLazyReadQuery();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(invoices?.total / 10));
  }, [invoices]);

  useEffect(() => {
    trigger({
      url: `/user/invoices?user=${user?._id}&limit=10&page=${page}&searchField=firstName&searchValue=${search}`,
      tag: ["invoices"],
    });
  }, [page, search]);

  const [deleteData, deleteResponse] = useUpdateMutation();
  const [deletePending, setDeletePending] = useState(false);

  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [value, setValue] = useState(true);

  const deleteHandler = () => {
    id &&
      deleteData({
        isActive: value,
        url: `/user/invoices?id=${id}`,
        tag: ["invoices"],
      });
  };

  console.log(user?._id, "user");

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  const columns = [
    {
      name: "NO",
      selector: (row, i) => i + 1,
      cell: (row, i) => <div className="">{i + 1}</div>,
      sortable: true,
      width: "80px",
    },
    {
      name: "RECIPIENT",
      selector: (row) => row?.firstName,
      cell: (row) => (
        <div className="">
          {row?.firstName} {row?.lastName}
        </div>
      ),
      sortable: true,
      width: "140px",
    },

    {
      name: "EMAIL",
      selector: (row) => row.email,
      cell: (row) => <div className="">{row.email}</div>,
      sortable: true,
      width: "180px",
    },

    {
      name: "CREATED AT",
      selector: (row) => row.createdAt,
      cell: (row) => <div className="">{format(row.createdAt)}</div>,
      sortable: true,
      width: "130px",
    },

    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      cell: (row) => <div className="">{row?.amount}</div>,
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-1 justify-between items-center">
          <button
            onClick={() => {
              setPopup(true);
              setId(row._id);
              setValue(row?.isActive ? false : true);
            }}
            className="px-1 py-1 flex gap-1 items-center w-16 bg-red-500 text-white rounded-lg"
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
            onClick={() => {
              setPopup(true);
              setId(row._id);
              setValue(row?.isActive ? false : true);
            }}
            className="px-1 flex items-center gap-1 py-1 w-32 bg-emerald-500 text-white rounded-lg"
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
          <a
            href={`/dashboard/${user?.role}/invoices/manage?id=${row?._id}`}
            className="px-1 flex items-center gap-1 py-1 w-20 bg-yellow-400 text-white rounded-lg"
          >
            more
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
                stroke-width="2"
                d="M6 12h.01m6 0h.01m5.99 0h.01"
              />
            </svg>
          </a>
        </div>
      ),
      sortable: true,
    },
  ];

  console.log(search, page, "invoices");
  return (
    <div className="flex px-[4%] min-h-[85vh] pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={deleteResponse} setPending={setDeletePending} />

      <div className="flex items-center gap-5 justify-between">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full max-w-md px-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />

        <a
          href={`/dashboard/${user?.role}/invoices/create`}
          className="px-2 py-2 bg-main text-white rounded-lg"
        >
          Create New
        </a>
      </div>
      <div className="w-full">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read invoices data</p>}
        {invoices && invoices?.data?.length > 0 ? (
          <div>
            <Tables data={invoices?.data} columns={columns} title="invoices" />
            <div className="py-10">
              <ResponsivePagination
                total={totalPage}
                current={page}
                onPageChange={(currentPage) => setPage(currentPage)}
                previousLabel="Previous"
                previousClassName="w-24"
                nextClassName="w-24"
                nextLabel="Next"
              />
            </div>
          </div>
        ) : (invoices && invoices?.message) || invoices?.data?.length === 0 ? (
          <div>There is no data to display.</div>
        ) : null}
      </div>
      {popup && (
        <Pop
          content="Are you sure you want to remove this price?"
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
    </div>
  );
};

export default Invoices;
