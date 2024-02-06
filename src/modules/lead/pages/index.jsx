import {
  UserOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";
import dayjs from "dayjs";

const {confirm} = Modal;
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {httpClient} from "@/utils/index.js";
import {useFetchList} from "@/hooks/index.js";
import {Triangle} from "react-loader-spinner";
import {Avatar, Button, Empty, Modal, Tooltip} from "antd";
import LeadModal from "@/modules/lead/components/lid-modal.jsx";
import ListModal from "@/modules/lead/components/list-modal.jsx";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";

export const Lead = () => {
  const [values, setValues] = useState({});
  const [listModal, setListModal] = useState(false);
  const [leadModal, setLeadModal] = useState(false);
  const {data, isLoading, refetch} = useFetchList({
    url: "/status/list",
    Params: {page: 1, pageSize: 10},
  });
  const [columns, setColumns] = useState(data?.snapData);
  const [prevTotalLids, setPrevTotalLids] = useState(data?.total_lids);

  useEffect(() => {
    const setTerm = setInterval(() => refetch(), 10000);
    return () => {
      clearInterval(setTerm)
    };
  }, [data])

  useEffect(() => {
    setColumns(data?.snapData);
    if (data?.total_lids > prevTotalLids) {
      toast.success('New lead was added!');
    }
    setPrevTotalLids(data?.total_lids);
  }, [data?.snapData, data?.total_lids, prevTotalLids]);

  const handleEdit = async (id) => {
    try {
      let {data} = await httpClient(`/status/${id}`);
      setValues(data?.snapData);
      setListModal(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditLead = (item) => {
    setValues(item);
    setLeadModal(true);
  }

  const handleOpenLeadModal = (statusId) => {
    setValues({statusId});
    setLeadModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await httpClient.delete(`/status/delete/${id}`);
      toast.success('List deleted successfully')
      refetch()
    } catch (err) {
      toast.error(err)
    }
  }

  const showConfirm = (id, name) => {
    confirm({
      title: `Do you Want to delete this "${name}" list?`,
      icon: <ExclamationCircleFilled/>,
      onOk() {
        handleDelete(id)
      },
      onCancel() {
      },
    });
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      httpClient({
        method: "PUT",
        url: `/lid/move/${result.draggableId}`,
        data: {from: sourceColumn.id, to: destColumn.id},
      }).catch((err) => {
        refetch();
        console.log(err)
      })

      const sourceItems = [...sourceColumn.lids];
      const destItems = [...destColumn.lids];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          lids: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          lids: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.lids];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          lids: copiedItems,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center w-full h-full">
        <Triangle
          visible={true}
          height="100"
          width="100"
          color="#001529"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!data.snapData) {
    return (
      <Empty
        className="mt-40 font-semibold text-base"
        description="Ma'lumot topilmadi!"
      />
    );
  }

  const handleOpen = () => {
    setValues({})
    setListModal(true)
  }

  return (
    <section>
      <div className='grid mb-4'>
        <Button onClick={handleOpen} size='large' icon={<PlusCircleOutlined/>} className='ml-auto'>Add List</Button>
      </div>
      <div className="flex gap-2 whitespace-nowrap overflow-x-auto">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {columns &&
            Object.entries(columns)?.map(([columnId, column]) => {
              return (
                <div
                  className="min-w-64 w-full max-w-md flex flex-col h-full"
                  key={columnId}
                >
                  <div
                    className="font-semibold text-base text-center mb-2 flex justify-between items-center border rounded-2xl p-3">
                    <span className='truncateText'>{column.name}</span>
                    <div className='flex gap-1 items-center'>
                      <Tooltip placement="top" title="Add Lead" color="#555">
                        <Button
                          size="middle"
                          icon={<PlusOutlined/>}
                          onClick={() => handleOpenLeadModal(column?.id)}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Edit List" color="#555">
                        <Button
                          size="middle"
                          icon={<EditOutlined/>}
                          onClick={() => handleEdit(column?.id)}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Delete list" color="red">
                        <Button
                          danger
                          size="middle"
                          icon={<DeleteOutlined/>}
                          onClick={() => showConfirm(column?.id, column?.name)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#d4f4ff"
                              : "#ededed",
                          }}
                          className="rounded-2xl dragDropList p-2 min-h-20 transition-all duration-300"
                        >
                          {column?.lids?.length > 0 &&
                            column?.lids?.map((item, index) => {
                              return (
                                <Draggable
                                  key={item?._id}
                                  draggableId={item?._id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#f7f7f7"
                                            : "#fff",
                                          border: snapshot.isDragging
                                            ? "1px solid #b3a6a6"
                                            : "",
                                          ...provided.draggableProps.style,
                                        }}
                                        className={`px-2 py-3 flex flex-col border border-gray-100 select-none bg-white transition-all duration-400 shadow-md rounded-xl cursor-pointer hover:scale-[0.98]`}
                                      >
                                        <div className="flex w-full items-center gap-1.5">
                                          <div>
                                            <Avatar
                                              src={item?.imgUrl}
                                              icon={<UserOutlined/>}
                                            />
                                          </div>
                                          <p className="text-base mb-1 font-semibold truncateText text-gray-700">
                                            {item?.seller?.fullname}
                                          </p>
                                          <div className="flex gap-1 ml-auto">
                                            <Tooltip placement="top" title="Edit Lead" color="#555">
                                              <Button
                                                size="small"
                                                icon={<EditOutlined/>}
                                                onClick={() => handleEditLead({...item?.seller, statusId: column?.id})}
                                              />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Delete Lead" color="red">
                                              <Button
                                                danger
                                                size="small"
                                                icon={<DeleteOutlined/>}
                                                onClick={() => showConfirm(column?.id, column?.name)}
                                              />
                                            </Tooltip>
                                          </div>
                                        </div>
                                        <div className="flex gap-3 justify-between mt-2">
                                          <p className="text-orange truncateText text-xs mt-1 text-gray-700">
                                            {item?.seller?.phoneNumber}
                                          </p>
                                          <p className="truncateText text-end text-xs mt-1 text-gray-700">
                                            {dayjs(
                                              item?.seller?.createdAt
                                            ).format("DD-MMM, YYYY")}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          {provided?.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
        </DragDropContext>
      </div>
      <LeadModal
        key={leadModal}
        values={values}
        open={leadModal}
        refetch={refetch}
        setValues={setValues}
        onClose={() => setLeadModal(false)}
      />
      <ListModal
        values={values}
        open={listModal}
        refetch={refetch}
        setValues={setValues}
        onClose={() => setListModal(false)}
      />
    </section>
  );
};
