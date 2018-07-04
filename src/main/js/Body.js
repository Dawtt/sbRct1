import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        width: '50%',
        maxWidth: '180px',
        backgroundColor: theme.palette.background.paper,
    },
});


class ListDividers extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleMenu2 = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose2 = () => {
        this.setState({anchorEl: null});
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="1"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button divider>
                        <ListItemText primary="2"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText onClick={this.handleClose2}/>
                        3
                    </ListItem>
                    <Divider light/>
                    <ListItem button>
                        <ListItemText
                            primary="Create New Playlist"
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"


                        />
                        <Menu
                            id="User-Menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>happs</MenuItem>
                            <MenuItem onClick={this.handleClose}>Cjoe far the list</MenuItem>
                        </Menu>

                    </ListItem>
                </List>
            </div>
        );
    }
}

ListDividers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);
