import styled from "styled-components";

import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Capacity = styled.span`
  font-family: "Sono";
  font-weight: 600;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 700;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CainRow({cabin}) {
  const [showForm, setShowForm] = useState(false);

  const {id, name, image, maxCapacity, regularPrice, discount} = cabin;

  const {deletedCabin, isDeleting} = useDeleteCabin();

  function handelDelete() {
    deletedCabin(id);
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to <Capacity>{maxCapacity}</Capacity></div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id}/>

              <Menus.List id={id}>
                <Modal.Open opens='edit'>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens='delete'>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name='edit'>
                <CreateCabinForm cabinToUpdate={cabin} />
              </Modal.Window>

              <Modal.Window name='delete'>
                <ConfirmDelete resourceName='cabin' 
                  disabled={isDeleting}
                  onClose
                  onConfirm={handelDelete} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>


      </div>
    </Table.Row>
  );
}

export default CainRow;
