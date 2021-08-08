import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 14,
    },
}));

type SendButtonProps = {
    onSendButtonClick:(e: any) => void;
}

const SendButton = (props:SendButtonProps) => {
    const classes = useStyles();

    //送信ボタンが押された場合
    const handleSendButtonClick = (e: any) => {
        props.onSendButtonClick(e);
    }
    return (
        <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={handleSendButtonClick}>
            <Icon>send</Icon>
        </Button>
    );
}
export default SendButton;