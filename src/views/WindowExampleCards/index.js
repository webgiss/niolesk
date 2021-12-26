import { useDispatch, useSelector } from 'react-redux'
import Internal from './WindowExampleCards'
import { closeExample, updateSearch } from '../../actions/example';

const WindowExampleCards = () => {
    const dispatch = useDispatch();
    const onClose = () => dispatch(closeExample());
    const open = useSelector((state) => state.example.windowExampleCardsOpened)
    const search = useSelector((state) => state.example.search)
    const onSearchChange = (search) => dispatch(updateSearch(search))
    return <Internal {...{ open, onClose, search, onSearchChange }} />
}

export default WindowExampleCards;