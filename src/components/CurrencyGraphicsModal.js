import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CurrencyGraphicsModal = ({currency, selectCurrency, isModalOpen, toggleModal}) => (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
            {currency ? currency.code : null}
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
    </Modal>
);

export default CurrencyGraphicsModal;
