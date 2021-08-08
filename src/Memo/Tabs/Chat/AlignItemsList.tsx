import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import "./AlignItemsList.css"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

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

        </div>
    );
}

export default AlignItemsList;