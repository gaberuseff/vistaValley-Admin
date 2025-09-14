import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button variations="primary" size="medium">
                        Add new cabin
                    </Button>
                </Modal.Open>

                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AddCabin

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//     return (
//         <div>
//             <Button
//             variations="primary"
//             size="large"
//             onClick={() => setIsModalOpen((show) => !show)}>
//             {isModalOpen ? "Close" : "Add cabin"}
//             </Button>

//             {isModalOpen && 
//                 <Modal onClose={() => setIsModalOpen(false)}>
//                     <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//                 </Modal>
//             }
//         </div>
//     )
// }
