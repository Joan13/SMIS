import { FaInfoCircle } from 'react-icons/fa';

export default function modalView(title, mainText) {
    return(
        <div className="main-modal">
            <h2 className="title-modal">
            <FaInfoCircle style={{ color: 'gray', marginRight: 10 }} size={20} />
            {title}
            </h2>
            <div className="main-text-modal">{mainText}</div>
        </div>
    )
}
