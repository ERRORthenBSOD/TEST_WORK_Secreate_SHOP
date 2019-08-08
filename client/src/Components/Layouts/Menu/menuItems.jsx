import React from 'react';
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';


import {
    ExitToApp,
    AddShoppingCart,
    ShoppingCart
} from '@material-ui/icons';





const menuItems = (toggleDrawer, classes, logout) => (
    <div
        className={classes.list}
        role="presentation"
    >
        <Typography variant="h4" color='primary' className={classes.title}>
            Меню
        </Typography>
        <Divider />
        <List className={classes.menuList}>
             <ListItem button onClick={toggleDrawer(false, 'shop')}>
                <ListItemIcon>
                    <AddShoppingCart/>
                </ListItemIcon>
                <ListItemText primary={
                    <Typography className={classes.listTitle}>Магазин</Typography>
                }/>
            </ListItem>
            <Divider />
        </List>
        <List className={classes.menuList}>
            <ListItem button onClick={toggleDrawer(false, 'cart')}>
                <ListItemIcon>
                    <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary={
                    <Typography className={classes.listTitle}>Корзина покупок</Typography>
                }/>
            </ListItem>
            <Divider />
        </List>
        <Divider />
        <List>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                        <ExitToApp />
                </ListItemIcon>
                <Typography className={classes.listTitle}>Выход</Typography>
            </ListItem>
        </List>
    </div>
);

export default menuItems;