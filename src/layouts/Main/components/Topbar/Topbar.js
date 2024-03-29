import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { setAccessToken } from 'src/utils/accessToken';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import * as routes from 'src/common/routes';
import { SIGN_OUT } from 'src/utils/graphqlMutations';
// import { history } from 'src/components/Routes/Routes';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: theme.palette.gradient
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  boxLogo: {
    display: 'flex',
    alignItems: 'center'
  },
  brandName: {
    color: theme.palette.white,
    marginLeft: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  logo: {
    width: 40
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const [signOut, { client }] = useMutation(SIGN_OUT);

  const handleSignOut = async () => {
    await signOut();
    setAccessToken('');
    await client.resetStore();

    window.location.href = routes.SIGN_IN;
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink className={classes.boxLogo} to="/">
          <img
            className={classes.logo}
            alt="Logo"
            src="/images/logos/logo.svg"
          />
          <Typography className={classes.brandName} variant="h5">
            Hệ thống quản lý thiết bị
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
