import { useDispatch, useSelector } from 'react-redux'
import Internal from './WindowExampleCards'
import { closeExample } from '../../actions/example';

const WindowExampleCards = () => {
    const dispatch = useDispatch();
    const onClose = () => dispatch(closeExample());
    const open = useSelector((state) => state.example.windowExampleCardsOpened)
    return <Internal {...{ open, onClose }} />
}

export default WindowExampleCards;