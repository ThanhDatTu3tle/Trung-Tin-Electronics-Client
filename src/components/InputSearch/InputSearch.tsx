import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
}));

const SearchMinisize = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 2,
    width: '70%',
    height: '70%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      paddingRight: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}));

const StyledInputBaseMinisize = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    height: '70%',
    fontSize: '0.7rem',
    '& .MuiInputBase-input': {
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(0.5em + ${theme.spacing(0)})`,
      paddingRight: `calc(0.5em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      height: '100%',
    },
}));

let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;

  console.log("Width: " + screenWidth);
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

const InputSearch: React.FC<any> = () => {
    return (
        <>
            {screenWidth >= 581 ? 
                (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Máy khoan, máy cưa..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                ) : (
                    <SearchMinisize>                  
                        <SearchIcon 
                            style={{width: '1rem', height: '1rem'}} 
                        />          
                        <StyledInputBaseMinisize
                            placeholder="Máy khoan, máy cưa, máy mài, máy nén, dụng cụ cầm tay, thiết bị đo lường..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </SearchMinisize>
                )
            }
        </>
    );
}

export default InputSearch;
