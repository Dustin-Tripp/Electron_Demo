import * as React from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemText, useTheme, ListItemButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FunctionComponent = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()
  const theme = useTheme() // Access theme colors

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      {/* Navigation Bar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.paper, // Dark but not black
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Electron Template
          </Typography>

          {/* Desktop Navigation Links */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/' ? `3px solid ${theme.palette.primary.main}` : 'none',
              transition: 'border-bottom 0.3s',
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/graphs"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: location.pathname === '/graphs' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/graphs' ? `3px solid ${theme.palette.primary.main}` : 'none',
              transition: 'border-bottom 0.3s',
            }}
          >
            graphs
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 200 }}>
          <ListItemButton
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
            sx={{
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              color: location.pathname === '/' ? theme.palette.primary.main : 'inherit',
            }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/graphs"
            onClick={handleDrawerToggle}
            sx={{
              fontWeight: location.pathname === '/graphs' ? 'bold' : 'normal',
              color: location.pathname === '/graphs' ? theme.palette.primary.main : 'inherit',
            }}
          >
            <ListItemText primary="graphs" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
