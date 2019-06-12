import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CanvasJSReact from "./CanvasJS/CanvasJSReact";

export default class CurrencyGraphicsModal extends Component {

    state = {
        chart: null
    };

    componentDidMount() {
        if (this.state.chart) {
            this.state.chart.render();
        }
    }

    render() {
        const {graphicsData, isModalOpen, toggleModal} = this.props;

        const options = {
            theme: "light2",
            title: {
                text: "Currency euro rate through the time"
            },
            axisY: {
                title: "Euro rate",
                prefix: "$",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.00",
                dataPoints: this.props.graphicsData.map(currency => {
                    currency.x = new Date(currency.date);
                    currency.y = currency.euroRate;
                    return currency;
                })
            }]
        };

        return (
            <Modal isOpen={isModalOpen} toggle={toggleModal} size='lg'>
                <ModalHeader toggle={toggleModal}>Graphics for {graphicsData.length ? graphicsData[0].code : null}</ModalHeader>
                <ModalBody>
                    <CanvasJSReact.CanvasJSChart options = {options}
                                   onRef={ref => {
                                       this.setState({chart: ref});
                                   }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
