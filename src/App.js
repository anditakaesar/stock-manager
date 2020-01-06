import React from 'react';
import './App.css';
import { Menu, Container } from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import StockComponent from './Stock/StockContainer';
import LoginComponent from './Login/LoginComponent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        activeItem: 'stock'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
    const { activeItem } = this.state;

    return (
        <Router>
            <Menu>
                <Menu.Item
                as={Link} to="/"
                name='stock'
                active={activeItem === 'stock'}
                onClick={this.handleItemClick}
                >
                Stock
                </Menu.Item>

                <Menu.Item
                as={Link} to="/chart"
                name='chart'
                active={activeItem === 'chart'}
                onClick={this.handleItemClick}
                >
                Chart
                </Menu.Item>

                <Menu.Item
                as={Link} to="/login"
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                >
                Login
                </Menu.Item>

                <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
                >
                Logout
                </Menu.Item>
            </Menu>

            <Switch>
                <Route path="/chart">
                    <Container className="main-container">
                        <h2>Test Component</h2>
                    </Container>
                </Route>

                <Route path="/login">
                    <Container className="main-container">
                        <LoginComponent />
                    </Container>
                </Route>

                <Route path="/">
                    <StockComponent />
                </Route>
            </Switch>
        </Router>

        );
    }
}

export default App;
