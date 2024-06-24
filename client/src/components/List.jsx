const List = (props) => {
  return (
    <div className="w-full flex gap-4 flex-col rounded-sm">
      {props.lists.length > 0 ? (
        props.lists.map((e, i) => {
          return (
            <div
              key={e?.name}
              className=" w-full h-11 border border-dark min-h-10  px-2 rounded-sm border-gray-300 bg-gray-50 bg-dark flex items-center justify-between gap-2"
            >
              <p className="h-auto w-full  p-2 mt-2">
                {e?.item?.length > 12
                  ? e?.item?.substring(0, 12) + "..."
                  : e?.item}
              </p>
              <p className="h-auto w-full  p-2 mt-2">{e?.quantity}</p>
              <p className="h-auto w-full  p-2 mt-2">{e?.price}</p>
              <div className="h-auto w-6 p-1 mt-2">
                <svg
                  onClick={() =>
                    props.setLists(props.lists.filter((d, c) => i !== c))
                  }
                  class="w-4 h-4 cursor-pointer hover:text-gray-500"
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
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}

      <div className="w-full h-11 rounded-sm border border-dark bg-dark flex items-center justify-between gap-2">
        <tr className="gap-3 flex items-center justify-between w-full p-1">
          <td className="w-full">
            <input
              onChange={(e) =>
                props.setList({ ...props.list, item: e.target.value })
              }
              value={props.list.item}
              type="text"
              placeholder="Item"
              className="w-full bg-dark m-2 h-8 p-1 px-2 rounded-sm border"
            />
          </td>
          <td className="w-full">
            <input
              onChange={(e) =>
                props.setList({ ...props.list, quantity: e.target.value })
              }
              value={props.list.quantity}
              type="number"
              placeholder="quantity"
              className="w-full bg-dark m-2  h-8 p-1 px-2 rounded-sm border"
            />
          </td>
          <td className="w-full">
            <input
              onChange={(e) =>
                props.setList({ ...props.list, price: e.target.value })
              }
              value={props.list.price}
              type="number"
              placeholder="Price"
              className="w-full bg-dark m-2 h-8 p-1 px-2 rounded-sm border"
            />
          </td>
          {/* <td>
              <input
                type="text"
                placeholder="name"
                className="w-32 bg-dark m-2 h-8 p-1 px-2 rounded-sm border"
              />
            </td> */}
          {/* <td className="">
              <svg
                class="w-6 hover:text-main ml-5 h-6 text-gray-800 dark:text-white"
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
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </td> */}
        </tr>
        <svg
          onClick={props.addLists}
          class="w-6 cursor-pointer mr-2 hover:text-white rounded-sm hover:bg-blue-600 h-6 text-main"
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
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </div>
    </div>
  );
};

export default List;
