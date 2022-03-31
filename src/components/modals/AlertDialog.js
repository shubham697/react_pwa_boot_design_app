import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function AlertDialogs(props) {
  const {onOK, onCancel, yes_btn, no_btn, ...rest} = props;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');


  React.useEffect(() => {
    setOpen(props.message != '' ? true : false)
    setMsg(props.message)
  }, [props.message])

  return (
    <div>
      <Dialog  style = {{zIndex : 1000, top : '0vh'}}  aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent >
          <h6 style={{textAlign : 'center', marginTop : 24, fontWeight : '400'}}>{msg}</h6>
          <div className="alert_btn_container" style = {{display : 'flex', flexDirection : 'row', justifyContent : 'center', paddingTop : 25,}}>
            {
              no_btn != null &&
              <Button  onClick={onCancel} color="primary" className="mt-20 alert-btn" >
                  {no_btn}
              </Button>
            }
            {
              yes_btn != null &&
              <Button  onClick={onOK} color="primary" className="mt-20 alert-btn" >
                  {yes_btn}
              </Button>
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
