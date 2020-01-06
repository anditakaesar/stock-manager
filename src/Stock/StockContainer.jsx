import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Table, Button, Icon, Input } from 'semantic-ui-react';

const numeral = require('numeral');
function formatNumber(value, format = '0,0') {
    return numeral(value).format(format);
}

class StockComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [
                {
                    id: 1,
                    num: 1,
                    code: 'ANTM',
                    lot: 10,
                    currValue: 1000000,
                    buyPrice: 1000,
                    buyValue: 1000000,
                    currPrice: 1000,
                    pts: 0,
                    pct: 1.4444
                },
                {
                    id: 2,
                    num: 2,
                    code: 'PTBA',
                    lot: 10,
                    currValue: 1000000,
                    buyPrice: 1000,
                    buyValue: 1000000,
                    currPrice: 1000,
                    pts: 0,
                    pct: 0
                }
            ]
        }
    }

    handleStockEdit = (newStock) => {
        // check the id
        let editId = this.state.stocks.findIndex(s => s.id === newStock.id);
        // clone the stocks array
        let editedStocks = [...this.state.stocks];
        // set the element with new object
        editedStocks[editId] = newStock;
        // set stocks state with new array
        this.setState({
            stocks: editedStocks
        });
    }

    render() {
        return (
            <Container className="main-container">
                <h2>Stock List</h2>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>
                            Lot<br />
                            Current Value
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Buy Price<br />
                            Buy Value
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Current Price<br />
                            Pts (+ / -)<br />
                            %
                        </Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.stocks.map(stock => <StockRow key={stock.id} stock={stock} OnSave={this.handleStockEdit} />)}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

class StockRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: {
                id: 0,
                num: 1,
                code: 'xxxx',
                lot: 0,
                currValue: 0,
                buyPrice: 0,
                buyValue: 0,
                currPrice: 0,
                pts: 0,
                pct: 0
            },
            editMode: false
        }
    }

    componentDidMount() {
        this.setState({
            stock: this.props.stock
        });
    }

    handleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    handleOnChange = (event) => {
        // clone the stock
        let editedStock = {...this.state.stock};
        let value = event.target.value;
        
        // set the event.target.name to event.target.value
        if (event.target.filterType === "number") { // for type number
            let rgx = new RegExp('^\\d+$');
            if (rgx.test(value)) {
                value = parseInt(value);
                editedStock[event.target.name] = value;
                this.setState({
                    stock: editedStock
                });
            }
        } else { // anything else
            editedStock[event.target.name] = value;
            this.setState({
                stock: editedStock
            });
        }
    }

    handleSave = () => {
        this.props.OnSave(this.state.stock);
        this.setState({
            editMode: !this.state.editMode
        })
    }

    renderSaveButton() {
        if (this.state.editMode) {
            return (
                <Button onClick={this.handleSave}>
                    <Icon fitted name='check' />
                </Button>
            )
        } else {
            return '';
        }
    }

    render() {
        const { stock, editMode } = this.state;

        return (
            <Table.Row>
                <Table.Cell>{stock.num}</Table.Cell>
                <Table.Cell>{stock.code}</Table.Cell>

                <Table.Cell>
                    <Table striped>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Input filterType="number" name="lot" disabled={!this.state.editMode} 
                                    onChange={this.handleOnChange}
                                    value={stock.lot} />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.currValue)}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Table.Cell>

                <Table.Cell>
                    <Table striped>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.buyPrice)}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.buyValue)}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Table.Cell>

                <Table.Cell>
                    <Table striped>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.currPrice)}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.pts)}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.pct, '0.000')}%</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        
                    </Table>
                </Table.Cell>

                <Table.Cell>
                    <Button onClick={this.handleEditMode} primary={!editMode} negative={editMode}>
                        <Icon fitted name='pencil' />
                    </Button><br /><br />
                    {this.renderSaveButton()}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default StockComponent;