import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { 
    Container, 
    Table, 
    Button, 
    Icon, 
    Input
} from 'semantic-ui-react';

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
                    lot: 1000,
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
            id: 0,
            code: 'xxxx',
            lot: 0,
            buyPrice: 0,
            editMode: false
        }
    }

    handleEditMode = () => {
        const { stock } = this.props;

        this.setState({
            editMode: !this.state.editMode,
            id: stock.id,
            code: stock.code,
            lot: stock.lot,
            buyPrice: stock.buyPrice
        });
    }

    handleSave = () => {
        let stock = {...this.props.stock};
        stock.code = this.state.code;
        stock.lot = this.state.lot;
        stock.buyPrice = this.state.buyPrice;

        this.props.OnSave(stock);
        this.setState({
            editMode: !this.state.editMode
        });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    renderEdited() {
        return (
            <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                    <Input label='Code' type='text' name='code' value={this.state.code} onChange={this.onChangeHandler} />
                </Table.Cell>
                <Table.Cell>
                    <Input label='Lot' type='number' name='lot' value={this.state.lot} onChange={this.onChangeHandler} />
                </Table.Cell>
                <Table.Cell>
                    <Input label='Buy Price' type='number' name='buyPrice' value={this.state.buyPrice} onChange={this.onChangeHandler} />
                </Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                    <Button basic color='green' onClick={this.handleSave} animated>
                        <Button.Content visible>
                            <Icon fitted name='check' />
                        </Button.Content>
                        <Button.Content hidden>
                            Save
                        </Button.Content>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }

    renderRow() {
        const { editMode } = this.state;
        const { stock } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{stock.num}</Table.Cell>
                <Table.Cell>{stock.code}</Table.Cell>

                <Table.Cell>
                    <Table striped>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{formatNumber(stock.lot)}</Table.Cell>
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
                    <Button animated onClick={this.handleEditMode} primary={!editMode} negative={editMode}>
                        <Button.Content visible>
                            <Icon fitted name={editMode ? 'cancel' : 'pencil'} />
                        </Button.Content>
                        <Button.Content hidden>
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button.Content>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRow()}
                {this.state.editMode ? this.renderEdited() : null}
            </React.Fragment>
        );
    }
}

export default StockComponent;