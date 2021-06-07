import { 
    AppBar, 
    Toolbar, 
    Typography, 
} from "@material-ui/core"

export default function Header(){
    return <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Travel Route Planner
        </Typography>
      </Toolbar>
    </AppBar>
}