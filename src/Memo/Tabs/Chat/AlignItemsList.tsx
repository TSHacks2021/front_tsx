  
import React, {useState, Children, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import "./AlignItemsList.css"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
/*
function AlignItemsList() {
    const classes = useStyles();
    return (
        <div style={{maxHeight: 200, overflow: 'auto'}}>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
        </div>
    );
}
*/
type AlignItemsListProps = {
    chats: string[]
}

const AlignItemsList = (props: AlignItemsListProps) => {
    const[chats, setChats] = useState(props.chats)
    const classes = useStyles();
    //const chats = props.chats

    return (
        <div style={{height: 200, overflow: 'auto', border: '2px solid grey' }}>
            {chats.map((item, index) => (
                <List className={classes.root}
                    key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={item}/>
                    </ListItem>
                    {/*<Divider variant="inset" component="li"/>*/}
                </List>
            ))}
            {/*
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText primary="Hello World"/>
                </ListItem>
            </List>*/}
        </div>
    );
}

export default AlignItemsList;