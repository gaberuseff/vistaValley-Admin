import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import {useMoveBack} from "../../hooks/useMoveBack";
import Error from "../../ui/Error";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import {useNavigate} from "react-router-dom";
import useCheckout from "../chich-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const {booking, isBookingLoading, isBookingError} = useBooking();
  const {checkout, isCheckingOut} = useCheckout();
  const moveBack = useMoveBack();
  const {deleteBooking, isDeleting} = useDeleteBooking();

  if (isBookingLoading) return <Spinner />;
  if (isBookingError) return <Error message="Booking could not be loaded" />;

  const {id, status} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variations="primary"
            size="medium"
            onClick={() => navigate(`/checkin/${id}`)}>
            Check In
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            variations="primary"
            size="medium"
            onClick={() => checkout(id)}>
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variations="danger" size="medium">
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(id, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variations="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
