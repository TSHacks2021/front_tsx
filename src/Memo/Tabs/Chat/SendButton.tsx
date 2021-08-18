import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        fontSize: 15
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 3,
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
            送信
        </Button>
    );
}
export default SendButton;