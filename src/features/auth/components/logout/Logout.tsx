import { Logout } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const LogOut: React.FC = () => {

  const { logout } = useAuth();

  const onLogout = () => {
    try {
      alert("Are you sure you want to logout")
      console.log("Logged Out")
      logout();
    } catch (e) {

    }
  }

  return (
    <Box>
      <Button onClick={() => { onLogout() }}>
        <Logout />
      </Button>
    </Box>
  )
}

export default LogOut
