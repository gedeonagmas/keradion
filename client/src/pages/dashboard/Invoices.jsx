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
      width: "200px",
    },

    {
      name: "CREATED AT",
      selector: (row) => row.createdAt,
      cell: (row) => <div className="">{format(row.createdAt)}</div>,
      sortable: true,
      width: "140px",
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
            className="px-1 py-1 w-16 bg-red-500 text-white rounded-lg"
          >
            Pdf
          </button>
          <button
            onClick={() => {
              setPopup(true);
              setId(row._id);
              setValue(row?.isActive ? false : true);
            }}
            className="px-1 py-1 w-32 bg-emerald-500 text-white rounded-lg"
          >
            Spreed Sheet
          </button>
          <a
            href={`/dashboard/${user?.role}/invoices/manage?id=${row?._id}`}
            className="px-1 py-1 w-14 bg-blue-500 text-white rounded-lg"
          >
            Detail
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
