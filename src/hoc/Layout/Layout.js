import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from "../../components/Navigation/ComponentMenuToggle/MenuToggle";

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenuHandler} />

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;
