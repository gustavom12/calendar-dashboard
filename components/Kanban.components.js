import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { Cpu, MoreVertical, Send } from "react-feather";
import { useTranslation } from "../contexts/LocalizeContext";
import ReactStars from "react-stars";
import { Dropdown } from "antd";
import DropdownItem from "../base/DropdownItem.base";
import Modal from "./Modal.components";
import Button from "../base/Button.base";
import DeleteInstanceModal from "../modals/instances/DeleteInstance.modal";
import NotifyInstanceModal from "../modals/instances/NotifyInstance.modal";
import EditAdministratorsModal from "../modals/instances/EditAdministrators.modal";
import DiscardCandidateModal from "../modals/candidates/DiscardCandidate.modal";
import TransferCandidateModal from "../modals/candidates/TransferCandidate.modal";
import apiConnection from "../pages/api/api-connection";
import NewInstance from "../modals/instances/NewInstance.modal";
import Loader from "./loader/Loader";
import { useNotificationData } from "../contexts/NotificationContext";
import { useRouter } from "next/router";

export default function Kanban() {
  const [loading, setLoading] = useState(true);
  const { error, success } = useNotificationData();
  const [columns, setColumns] = useState([]);
  const router = useRouter();
  //instances ref
  const deleteRef = useRef();
  const newInstanceRef = useRef();
  const notificationRef = useRef();
  const editAdminsRef = useRef();

  //candidates ref
  const discardRef = useRef();
  const transferRef = useRef();

  const handleViewProfile = (id) => {
    router.push(`/candidates/${id}`);
  };

  useLayoutEffect(() => {
    apiConnection
      .get(
        `/vacancy/columns?id=${
          window.location.search.split("&")[1].split("=")[1]
        }`
      )
      .then(async ({ data }) => {
        const payload = await Promise.all(
          data.columns.map((i) =>
            apiConnection.get(`/users/candidates/column?id=${i.id}`)
          )
        );

        const cards = payload.map((i) =>
          i.data.map((i) => ({
            ...i,
            id: i._id,
          }))
        );

        const cols = data.columns.map((i, index) => ({
          admins: [],
          ...i,
          cards: cards[index],
        }));
        await setColumns(cols);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    VACANCIES: { FUNNEL, DROPDOWN, KANBAN },
    NOTIFICATIONS: { INSTANCES },
    GLOBAL: { COLUMNS },
  } = useTranslation();
  const [selectedCard, setSelectedCard] = useState(null);

  const renderBoard = useMemo(
    () => (
      <Board
        key={columns?.length}
        onColumnDragEnd={(a, b, c, d) => {
          // console.log(a, b, c, d);
          const columns = a.columns.map((i) => {
            const a = { ...i };
            delete a.cards;
            return a;
          });
          apiConnection.patch("/vacancy/column/order", {
            vacancyId: window.location.search.split("&")[1].split("=")[1],
            columns,
          });
        }}
        onCardDragEnd={(a, b, c, d) => {
          apiConnection
            .patch("/users/candidates/column", {
              candidateId: b._id,
              to: d.toColumnId,
            })
            .then(() => {})
            .catch((err) => console.log(err));
        }}
        allowAddColumn
        initialBoard={{ columns }}
        renderColumnHeader={(column) => (
          <div className="kanban-header">
            <div className="kanban-header-t">
              <h3>{COLUMNS[column.title] || column.title}</h3>
              {column.id != "__ADD_COLUMN__" && (
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <div className="hiring-overlay hiring-overlay-shadow">
                      <DropdownItem
                        onClick={() => editAdminsRef.current.open(column)}
                      >
                        {DROPDOWN.EDIT_ADMINS}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => notificationRef.current.open(column)}
                      >
                        {DROPDOWN.SEND_NOTIFICATION}
                      </DropdownItem>
                      {column.title != "HIRING" ? (
                        <DropdownItem
                          onClick={() =>
                            column?.cards.length
                              ? error(
                                  "La columna debe estar vacia para ser eliminada"
                                )
                              : deleteRef.current.open(column.id, handleDelete)
                          }
                          isDelete
                        >
                          {DROPDOWN.DELETE}
                        </DropdownItem>
                      ) : null}
                    </div>
                  }
                >
                  <MoreVertical
                    style={{ color: "#A1ACC2", height: 18, cursor: "pointer" }}
                  />
                </Dropdown>
              )}
            </div>
            {column?.admins?.length ? (
              <div className="kanban-header-b">
                <span>{FUNNEL.ASSIGNED}</span>
              </div>
            ) : (
              <div style={{ width: "100%", marginTop: 12, height: 22 }} />
            )}
          </div>
        )}
        renderCard={(candidate) => (
          <div className="kanban-card">
            <div
              onClick={(e) => {
                try {
                  !e.target.className.includes("overlay") &&
                    handleViewProfile(candidate.id);
                  // setSelectedCard(candidate);
                } catch (err) {
                  console.error(err);
                }
              }}
              className="kanban-card-t"
            >
              <div className="kanban-card-t-l">
                <img
                  src={candidate?.image || "/assets/svg/avatar.svg"}
                  alt="user"
                />
                <span>
                  {candidate?.personalData?.firstName}{" "}
                  {candidate?.personalData?.lastName}
                </span>
              </div>
              <Dropdown
                trigger={["hover"]}
                overlay={
                  <div className="hiring-overlay hiring-overlay-shadow">
                    <DropdownItem
                      onClick={() => transferRef.current.open(candidate)}
                    >
                      {DROPDOWN.SEND_TO_OTHER}
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => discardRef.current.open(candidate)}
                      isDelete
                    >
                      {DROPDOWN.DISCARD}
                    </DropdownItem>
                  </div>
                }
              >
                <MoreVertical style={{ color: "#A1ACC2", height: 18 }} />
              </Dropdown>
            </div>
            <div className="kanban-card-b">
              <ReactStars
                count={5}
                onChange={() => {}}
                value={0}
                size={14}
                color2="#A1ACC2"
                color1={"#E4EDF0"}
              />
              <button type="button">
                <Send style={{ color: "#A1ACC2", height: 14 }} />
              </button>
            </div>
          </div>
        )}
      />
    ),
    [columns]
  );

  const handleUpdate = (payload) => {
    console.log(payload);
    setColumns((prev) => [...prev, payload]);
  };

  const handleDelete = (id) => {
    const arr = [...columns].filter((i) => i.id != id);
    setColumns(arr);
    apiConnection
      .patch("/vacancy/column/order", {
        vacancyId: window.location.search.split("&")[1].split("=")[1],
        columns: arr,
      })
      .then(() => success(INSTANCES.DELETE.SUCCESS))
      .catch((err) => error(INSTANCES.DELETE.ERROR));
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="kanban-container">
      <DeleteInstanceModal ref={deleteRef} />
      <NotifyInstanceModal ref={notificationRef} />
      <EditAdministratorsModal ref={editAdminsRef} />
      <DiscardCandidateModal ref={discardRef} />
      <TransferCandidateModal ref={transferRef} />
      <NewInstance ref={newInstanceRef} />
      <Modal
        maxWidth={600}
        visible={selectedCard}
        onCancel={() => setSelectedCard(null)}
      >
        <div className="kanban-container__modal">
          <div className="kanban-container__modal-l">
            <div className="kanban-container__modal-l-t">
              <img src={selectedCard?.image} />
              <ReactStars
                count={5}
                edit={false}
                value={selectedCard?.stars}
                size={14}
                color2="#262D42"
                color1="#CAD7E6"
              />
              <div className="kanban-container__modal-l-t-text">
                <h3>{selectedCard?.name}</h3>
              </div>
            </div>
            <Button style={{ width: "100%" }}>{DROPDOWN.VIEW}</Button>
          </div>
          <div className="kanban-container__modal-r">
            <div className="kanban-container__modal-r-row">
              <span>{FUNNEL.EXPERIENCE}</span>
              <span></span>
            </div>
            <div className="kanban-container__modal-r-row">
              <span>{FUNNEL.EDUCATION}</span>
              <span></span>
            </div>
            <div className="kanban-container__modal-r-row">
              <span>{FUNNEL.AREA}</span>
              <span></span>
            </div>
            <div>
              <h3>{FUNNEL.SKILLS}</h3>
            </div>
          </div>
        </div>
      </Modal>
      <div className="hiring-kanban-grid">
        <div style={{ marginLeft: 20 }} />
        {renderBoard}
        <button
          className="hiring-kanban__add"
          style={{ marginRight: 30 }}
          onClick={() =>
            newInstanceRef.current.open(
              window.location.search.split("&")[1].split("=")[1],
              handleUpdate
            )
          }
        >
          {KANBAN.ADD_INSTANCE}
        </button>
        <div></div>
      </div>
    </div>
  );
}
