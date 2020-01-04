import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';

class StockComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu>
                <Menu.Item header>Our Company</Menu.Item>
                <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='aboutUs'
                active={activeItem === 'aboutUs'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='jobs'
                active={activeItem === 'jobs'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='locations'
                active={activeItem === 'locations'}
                onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}

export default StockComponent;